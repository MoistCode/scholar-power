import { IonPage, IonContent, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader } from "@ionic/react";

const CreateWorkout = () => {

  // TODO: Create the actual workout.
  // TODO: Show a busy indicator while the backend is working on creating the
  // workout.
  // TODO: Show an error message if the backend fails to create the workout.
  // TODO: Redirect to the workout list page after the workout has been created.

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create workout</IonTitle>
          <IonButtons slot="end">
            <IonButton color="success">Finish</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
      </IonContent>
    </IonPage>
  );
};

export default CreateWorkout;