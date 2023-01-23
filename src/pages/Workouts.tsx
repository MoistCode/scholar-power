import { IonContent, IonPage } from '@ionic/react';
import Header from '../components/Header';

/**
 * This component is the page responsible for displaying the user-generated
 * workouts.
 */
const Workouts = () => {
  return (
    <IonPage>
      <Header title="Workouts" />
      <IonContent fullscreen>
        Workouts page example
      </IonContent>
    </IonPage>
  );
};

export default Workouts;
