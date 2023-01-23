import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/**
 * This component is the page responsible for starting a workout.
 */
const StartWorkout = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Start Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Start workout page example
      </IonContent>
    </IonPage>
  );
};

export default StartWorkout;
