import { IonContent, IonPage, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, useIonToast } from '@ionic/react';
import { trashOutline } from "ionicons/icons";
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
    message: 'Getting Workout History',
  });

  // Show a loading alert when the workout history is in the process of
  // deleting.
  useLoadingAlert({
    loading: deleteWorkoutHistoryLoading,
    message: 'Deleting Workout History',
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
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{workoutHistory.date}</IonCardTitle>
                    <IonCardSubtitle>Duration: {workoutHistory.duration}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonButton fill="clear" onClick={() => onDeleteWorkout(workoutHistory.id)}>
                    <IonIcon slot="end" icon={trashOutline} />
                  </IonButton>
                </IonCard>
              </div>
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default WorkoutHistory;
