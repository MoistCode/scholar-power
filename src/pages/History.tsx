import { IonContent, IonPage } from '@ionic/react';
import Header from '../components/Header';

/**
 * This component is the page responsible for displaying the workout history.
 */
const WorkoutHistory = () => {
  return (
    <IonPage>
      <Header title="Workout History" />
      <IonContent fullscreen>
        Workout history page example
      </IonContent>
    </IonPage>
  );
};

export default WorkoutHistory;
