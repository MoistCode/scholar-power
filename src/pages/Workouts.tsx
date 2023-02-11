import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  useIonActionSheet,
  IonModal,
  useIonLoading,
  IonText,
  IonCardContent,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { createOutline, playOutline } from 'ionicons/icons';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { EditOrCreateWorkout } from './CreateWorkout';
import styles from './Workouts.module.css';

const testListOfWorkouts = [
  {
    "PlanID": "1",
    "Name": "Ab Day",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "1"
  },
  {
    "PlanID": "2",
    "Name": "Ab Day 2",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "1"
  },
  {
    "PlanID": "3",
    "Name": "Ab Day 3",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "1"
  }
];

const testListOfExercises = [
  [
    {
      "ID": "1",
      "PlanID": "1",
      "Name": "Ab Day",
      "Sets": "3",
      "Reps": "10",
      "Load": "N/A",
      "ExerciseName": "Elbow plank",
      "ExerciseMuscle": "abdominals",
      "ExerciseEquipment": "body_only",
      "ExerciseInstructions": "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder. Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised."
  },
  {
      "ID": "2",
      "PlanID": "1",
      "Name": "Ab Day",
      "Sets": "3",
      "Reps": "10",
      "Load": "N/A",
      "ExerciseName": "Bottoms Up",
      "ExerciseMuscle": "abdominals",
      "ExerciseEquipment": "body_only",
      "ExerciseInstructions": "Begin by lying on your back on the ground. Your legs should be straight and your arms at your side. This will be your starting position. To perform the movement, tuck the knees toward your chest by flexing the hips and knees. Following this, extend your legs directly above you so that they are perpendicular to the ground. Rotate and elevate your pelvis to raise your glutes from the floor. After a brief pause, return to the starting position."
  },
  {
      "ID": "3",
      "PlanID": "1",
      "Name": "Ab Day",
      "Sets": "3",
      "Reps": "10",
      "Load": "N/A",
      "ExerciseName": "Landmine twist",
      "ExerciseMuscle": "abdominals",
      "ExerciseEquipment": "other",
      "ExerciseInstructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
  }
  ],
  [
    {
      "ID": "4324",
      "PlanID": "2",
      "Name": "Ab Day 2",
      "Sets": "3",
      "Reps": "10",
      "Load": "N/A",
      "ExerciseName": "Elbow plank",
      "ExerciseMuscle": "abdominals",
      "ExerciseEquipment": "body_only",
      "ExerciseInstructions": "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder. Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised."
    },
    {
        "ID": "654456",
        "PlanID": "2",
        "Name": "Ab Day 2",
        "Sets": "3",
        "Reps": "10",
        "Load": "N/A",
        "ExerciseName": "Bottoms Up",
        "ExerciseMuscle": "abdominals",
        "ExerciseEquipment": "body_only",
        "ExerciseInstructions": "Begin by lying on your back on the ground. Your legs should be straight and your arms at your side. This will be your starting position. To perform the movement, tuck the knees toward your chest by flexing the hips and knees. Following this, extend your legs directly above you so that they are perpendicular to the ground. Rotate and elevate your pelvis to raise your glutes from the floor. After a brief pause, return to the starting position."
    },
    {
        "ID": "34324",
        "PlanID": "2",
        "Name": "Ab Day 2",
        "Sets": "3",
        "Reps": "10",
        "Load": "N/A",
        "ExerciseName": "Landmine twist",
        "ExerciseMuscle": "abdominals",
        "ExerciseEquipment": "other",
        "ExerciseInstructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
    }
  ],
  [
    {
      "ID": "4354324",
      "PlanID": "3",
      "Name": "Ab Day 3",
      "Sets": "3",
      "Reps": "10",
      "Load": "N/A",
      "ExerciseName": "Elbow plank",
      "ExerciseMuscle": "abdominals",
      "ExerciseEquipment": "body_only",
      "ExerciseInstructions": "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder. Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised."
    },
    {
        "ID": "6554354456",
        "PlanID": "3",
        "Name": "Ab Day 3",
        "Sets": "3",
        "Reps": "10",
        "Load": "N/A",
        "ExerciseName": "Bottoms Up",
        "ExerciseMuscle": "abdominals",
        "ExerciseEquipment": "body_only",
        "ExerciseInstructions": "Begin by lying on your back on the ground. Your legs should be straight and your arms at your side. This will be your starting position. To perform the movement, tuck the knees toward your chest by flexing the hips and knees. Following this, extend your legs directly above you so that they are perpendicular to the ground. Rotate and elevate your pelvis to raise your glutes from the floor. After a brief pause, return to the starting position."
    },
    {
        "ID": "345435324",
        "PlanID": "3",
        "Name": "Ab Day 3",
        "Sets": "3",
        "Reps": "10",
        "Load": "N/A",
        "ExerciseName": "Landmine twist",
        "ExerciseMuscle": "abdominals",
        "ExerciseEquipment": "other",
        "ExerciseInstructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
    }
  ]
];

