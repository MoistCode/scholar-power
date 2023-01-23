import { IonContent, IonPage } from '@ionic/react';
import Header from '../components/Header';

/**
 * This component is the page responsible for creating a new workout.
 */
const CreateWorkout = () => {
  return (
    <IonPage>
      <Header title="Create Workout" />
      <IonContent fullscreen>
        Create workout page example
      </IonContent>
    </IonPage>
  );
};

export default CreateWorkout;
