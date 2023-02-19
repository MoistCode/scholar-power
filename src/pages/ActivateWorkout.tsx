import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useExerciseList } from "../hooks/useExerciseList";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { endWorkout } from "../slices/activatedWorkout";

const ActivateWorkout = (props: { match: { params : { id: string }}}) => {
  const { match } = props;

  const { id } = match.params;

  const {
    loading: getAllExercisesLoading,
    // TODO: Do something with this error. Maybe show a modal that lets the user
    // know that something went wrong with a button that refreshes the page?
    error: getAllExercisesError,
    data: exerciseList
  } = useExerciseList({ planId: id })

  const [listOfExercises, setListOfExercises] = useState<CurrentListOfExercises[]|undefined>();

  useLoadingAlert({
    loading: getAllExercisesLoading,
    message: 'Loading workouts...',
  });

  useEffect(() => {
    if (!exerciseList || getAllExercisesLoading || listOfExercises) return;

    const exerciseListWithAttr = exerciseList.map((exercise, idx) => {
      return {
        id: exercise.id,
        name: exercise.exerciseName,
        instructions: exercise.exerciseInstructions,
        equipment: exercise.exerciseEquipment,
        sets: exercise.sets,
        reps: exercise.reps,
        load: exercise.load,
        dataAttribute: getDataAttributeFromExercise({
          id: exercise.id,
          name: exercise.name,
          counter: idx,
        }),
      };
    });

    setListOfExercises(exerciseListWithAttr);
  }, [exerciseList, getAllExercisesLoading, listOfExercises]);

  const dispatch = useDispatch();

  const onCompleteWorkout = () => {
    // TODO: Add logic to complete workout. Perhaps we can show a modal that
    // lets the user know they completed it with a button that redirecst to
    // "/workouts"?
    console.log('Completed workout, yay!');
    dispatch(endWorkout());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          {/* TODO: Change the title */}
          <IonTitle>Title</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCompleteWorkout} color="success">Complete</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*
          TODO: Work with `listOfExercises` to show users a list of their
          exercises that they should be performing during this workout
        */}
        <pre>{JSON.stringify(listOfExercises, null, 2)}</pre>
      </IonContent>
    </IonPage>
  );
};

export default ActivateWorkout;

const getDataAttributeFromExercise = (args: getDataAttributeFromExerciseArgs) => {
  const {
    id,
    name,
    counter,
  } = args;

  return `${name.replace(' ', '-').toLowerCase()}-${counter}-${id}`;
};

type getDataAttributeFromExerciseArgs = {
  id: string;
  name: string;
  counter: number;
}

type CurrentListOfExercises = {
  id: string;
  name: string;
  instructions: string;
  equipment: string;
  dataAttribute: string;
  load: string;
  sets: string;
  reps: string;
};
