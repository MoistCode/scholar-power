import { IonPage, IonContent, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonInput, IonItem, IonList, IonLabel, IonIcon, IonModal, IonSelect, IonSelectOption, useIonLoading } from "@ionic/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { informationCircleOutline } from "ionicons/icons";
import ExerciseDescriptionModal from "../components/ExerciseDescriptionModal";
import ExerciseOptionList from "../components/ExerciseOptionList";
import { useCreateWorkoutPlan } from "../hooks/useCreateWorkoutPlan";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

const muscleGroups = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

const CreateWorkout = () => {
  const workoutNameRef = useRef<HTMLIonInputElement>(null);

  const [counter, setCounter] = useState(0);
  const [listOfExercises, setListOfExercises] = useState<any>([]);

  let { uid } = useLoggedInUser() || {};

  // TODO: Redirect to the workout list page after the workout has been created
  // and clear the form.

  // TODO: Disable workout name unless there is at least one exercise in the
  // workout and a workout name has been entered.

  const triggerId = 'open-add-exercise-modal';

  const {
    refetchFn: createNewWorkoutPlanFn,
    loading: isCreatingWorkoutPlan,
    data: createdWorkoutPlanResponse,
  } = useCreateWorkoutPlan()

  const [present, dismiss] = useIonLoading();

  const onCreateNewWorkout = useCallback(() => {
    const workoutName = workoutNameRef.current?.value;

    const variables = {
      uid,
      name: workoutName,
      exercises: [] as any[],
    };

    for (const exerciseListItem of listOfExercises) {
      const {
        id,
        dataAttribute,
      } = exerciseListItem;

      const sets = document.querySelector(`[data-sets-input="${dataAttribute}"]`) as any;
      const reps = document.querySelector(`[data-reps-input="${dataAttribute}"]`) as any;
      const load = document.querySelector(`[data-load-input="${dataAttribute}"]`) as any;

      variables.exercises.push({
        sets: sets?.value,
        reps: reps?.value,
        load: load?.value,
        exercise_id: id,
      })
    }

    createNewWorkoutPlanFn(variables);
  }, [createNewWorkoutPlanFn, listOfExercises, uid]);


  useEffect(() => {
    if (isCreatingWorkoutPlan) {
      present({
        message: 'Creating workout...',
      });
    }

    if (!isCreatingWorkoutPlan) {
      dismiss();
    }
  }, [dismiss, isCreatingWorkoutPlan, present]);

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
          {listOfExercises.map((exercise: any, idx: any) => {
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

const AddExerciseModal = (props: any) => {
  const { triggerId, onSelectExercise } = props;
  
  const [muscleGroup, setMuscleGroup] = useState<string>();

  const modal = useRef<HTMLIonModalElement>(null);

  function confirm() {
    modal.current?.dismiss('', 'confirm');
  }

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
          />
        }
      </IonContent>
    </IonModal>
  );
};

function getDataAttributeFromExercise(exercise: any, counter: any) {
  const {
    ID,
    Name,
  } = exercise;

  return `${Name.replace(' ', '-').toLowerCase()}-${counter}-${ID}`;
}
