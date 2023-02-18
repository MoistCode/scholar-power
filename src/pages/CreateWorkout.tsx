import { IonPage, IonContent, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonInput, IonItem, IonList, IonLabel, IonIcon, IonModal, IonSelect, IonSelectOption } from "@ionic/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { informationCircleOutline } from "ionicons/icons";
import ExerciseDescriptionModal from "../components/ExerciseDescriptionModal";
import ExerciseOptionList from "../components/ExerciseOptionList";
import { useCreateWorkoutPlan } from "../hooks/useCreateWorkoutPlan";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { MuscleGroupOptions, muscleGroups } from '../hooks/useExerciseOptionsByGroup';

const CreateWorkout = () => {
  const workoutNameRef = useRef<HTMLIonInputElement>(null);

  const [counter, setCounter] = useState(0);
  const [listOfExercises, setListOfExercises] = useState<CurrentListOfExercises[]>([]);

  let { uid, redirectIfNotLoggedIn } = useLoggedInUser() || {};

  // TODO: Redirect to the workout list page after the workout has been created
  // and clear the form.

  // TODO: Disable workout name unless there is at least one exercise in the
  // workout and a workout name has been entered.

  const triggerId = 'open-add-exercise-modal';

  const {
    refetchFn: createNewWorkoutPlanFn,
    loading: isCreatingWorkoutPlan,
    data: createdWorkoutPlanData,
  } = useCreateWorkoutPlan()

  const onCreateNewWorkout = useCallback(() => {
    const workoutName = workoutNameRef.current?.value;

    if (!uid) {
      redirectIfNotLoggedIn();
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
  }, [createNewWorkoutPlanFn, listOfExercises, redirectIfNotLoggedIn, uid]);

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
      setListOfExercises([]);
      // @ts-expect-error Should exist here.
      workoutNameRef.current.value = '';
    }
  }, [createdWorkoutPlanData?.Message])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create workout</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCreateNewWorkout} color="success">Finish</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Workout Name:</IonLabel>
            <IonInput ref={workoutNameRef} placeholder="Enter workout name" />
          </IonItem>
          {listOfExercises.map((exercise, idx: number) => {
            const {
              name,
              instructions,
              dataAttribute,
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
                  <IonInput type="number" data-sets-input={dataAttribute} />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Reps: </IonLabel>
                  <IonInput type="number" data-reps-input={dataAttribute} />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Load: </IonLabel>
                  <IonInput data-load-input={dataAttribute} />
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
  const { triggerId, onSelectExercise } = props;
  
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
};

type AddExerciseModalProps = {
  triggerId: string;
  onSelectExercise: (exercise: ExerciseOptionItem) => void;
};