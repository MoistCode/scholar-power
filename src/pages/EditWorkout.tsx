import { IonPage, IonContent, IonButton, IonBackButton, IonButtons, IonTitle, IonToolbar, IonHeader } from "@ionic/react";
import ExerciseList from "../components/ExerciseList";

const EditWorkout = (props: any) => {
  const {
    match,
  } = props;

  const { id } = match.params;

  // TODO: Edit the actual workout.
  // TODO: Show a busy indicator while the backend is working on editing the
  // workout.
  // TODO: Show an error message if the backend fails to edit the workout.
  // TODO: Redirect to the workout list page after the workout has been edited.

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Edit workout</IonTitle>
          <IonButtons slot="end">
            <IonButton color="success">Finish</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ExerciseList planId={id} />
      </IonContent>
    </IonPage>
  );
};

export default EditWorkout;