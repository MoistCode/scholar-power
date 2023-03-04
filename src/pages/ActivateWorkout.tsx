import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import ExerciseDescriptionModal from "../components/ExerciseDescriptionModal";
import Timer from "../components/Timer";
import { useExerciseList } from "../hooks/useExerciseList";
import useFetch from "../hooks/useFetch";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { endWorkout } from "../slices/activatedWorkout";
import { refetchWorkoutHistory } from "../slices/refetch";
import { RootState } from "../store";

const ActivateWorkout = (props: { match: { url: string }}) => {
  const { match } = props;

  // TODO: This is a hacky way to get the ID of the workout. We should
  // probably use a different method. For some reason the ID is not being
  // matched on the URL.
  const urlParts = match.url.split('/');
  const id = urlParts[2];

  const {
    loading: getAllExercisesLoading,
    error: getAllExercisesError,
    data: exerciseList
  } = useExerciseList({ planId: id })

  const {
    fetchDataFn: completeWorkout,
    loading: completeWorkoutLoading,
    data: completeWorkoutData,
  } = useFetch<{ Message: string }>();

  const [listOfExercises, setListOfExercises] = useState<CurrentListOfExercises[]|undefined>();

  useLoadingAlert({
    loading: getAllExercisesLoading,
    message: 'Loading workouts...',
  });

  useLoadingAlert({
    loading: completeWorkoutLoading,
    message: 'Completing workout...',
  });

  let { uid } = useLoggedInUser() || {};

  useEffect(() => {
    if (!exerciseList || getAllExercisesLoading || listOfExercises) return;

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
  }, [exerciseList, getAllExercisesLoading, listOfExercises]);

  const dispatch = useDispatch();
  const hasActivatedWorkout = useSelector((state: RootState) => state.activatedWorkout.hasActivatedWorkout);
  const timer = useSelector((state: RootState) => state.activatedWorkout.timer) as number;

  const onCompleteWorkout = async () => {
    if (!uid) return;

    const now = new Date();
    const msSinceStarted: number = now.getTime() - timer;

    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();

    await completeWorkout({
      endpoint: '/api/v1/history',
      method: 'POST',
      variables: {
        date: `${day}-${month}-${year}`,
        duration: msToTime(msSinceStarted),
        plan_id: id,
        athlete_id: uid,
      }
    });
  };

  useEffect(() => {
    if (completeWorkoutData?.Message === "History created") {
      dispatch(refetchWorkoutHistory());
      dispatch(endWorkout());
    }
  }, [completeWorkoutData, dispatch])

  if (completeWorkoutData?.Message === "History created") {
    return <Redirect to="/workouthistory" />;
  }

  if (!hasActivatedWorkout) {
    return <Redirect to="/workouts" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Working out...</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCompleteWorkout} color="success">Complete</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {getAllExercisesError &&
          <IonText color="primary">
            <h1>Something went wrong. Please try again later.</h1>
          </IonText>
        }
        {listOfExercises && listOfExercises.length > 0 &&
          <>
            <Timer />
            {listOfExercises?.map((exercise) => {
              const {
                name,
                instructions,
                dataAttribute,
                load,
                sets,
                reps,
              } = exercise;
    
              let triggerId = `open-activate-exercise-descripton-modal-${dataAttribute}`;
    
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
                    <IonLabel>Sets: {sets}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Reps: {reps}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Load: {load}</IonLabel>
                  </IonItem>
                </IonList>
              );
            })}
          </>
        }
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

function msToTime(duration: number) {
  let seconds: string|number = Math.floor((duration / 1000) % 60);
  let minutes: string|number = Math.floor((duration / (1000 * 60)) % 60);
  let hours: string|number = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}