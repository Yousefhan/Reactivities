import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, GridColumn, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}
export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  const [target, setTarget] = useState("");

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }
  return (
    <Tab.Pane>
      <Grid>
        <GridColumn width={16}>
          <Header icon="image" content="photos" floated="left" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </GridColumn>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <div>
              <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
            </div>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={"Main" + photo.id}
                        disabled={photo.isMain}
                        loading={target === "Main" + photo.id && loading}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />{" "}
                      <Button
                        basic
                        color="red"
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={target === photo.id && loading}
                        icon="trash"
                        onClick={(e) => handleDeletePhoto(photo, e)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
