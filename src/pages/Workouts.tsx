import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/**
 * This component is the page responsible for displaying the user-generated
 * workouts.
 */
const Workouts = () => {
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
