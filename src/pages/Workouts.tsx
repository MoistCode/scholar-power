import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Workouts: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workouts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Workouts page example
      </IonContent>
    </IonPage>
  );
};

export default Workouts;
