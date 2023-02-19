import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonActionSheet,
} from '@ionic/react';
import {
  addCircleOutline,
  newspaperOutline,
  listOutline,
  banOutline,
} from 'ionicons/icons';

import Workouts from '../pages/Workouts';
import History from '../pages/History';
import EditWorkout from '../pages/EditWorkout';
import CreateWorkout from '../pages/CreateWorkout';
import ActivateWorkout from '../pages/ActivateWorkout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { useEffect, useState } from 'react';
import { endWorkout } from '../slices/activatedWorkout';

/**
 * This component is the main tab bar for the app. It contains the routes for
 * the main pages of the app when the user is signed in.
 */
const SignedInTabs = () => {
  const hasActivatedWorkout = useSelector((state: RootState) => state.activatedWorkout.hasActivatedWorkout);
  const activatedWorkoutId = useSelector((state: RootState) => state.activatedWorkout.activatedWorkoutId);
  const [present] = useIonActionSheet();
  const [result, setResult] = useState<OverlayEventDetail>();
  const dispatch = useDispatch();

  const handleCancelWorkout = () => {
    present({
      header: 'Cancel this workout?',
      buttons: [
        {
          text: 'Yes',
          data: {
            action: 'cancelworkout',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
      onDidDismiss: ({ detail }) => setResult(detail),
    })
  };

  useEffect(() => {
    if (result?.data?.action === 'cancelworkout') {
      setResult(undefined);
      dispatch(endWorkout());
    }
  }, [result?.data?.action, dispatch])

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/workouts" component={Workouts} />
        <Route exact path="/workoutcreate" component={CreateWorkout} />
        <Route
          exact
          path="/workoutactivate/:id"
          render={(props) => {
            if (hasActivatedWorkout) {
              return <ActivateWorkout {...props}/>;
            }

            return <Redirect to="/workouts" />;
          }}
        />
        <Route exact path="/workout/:id" component={EditWorkout} />
        <Route exact path="/workouthistory" component={History} />
        <Route
          render={(props) => {
            let url = hasActivatedWorkout
              ? `/workoutactivate/${activatedWorkoutId}`
              : '/workouts';

            return <Redirect to={url} />;
          }}
        />
      </IonRouterOutlet>
    
      {hasActivatedWorkout
        ? (
          <IonTabBar slot="bottom">
            <IonTabButton tab="workouts" onClick={handleCancelWorkout}>
              <IonIcon icon={banOutline} />
              <IonLabel>Cancel</IonLabel>
            </IonTabButton>
          </IonTabBar>
        )
        : (
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
        )
      }
    </IonTabs>
  );
};

export default SignedInTabs;
