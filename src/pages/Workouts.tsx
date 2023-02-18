import {
  IonContent,
  IonPage,
  IonText,
} from '@ionic/react';
import { useEffect } from 'react';
import Header from '../components/Header';
import WorkoutList from '../components/WorkoutList';
import useLoadingAlert from '../hooks/useLoadingAlert';
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

  useLoadingAlert({
    loading: getAllWorkoutsLoading,
    message: 'Loading workout...',
  });

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
