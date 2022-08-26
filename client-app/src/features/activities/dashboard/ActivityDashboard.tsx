import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponenet";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";

import ActivityList from "./ActivityList";

export default observer(function AcitvityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    loadActivities();
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading activities ..."></LoadingComponent>;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
