import { IonPage, IonContent, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonInput, IonItem, IonList, IonLabel, IonIcon, IonModal, IonSelect, IonSelectOption, useIonToast } from "@ionic/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { informationCircleOutline, trashOutline } from "ionicons/icons";
import ExerciseDescriptionModal from "../components/ExerciseDescriptionModal";
import ExerciseOptionList from "../components/ExerciseOptionList";
import { useCreateWorkoutPlan } from "../hooks/useCreateWorkoutPlan";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { MuscleGroupOptions, muscleGroups } from '../hooks/useExerciseOptionsByGroup';
import { refetchWorkouts } from "../slices/refetch";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";

const CreateWorkout = () => {
  const workoutNameRef = useRef<HTMLIonInputElement>(null);

  const [counter, setCounter] = useState(0);
  const [disableFinishButton, setDisableFinishButton] = useState(true);
  const [listOfExercises, setListOfExercises] = useState<CurrentListOfExercises[]>([]);

  let { uid } = useLoggedInUser() || {};

  // TODO: Redirect to the workout list page after the workout has been created
  // and clear the form.

  // TODO: Disable workout name unless there is at least one exercise in the
  // workout and a workout name has been entered.

  const triggerId = 'open-add-exercise-modal';

  const dispatch = useDispatch();

  const {
    refetchFn: createNewWorkoutPlanFn,
    loading: isCreatingWorkoutPlan,
    data: createdWorkoutPlanData,
    reset: resetCreateWorkoutPlanData,
  } = useCreateWorkoutPlan()

  const onCreateNewWorkout = useCallback(() => {
    if (isCreatingWorkoutPlan) return;

    const workoutName = workoutNameRef.current?.value;

    if (!uid) {
      return;
    }

    const variables: CreateWorkoutVariables = {
      uid,
      name: workoutName ? String(workoutName) : '',
      exercises: []
    };

    for (const exerciseListItem of listOfExercises) {
      const {
        id,
        dataAttribute,
      } = exerciseListItem;

      const sets = document.querySelector(`[data-sets-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const reps = document.querySelector(`[data-reps-input="${dataAttribute}"]`) as HTMLIonInputElement;
      const load = document.querySelector(`[data-load-input="${dataAttribute}"]`) as HTMLIonInputElement;

      variables.exercises.push({
        sets: sets?.value ? String(sets.value) : '',
        reps: reps?.value ? String(reps.value) : '',
        load: load?.value ? String(load.value) : '',
        exercise_id: id,
      })
    }

    createNewWorkoutPlanFn(variables);
  }, [createNewWorkoutPlanFn, isCreatingWorkoutPlan, listOfExercises, uid]);

  const [present] = useIonToast();

  useLoadingAlert({
    loading: isCreatingWorkoutPlan,
    message: 'Creating workout...',
  });

  const onSelectExercise = useCallback((exercise: ExerciseOptionItem) => {
    const { id, name, instructions, equipment } = exercise;
    const currentListOfExercises = [...listOfExercises];

    currentListOfExercises.push({
      id,
      name,
      equipment,
      instructions,
      dataAttribute: getDataAttributeFromExercise({
        id,
        name,
        counter,
      }),
    });

    setCounter(counter + 1);
    setListOfExercises(currentListOfExercises);
  }, [counter, listOfExercises])

  useEffect(() => {
    if (createdWorkoutPlanData?.Message === 'workout created') {
      resetCreateWorkoutPlanData();
      dispatch(refetchWorkouts());
    }
  }, [createdWorkoutPlanData?.Message, dispatch, resetCreateWorkoutPlanData])

  useEffect(() => {
    if (!listOfExercises) return;

    if (listOfExercises.length > 0 && disableFinishButton) {
      setDisableFinishButton(false);
    }

    if (!listOfExercises.length && !disableFinishButton) {
      setDisableFinishButton(true);
    }
  }, [disableFinishButton, listOfExercises]);

  const onDeleteExercise = useCallback((dataAttribute: string) => {
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

  if (createdWorkoutPlanData?.Message === 'workout created') {
    present({
      message: 'Workout created!',
      duration: 1500,
      position: 'top',
    });

    return <Redirect to="/workouts" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create workout</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={onCreateNewWorkout}
              color="success"
              disabled={disableFinishButton}
            >
              Finish
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Workout Name:</IonLabel>
            <IonInput ref={workoutNameRef} placeholder="Enter workout name" />
          </IonItem>
          {listOfExercises.map((exercise) => {
            const {
              name,
              instructions,
              dataAttribute,
              sets,
              reps,
              load,
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
                  <IonInput {...setsProps}/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Reps: </IonLabel>
                  <IonInput {...repsProps}/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Load: </IonLabel>
                  <IonInput {...loadProps}/>
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

export default CreateWorkout;

export const AddExerciseModal = (props: AddExerciseModalProps) => {
  const {
    triggerId,
    onSelectExercise,
  } = props;
  
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroupOptions>();

  const modal = useRef<HTMLIonModalElement>(null);

  const confirm = () => {
    modal.current?.dismiss('', 'confirm');
  };

  return (
    <IonModal ref={modal} trigger={triggerId}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList>
        <IonItem>
          <IonSelect
            placeholder="Select Muscle Group"
            onIonChange={((e) => setMuscleGroup(e.detail.value))}
            value={muscleGroup}
          >
            {muscleGroups.map((muscleGroup) => {
              return (
                <IonSelectOption value={muscleGroup} key={muscleGroup}>
                  {muscleGroup.replace('_', ' ').toUpperCase()}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
      </IonList>
        {muscleGroup &&
          <ExerciseOptionList
            muscleGroup={muscleGroup}
            onSelectExercise={onSelectExercise}
            dismissOptionList={confirm}
          />
        }
      </IonContent>
    </IonModal>
  );
};

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
  sets?: string;
  reps?: string;
  load?: string;
};

type AddExerciseModalProps = {
  triggerId: string;
  onSelectExercise: (exercise: ExerciseOptionItem) => void;
};
