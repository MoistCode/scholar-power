import {
  IonContent,
  IonIcon,
  IonPage,
  IonText,
} from '@ionic/react';
import { barbellOutline } from 'ionicons/icons';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import WorkoutList from '../components/WorkoutList';
import useLoadingAlert from '../hooks/useLoadingAlert';
import { useWorkoutList } from '../hooks/useWorkoutList';
import { disableRefetchWorkouts } from '../slices/refetch';
import { RootState } from '../store';
import styles from './Workouts.module.css';

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

  const dispatch = useDispatch();

  useLoadingAlert({
    loading: getAllWorkoutsLoading,
    message: 'Loading workout...',
  });

  const shouldRefetchWorkouts = useSelector((state: RootState) => state.refetch.shouldRefetchWorkouts);

  useEffect(() => {
    if (shouldRefetchWorkouts) {
      getAllWorkouts({ force: true });
      dispatch(disableRefetchWorkouts());
      return;
    }
  }, [dispatch, getAllWorkouts, shouldRefetchWorkouts]);

  useEffect(() => {
    getAllWorkouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <Header title="Workouts" />
      <IonContent fullscreen>
        {(listOfWorkouts && listOfWorkouts.length > 0) &&
          <WorkoutList workouts={listOfWorkouts}/>
        }
        {!getAllWorkoutsLoading && !getAllWorkoutsError && (listOfWorkouts && listOfWorkouts.length === 0) &&
          <EmptyWorkout />
        }

        {getAllWorkoutsError &&
          <IonText color="primary">
            <h1>Something went wrong. Please try again later.</h1>
          </IonText>
        }
      </IonContent>
    </IonPage>
  );
};

export default memo(Workouts);

// Component to let the user know they can create a workout since they don't
// have any.
const EmptyWorkout = () => {
  return (
    <div className={`${styles.emptyWorkoutContainer} ion-padding`}>
      <IonIcon className="ion-text-center" icon={barbellOutline} size="large" />
      <IonText className="ion-text-center" color="primary">
        <h1>You don't have any workouts yet. Create one!</h1>
      </IonText>
    </div>
  );
};