/**
 * This component is the page responsible for displaying the user-generated
 * workouts.
 */
const Workouts = () => {
  let loggedInUser = useLoggedInUser();
  
  const {
    fetchDataFn: getAllWorkouts,
    loading: getAllWorkoutsLoading,
    error: getAllWorkoutsError,
    data: getAllWorkoutsData,
  } = useFetch();

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (getAllWorkoutsLoading) {
      present({
        message: 'Loading workouts...',
      });
    }

    if (!getAllWorkoutsLoading) {
      dismiss();
    }
  }, [dismiss, getAllWorkoutsLoading, present]);

  useEffect(() => {
    (async function() {
      await getAllWorkouts({
        variables: {
          name: loggedInUser?.username,
        },
        endpoint: '/api/v1/workout/user',
        method: 'GET',
      });
    })();
  }, [getAllWorkouts, loggedInUser?.username])

  return (
    <IonPage>
      <Header title="Workouts" />
      <IonContent fullscreen>
        {Array.isArray(testListOfWorkouts) &&
          testListOfWorkouts.map((workout: any) => {
            let {
              PlanID,
            } = workout;
            
            return (
              <WorkoutCard
                key={PlanID}
                workout={workout}
              />
            );
          }) 
        }

          {/* {getAllWorkoutsError &&
            <IonText color="primary">
              <h1>Something went wrong. Please try again later.</h1>
            </IonText>
          } */}
      </IonContent>
    </IonPage>
  );
};

export default Workouts;

const WorkoutCard = (props: WorkoutCardProps) => {
  const {
    workout,
  } = props;

  const {
    PlanID: planId,
    Name: name,
    CreatedAt: createdAt,
    EditedAt: editedAt,
  } = workout;

  const [present] = useIonActionSheet();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState<OverlayEventDetail>();

  let modalId = `open-edit-modal-${planId}`;

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{name}</IonCardTitle>
          <IonCardSubtitle>Creation Date: {createdAt}</IonCardSubtitle>
          <IonCardSubtitle>Last Edited: {editedAt}</IonCardSubtitle>
        </IonCardHeader>
        <div className={styles.createButtonContainer}>
          <IonButton fill="clear" id={modalId}>
            <IonIcon slot="icon-only" icon={createOutline} />
          </IonButton>
          <IonButton
            fill="clear"
            onClick={() =>
              present({
                header: 'Start this workout?',
                buttons: [
                  {
                    text: 'Yes',
                    data: {
                      action: 'startworkout',
                    },
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    data: {
                      action: 'cancel',
                    },
                  },
                ],
                onDidDismiss: ({ detail }) => setResult(detail),
              })
            }
          >
            <IonIcon slot="icon-only" icon={playOutline} />
          </IonButton>
        </div>
      </IonCard>

      <EditWorkoutModal
        modalId={modalId}
        planId={planId}
      />
    </>
  );
}

type WorkoutCardProps = {
  workout: Workout;
};

type Workout = {
  PlanID: string;
  WorkoutID: string;
  Name: string;
  CreatedAt: string;
  CreatorID: string;
  EditedAt: string;
};

const EditWorkoutModal = (props: any) => {
  let {
    modalId,
    planId,
  } = props;

  const {
    fetchDataFn: getAllExercises,
    loading: getAllExercisesLoading,
    error: getAllExercisesError,
    data: getAllExercisesData,
  } = useFetch();

  useEffect(() => {
    (async function() {
      await getAllExercises({
        endpoint: `/api/v1/workout/${planId}`,
        variables: {},
        method: 'GET',
      });
    })();
  }, [getAllExercises, planId]);

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (getAllExercisesLoading) {
      present({
        message: 'Loading workouts...',
      });
    }

    if (!getAllExercisesLoading) {
      dismiss();
    }
  }, [dismiss, getAllExercisesLoading, present]);

  const modal = useRef<HTMLIonModalElement>(null);

  const onEditWorkout = () => {
    console.log('cowman finished editing workout');
  }

  const onDismiss = () => {
    modal.current?.dismiss();
  }

  return (
    <IonModal ref={modal} trigger={modalId}>
      {testListOfExercises[planId]
        ? (
          <EditOrCreateWorkout
            headerTitle="Edit Workout"
            primaryButtonText="Submit"
            onSubmit={onEditWorkout}
            onDismiss={onDismiss}
            exercises={getAllExercisesData}
          />
        )
        : (
          <IonText color="primary">
            <h1>Something went wrong. Please try again later.</h1>
          </IonText>
        )
      }
    </IonModal>
  );
}