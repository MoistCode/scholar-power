import {
  IonContent,
  IonPage,
  useIonLoading,
  IonText,
} from '@ionic/react';
import { useEffect } from 'react';
import Header from '../components/Header';
import WorkoutList from '../components/WorkoutList';
import { useWorkoutList } from '../hooks/useWorkoutList';

/**
 * This component is the page responsible for displaying the user-generated
 * workouts.
 */
const Workouts = () => {
  const {
    refetchFn: getAllWorkouts,
    loading: getAllWorkoutsLoading,
    error: getAllWorkoutsError,
    data: listOfWorkouts,
  } = useWorkoutList();

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (getAllWorkoutsLoading) {
      present({
        message: 'Loading workouts...',
      });
    }

    if (!getAllWorkoutsLoading) {
      dismiss();
    }
  }, [dismiss, getAllWorkoutsLoading, present]);

  useEffect(() => {
    getAllWorkouts();
  }, [getAllWorkouts]);


  return (
    <IonPage>
      <Header title="Workouts" />
      <IonContent fullscreen>
        <WorkoutList workouts={listOfWorkouts}/>
        {getAllWorkoutsError &&
          <IonText color="primary">
            <h1>Something went wrong. Please try again later.</h1>
          </IonText>
        }
      </IonContent>
    </IonPage>
  );
};

export default Workouts;
