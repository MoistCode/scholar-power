import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { addCircleOutline, barbellOutline, newspaperOutline, listOutline } from 'ionicons/icons';
import Workouts from '../pages/Workouts';
import StartWorkout from '../pages/StartWorkout';
import CreateWorkout from '../pages/CreateWorkout';
import History from '../pages/History';

/**
 * This component is the main tab bar for the app. It contains the routes for
 * the main pages of the app when the user is signed in.
 */
const SignedInTabs = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/workouts">
        <Workouts />
      </Route>
      <Route exact path="/startworkout">
        <StartWorkout />
      </Route>
      <Route path="/createworkout">
        <CreateWorkout />
      </Route>
      <Route path="/workouthistory">
        <History />
      </Route>
      <Route exact path="/">
        <Redirect to="/workouts" />
      </Route>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="workouts" href="/workouts">
        <IonIcon icon={listOutline} />
        <IonLabel>Workouts</IonLabel>
      </IonTabButton>
      <IonTabButton tab="startworkout" href="/startworkout">
        <IonIcon icon={barbellOutline} />
        <IonLabel>Start Workout</IonLabel>
      </IonTabButton>
      <IonTabButton tab="createworkout" href="/createworkout">
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
