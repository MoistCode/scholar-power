import { IonText } from "@ionic/react";
import { useExerciseList } from "../hooks/useExerciseList";
import useLoadingAlert from "../hooks/useLoadingAlert";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = (props: any) => {
  const {
    planId
  } = props;

  const {
    loading: getAllExercisesLoading,
    error: getAllExercisesError,
    data: exerciseList
  } = useExerciseList({ planId });

  useLoadingAlert({
    loading: getAllExercisesLoading,
    message: 'Loading workouts...',
  })

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
