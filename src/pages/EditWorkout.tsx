import { IonPage, IonContent, IonButton, IonBackButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonLabel, IonList, IonText, IonIcon, IonInput, IonItem } from "@ionic/react";
import { informationCircleOutline, trashOutline } from "ionicons/icons";
import { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import ExerciseDescriptionModal from "../components/ExerciseDescriptionModal";
import { useEditWorkoutPlan } from "../hooks/useEditWorkoutPlan";
import { useExerciseList } from "../hooks/useExerciseList";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { AddExerciseModal } from "./CreateWorkout";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refetchWorkouts } from "../slices/refetch";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

const EditWorkout = (props: { match: { url: string }}) => {
  const {
    match,
  } = props;

  // TODO: This is a hacky way to get the ID of the workout. We should
  // probably use a different method. For some reason the ID is not being
  // matched on the URL.
  const urlParts = match.url.split('/');
  const id = urlParts[2];

  const [disableFinishButton, setDisableFinishButton] = useState(true);
  const [workoutName, setWorkoutName] = useState<string|undefined>();
  const [counter, setCounter] = useState(0);
  const [listOfExercises, setListOfExercises] = useState<CurrentListOfExercises[]|undefined>();
  const workoutNameRef = useRef<HTMLIonInputElement>(null);

  let { uid } = useLoggedInUser() || {};

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

    if (!workoutName && exerciseList.length > 0) {
      setWorkoutName(exerciseList[0].workoutName);
    }

    const exerciseListWithAttr = exerciseList.map((exercise, idx) => {
      return {
        id: exercise.id,
        exerciseId: exercise.exerciseId,
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
  }, [exerciseList, getAllExercisesLoading, listOfExercises, workoutName]);

  const triggerId = 'open-add-exercise-modal-for-editing';

  const {
    refetchFn: editNewWorkoutPlanFn,
    loading: isEditingWorkoutPlan,
    data: editNewWorkoutPlanData,
  } = useEditWorkoutPlan()

  const onEditWorkout = useCallback(() => {
    if (isEditingWorkoutPlan) return;

    if (!uid) {
      return;
    }

    const workoutName = workoutNameRef.current?.value;

    const variables: EditWorkoutVariables = {
      uid,
      name: workoutName ? String(workoutName) : '',
      exercises: []
    };

    if (!listOfExercises) return;

    for (const exerciseListItem of listOfExercises) {
      const {
        id,
        exerciseId,
        dataAttribute,
      } = exerciseListItem;

      const sets = document.querySelector(`[data-sets-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const reps = document.querySelector(`[data-reps-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const load = document.querySelector(`[data-load-input="${dataAttribute}"]`) as HTMLIonInputElement;

      variables.exercises.push({
        sets: sets?.value ? String(sets.value) : '',
        reps: reps?.value ? String(reps.value) : '',
        load: load?.value ? String(load.value) : '',
        id,
        exercise_id: exerciseId,
      })
    }

    editNewWorkoutPlanFn({ planId: id, variables });
  }, [editNewWorkoutPlanFn, id, isEditingWorkoutPlan, listOfExercises, uid]);

  const dispatch = useDispatch();

  useLoadingAlert({
    loading: isEditingWorkoutPlan,
    message: 'Creating workout...',
  })

  useEffect(() => {
    if (!listOfExercises) return;

    if (listOfExercises.length > 0 && disableFinishButton) {
      setDisableFinishButton(false);
    }

    if (!listOfExercises.length && !disableFinishButton) {
      setDisableFinishButton(true);
    }
  }, [disableFinishButton, listOfExercises]);

  const onSelectExercise = useCallback((exercise: ExerciseOptionItem) => {
    const { id: exerciseId, name, instructions, equipment } = exercise;

    let currentListOfExercises: CurrentListOfExercises[] = [];

    if (listOfExercises) {
      currentListOfExercises = [...listOfExercises];
    }

    currentListOfExercises.push({
      exerciseId,
      name,
      equipment,
      instructions,
      load: '',
      sets: '',
      reps: '',
      dataAttribute: getDataAttributeFromExercise({
        id: exerciseId,
        name,
        counter,
      }),
    });

    setCounter(counter + 1);
    setListOfExercises(currentListOfExercises);
  }, [counter, listOfExercises]);

  const onDeleteExercise = useCallback((dataAttribute: string) => {
    if (!listOfExercises) return;

    const newListOfExercises = listOfExercises.filter((exercise) => {
      return exercise.dataAttribute !== dataAttribute;
    });

    for (const exercise of newListOfExercises) {
      const { dataAttribute } = exercise;
      const sets = document.querySelector(`[data-sets-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const reps = document.querySelector(`[data-reps-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const load = document.querySelector(`[data-load-input="${dataAttribute}"]`) as HTMLIonInputElement;

      exercise.sets = sets?.value ? String(sets.value) : '';
      exercise.reps = reps?.value ? String(reps.value) : '';
      exercise.load = load?.value ? String(load.value) : '';
    }

    setListOfExercises(newListOfExercises);
  }, [listOfExercises]);

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
            <IonButton
              onClick={onEditWorkout}
              color="success"
              disabled={disableFinishButton}
            >
              Finish
            </IonButton>
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
          <IonItem>
            <IonLabel>Workout Name:</IonLabel>
            <IonInput
              value={workoutName}
              ref={workoutNameRef}
              placeholder="Enter workout name"
            />
          </IonItem>
          {listOfExercises?.map((exercise) => {
            const {
              name,
              instructions,
              dataAttribute,
              load,
              sets,
              reps,
            } = exercise;

            let triggerId = `open-exercise-descripton-modal-${dataAttribute}`;

            const setsProps = {
              'data-sets-input': dataAttribute,
              type: 'number',
            } as any;

            const repsProps = {
              'data-reps-input': dataAttribute,
              type: 'number',
            } as any;

            const loadProps = {
              'data-load-input': dataAttribute,
            } as any;

            if (sets) setsProps.value = sets;
            if (reps) repsProps.value = reps;
            if (load) loadProps.value = load;

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
                  <IonButton onClick={() => onDeleteExercise(dataAttribute)} fill="clear">
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonButton>
                  <ExerciseDescriptionModal
                    triggerId={triggerId}
                    instructions={instructions}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Sets: </IonLabel>
                  <IonInput {...setsProps} />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Reps: </IonLabel>
                  <IonInput {...repsProps} />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Load: </IonLabel>
                  <IonInput {...loadProps} />
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
  id?: string;
  exerciseId: string;
  name: string;
  instructions: string;
  equipment: string;
  dataAttribute: string;
  load: string;
  sets: string;
  reps: string;
};
