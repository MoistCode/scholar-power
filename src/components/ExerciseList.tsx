import { IonText, useIonLoading } from "@ionic/react";
import { useEffect } from "react";
import { useExerciseList } from "../hooks/useExerciseList";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = (props: any) => {
  const {
    planId
  } = props;

  const [present, dismiss] = useIonLoading();

  const {
    loading: getAllExercisesLoading,
    error: getAllExercisesError,
    data: exerciseList
  } = useExerciseList({ planId })

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

  return (
    <>
      {exerciseList?.map((exercise: any) => (
        <ExerciseCard key={exercise.ID} exercise={exercise} />
      ))}
      {getAllExercisesError &&
        <IonText color="primary">
          <h1>Something went wrong. Please try again later.</h1>
        </IonText>
      }
    </>
  );
};

export default ExerciseList;
