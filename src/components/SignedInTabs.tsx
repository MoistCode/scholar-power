import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import {
  addCircleOutline,
  newspaperOutline,
  listOutline,
} from 'ionicons/icons';

import Workouts from '../pages/Workouts';
import History from '../pages/History';
import EditWorkout from '../pages/EditWorkout';
import CreateWorkout from '../pages/CreateWorkout';

/**
 * This component is the main tab bar for the app. It contains the routes for
 * the main pages of the app when the user is signed in.
 */
const SignedInTabs = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/workouts" component={Workouts} />
      <Route exact path="/workoutcreate" component={CreateWorkout} />
      <Route exact path="/workout/:id" component={EditWorkout} />
      <Route exact path="/workouthistory" component={History} />
      <Route render={() => <Redirect to="/workouts" />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="workouts" href="/workouts">
        <IonIcon icon={listOutline} />
        <IonLabel>Workouts</IonLabel>
      </IonTabButton>
      <IonTabButton tab="createworkout" href="/workoutcreate">
        <IonIcon icon={addCircleOutline} />
        <IonLabel>Create Workout</IonLabel>
      </IonTabButton>
      <IonTabButton tab="workouthistory" href="/workouthistory">
        <IonIcon icon={newspaperOutline} />
        <IonLabel>History</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default SignedInTabs;
