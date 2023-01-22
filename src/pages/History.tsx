import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/**
 * This component is the page responsible for displaying the workout history.
 */
const WorkoutHistory: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Workout history page example
      </IonContent>
    </IonPage>
  );
};

export default WorkoutHistory;
