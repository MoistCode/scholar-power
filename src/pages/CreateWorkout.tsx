import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const CreateWorkout: React.FC = () => {
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
