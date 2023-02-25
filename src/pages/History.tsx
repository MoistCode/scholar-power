import { IonContent, IonPage, useIonToast } from '@ionic/react';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import useLoadingAlert from '../hooks/useLoadingAlert';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';

/**
 * This component is the page responsible for displaying the workout history.
 */
const WorkoutHistory = () => {
  const {
    refetchFn: refetchWorkoutHistory,
    // TODO: Use this data to display the workout history.
    data: getWorkoutHistoryData,
    loading: getWorkoutHistoryLoading,
    // TODO: Use this error to display an error message if any.
    // error, // Uncomment this line and use this error to display an error message if any.
  } = useWorkoutHistory();

  let { uid } = useLoggedInUser() || {};

  const {
    fetchDataFn: deleteWorkoutHistory,
    loading: deleteWorkoutHistoryLoading,
    data: deleteWorkoutHistoryData,
    reset: resetWorkoutHistory,
  } = useFetch<{ Message: string }>();

  const onDeleteWorkout = async (id: string) => {
    if (!uid) return;

    await deleteWorkoutHistory({
      endpoint: `/api/v1/history/${id}`,
      method: 'DELETE',
      variables: {
        athlete_id: uid,
      },
    });
  }

  const [present] = useIonToast();

  if (deleteWorkoutHistoryData?.Message === "Poof! It's gone.") {
    resetWorkoutHistory();
    refetchWorkoutHistory({ force: true });

    present({
      message: 'Deleted workout history!',
      duration: 1500,
      position: 'top',
    });
  }

  // Show a loading alert when the workout history is loading.
  useLoadingAlert({
    loading: getWorkoutHistoryLoading,
    message: 'Change this message.', // TODO: Change this loading message.
  });

  // Show a loading alert when the workout history is in the process of
  // deleting.
  useLoadingAlert({
    loading: deleteWorkoutHistoryLoading,
    message: 'Change this message.', // TODO: Change this loading message.
  });

  return (
    <IonPage>
      <Header title="Workout History" />
      <IonContent fullscreen>
        {getWorkoutHistoryData &&
          getWorkoutHistoryData.map((workoutHistory) => {
            // TODO: Play around with the data and display it in a nice way.
            return (
              <div key={workoutHistory.id}>
                <h1>{workoutHistory.date}</h1>
                <p>{workoutHistory.duration}</p>
                <button onClick={() => onDeleteWorkout(workoutHistory.id)}>Delete</button>
              </div>
            );
          })
        }
        {/*
          TODO: This is how the data looks as a JS object. Feel free to delete
          this.
        */}
        <pre>
          {getWorkoutHistoryData && JSON.stringify(getWorkoutHistoryData, null, 2)}
        </pre>
      </IonContent>
    </IonPage>
  );
};

export default WorkoutHistory;
