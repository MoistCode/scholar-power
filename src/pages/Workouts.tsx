import {
  IonContent,
  IonPage,
  IonText,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import WorkoutList from '../components/WorkoutList';
import useLoadingAlert from '../hooks/useLoadingAlert';
import { useWorkoutList } from '../hooks/useWorkoutList';
import { disableRefetchWorkouts } from '../slices/refetch';
import { RootState } from '../store';

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

  const [isInitialRender, setIsInitialRender] = useState(true);

  useLoadingAlert({
    loading: getAllWorkoutsLoading,
    message: 'Loading workout...',
  });

  const shouldRefetchWorkouts = useSelector((state: RootState) => state.refetch.shouldRefetchWorkouts);

  useEffect(() => {
    if (getAllWorkoutsLoading) {
      setIsInitialRender(false);
      dispatch(disableRefetchWorkouts());
    };

    if (isInitialRender && shouldRefetchWorkouts) {
      getAllWorkouts();
      setIsInitialRender(false);
      dispatch(disableRefetchWorkouts());
      return;
    }

    if (isInitialRender) {
      getAllWorkouts();
      setIsInitialRender(false);
      return;
    }

    if (shouldRefetchWorkouts) {
      getAllWorkouts();
      dispatch(disableRefetchWorkouts());
      return;
    }
  }, [dispatch, getAllWorkouts, getAllWorkoutsLoading, isInitialRender, shouldRefetchWorkouts]);



  return (
    <IonPage>
      <Header title="Workouts" />
      <IonContent fullscreen>
        {listOfWorkouts && <WorkoutList workouts={listOfWorkouts}/>}
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
