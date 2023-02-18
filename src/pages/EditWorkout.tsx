import { IonPage, IonContent, IonButton, IonBackButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonLabel, IonList, IonText, IonIcon, IonInput, IonItem } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import ExerciseDescriptionModal from "../components/ExerciseDescriptionModal";
import { useEditWorkoutPlan } from "../hooks/useEditWorkoutPlan";
import { useExerciseList } from "../hooks/useExerciseList";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { AddExerciseModal } from "./CreateWorkout";

const EditWorkout = (props: any) => {
  const {
    match,
  } = props;

  const { id } = match.params;

  const [counter, setCounter] = useState(0);
  const [listOfExercises, setListOfExercises] = useState<any>();

  const {
    loading: getAllExercisesLoading,
    error: getAllExercisesError,
    data: exerciseList
  } = useExerciseList({ planId: id })

  useLoadingAlert({
    loading: getAllExercisesLoading,
    message: 'Loading workouts...',
  })

  useEffect(() => {
    if (!exerciseList) return;

    const formattedExerciseList = exerciseList.map((exercise: any, idx: any) => {
      const formattedExercise = {
        name: exercise.ExerciseName,
        instructions: exercise.ExerciseInstructions,
        id: exercise.ID,
        load: exercise.Load,
        reps: exercise.Reps,
        sets: exercise.Sets,
      } as any;

      formattedExercise.dataAttribute = getDataAttributeFromExercise(formattedExercise, idx);

      return formattedExercise;
    });

    if (!listOfExercises) {
      setListOfExercises(formattedExerciseList);
    }
  }, [exerciseList, listOfExercises]);

  const triggerId = 'open-add-exercise-modal';

  const {
    refetchFn: editNewWorkoutPlanFn,
    loading: isEditingWorkoutPlan,
    data: editdWorkoutPlanResponse,
  } = useEditWorkoutPlan()

  const onEditWorkout = useCallback(() => {
    const variables = [] as any[];

    for (const exerciseListItem of listOfExercises) {
      const {
        id,
        dataAttribute,
      } = exerciseListItem;

      const sets = document.querySelector(`[data-sets-input="${dataAttribute}"]`) as any;
      const reps = document.querySelector(`[data-reps-input="${dataAttribute}"]`) as any;
      const load = document.querySelector(`[data-load-input="${dataAttribute}"]`) as any;

      variables.push({
        sets: sets?.value,
        reps: reps?.value,
        load: load?.value,
        id,
      })
    }

    editNewWorkoutPlanFn({ planId: id, variables});
  }, [editNewWorkoutPlanFn, id, listOfExercises]);

  useLoadingAlert({
    loading: isEditingWorkoutPlan,
    message: 'Creating workout...',
  })

  const onSelectExercise = useCallback((exercise: any) => {
    const currentListOfExercises = [...listOfExercises];

    currentListOfExercises.push({
      id: exercise.ID,
      name: exercise.Name,
      instructions: exercise.Instructions,
      dataAttribute: getDataAttributeFromExercise(exercise, counter),
    })

    setCounter(counter + 1);
    setListOfExercises(currentListOfExercises);
  }, [counter, listOfExercises])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Edit workout</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onEditWorkout} color="success">Finish</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {getAllExercisesError &&
          <IonText color="primary">
            <h1>Something went wrong. Please try again later.</h1>
          </IonText>
        }
        <IonList>
          {listOfExercises?.map((exercise: any, idx: any) => {
            const {
              name,
              instructions,
              dataAttribute,
              load,
              sets,
              reps,
            } = exercise;

            let triggerId = `open-exercise-descripton-modal-${dataAttribute}`;

            return (
              <IonList
                className="ion-padding"
                key={dataAttribute}
                data-exercise-item={dataAttribute}
              >
                <IonItem>
                  <IonLabel>{name}</IonLabel>
                  <IonButton fill="clear" id={triggerId}>
                    <IonIcon slot="icon-only" icon={informationCircleOutline} />
                  </IonButton>
                  <ExerciseDescriptionModal
                    triggerId={triggerId}
                    instructions={instructions}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Sets: </IonLabel>
                  <IonInput value={sets} data-sets-input={dataAttribute} />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Reps: </IonLabel>
                  <IonInput value={reps} data-reps-input={dataAttribute} />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Load: </IonLabel>
                  <IonInput value={load} data-load-input={dataAttribute} />
                </IonItem>
              </IonList>
            );
          })}
          <div className="ion-padding">
            <IonButton
              expand="block"
              id={triggerId}
            >
              Add Exercise
            </IonButton>
          </div>
        </IonList>

        <AddExerciseModal
          triggerId={triggerId}
          onSelectExercise={onSelectExercise}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditWorkout;

function getDataAttributeFromExercise(exercise: any, counter: any) {
  let name = exercise.name || exercise.Name;
  let id = exercise.id || exercise.ID;

  return `${name.replace(' ', '-').toLowerCase()}-${counter}-${id}`;
}
