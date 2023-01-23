import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/**
 * This component is the page responsible for creating a new workout.
 */
const CreateWorkout = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Create workout page example
      </IonContent>
    </IonPage>
  );
};

export default CreateWorkout;
