import { IonPage, IonContent, IonButton, IonBackButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonLabel, IonList, IonText, IonIcon, IonInput, IonItem } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import ExerciseDescriptionModal from "../components/ExerciseDescriptionModal";
import { useEditWorkoutPlan } from "../hooks/useEditWorkoutPlan";
import { useExerciseList } from "../hooks/useExerciseList";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { AddExerciseModal } from "./CreateWorkout";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refetchWorkouts } from "../slices/refetch";

const EditWorkout = (props: { match: { params : { id: string }}}) => {
  const {
    match,
  } = props;

  const { id } = match.params;
  const [counter, setCounter] = useState(0);
  const [listOfExercises, setListOfExercises] = useState<CurrentListOfExercises[]|undefined>();

  const {
    loading: getAllExercisesLoading,
    error: getAllExercisesError,
    data: exerciseList
  } = useExerciseList({ planId: id })

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

  const triggerId = 'open-add-exercise-modal-for-editing';

  const {
    refetchFn: editNewWorkoutPlanFn,
    loading: isEditingWorkoutPlan,
    data: editNewWorkoutPlanData,
  } = useEditWorkoutPlan()

  const onEditWorkout = useCallback(() => {
    if (isEditingWorkoutPlan) return;

    const variables: EditWorkoutExerciseItem[] = [];

    if (!listOfExercises) return;

    for (const exerciseListItem of listOfExercises) {
      const {
        id,
        dataAttribute,
      } = exerciseListItem;

      const sets = document.querySelector(`[data-sets-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const reps = document.querySelector(`[data-reps-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const load = document.querySelector(`[data-load-input="${dataAttribute}"]`) as HTMLIonInputElement;

      variables.push({
        sets: sets?.value ? String(sets.value) : '',
        reps: reps?.value ? String(reps.value) : '',
        load: load?.value ? String(load.value) : '',
        id,
      })
    }

    editNewWorkoutPlanFn({ planId: id, variables });
  }, [editNewWorkoutPlanFn, id, isEditingWorkoutPlan, listOfExercises]);

  const dispatch = useDispatch();

  useLoadingAlert({
    loading: isEditingWorkoutPlan,
    message: 'Creating workout...',
  })

  const onSelectExercise = useCallback((exercise: ExerciseOptionItem) => {
    const { id, name, instructions, equipment } = exercise;

    let currentListOfExercises: CurrentListOfExercises[] = [];

    if (listOfExercises) {
      currentListOfExercises = [...listOfExercises];
    }

    currentListOfExercises.push({
      id,
      name,
      equipment,
      instructions,
      load: '',
      sets: '',
      reps: '',
      dataAttribute: getDataAttributeFromExercise({
        id,
        name,
        counter,
      }),
    });

    setCounter(counter + 1);
    setListOfExercises(currentListOfExercises);
  }, [counter, listOfExercises])

  if (editNewWorkoutPlanData?.Message === 'workout updated') {
    dispatch(refetchWorkouts());
    return <Redirect to="/workouts" />;
  }

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
          {listOfExercises?.map((exercise, idx) => {
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
