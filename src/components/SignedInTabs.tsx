import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { ellipse, square, triangle } from 'ionicons/icons';
import Workouts from '../pages/Workouts';
import StartWorkout from '../pages/StartWorkout';
import CreateWorkout from '../pages/CreateWorkout';
import History from '../pages/History';

/**
 * This component is the main tab bar for the app. It contains the routes for
 * the main pages of the app when the user is signed in.
 */
const SignedInTabs: React.FC = () => (
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
        <IonIcon icon={triangle} />
        <IonLabel>Workouts</IonLabel>
      </IonTabButton>
      <IonTabButton tab="startworkout" href="/startworkout">
        <IonIcon icon={ellipse} />
        <IonLabel>Start Workout</IonLabel>
      </IonTabButton>
      <IonTabButton tab="createworkout" href="/createworkout">
        <IonIcon icon={square} />
        <IonLabel>Create Workout</IonLabel>
      </IonTabButton>
      <IonTabButton tab="workouthistory" href="/workouthistory">
        <IonIcon icon={square} />
        <IonLabel>Workout History</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default SignedInTabs;
