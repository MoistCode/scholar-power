import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const StartWorkout: React.FC = () => {
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
