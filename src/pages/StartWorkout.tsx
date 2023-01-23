import { IonContent, IonPage } from '@ionic/react';
import Header from '../components/Header';

/**
 * This component is the page responsible for starting a workout.
 */
const StartWorkout = () => {
  return (
    <IonPage>
      <Header title="Start Workout" />
      <IonContent fullscreen>
        Start workout page example
      </IonContent>
    </IonPage>
  );
};

export default StartWorkout;
