import { IonText } from "@ionic/react";
import { MuscleGroupOptions, useExerciseOptionsByGroup } from "../hooks/useExerciseOptionsByGroup";
import useLoadingAlert from "../hooks/useLoadingAlert";
import ExerciseOptionListItem from "./ExerciseOptionListItem";

const ExerciseOptionList = (props: ExerciseOptionListProps) => {
  const {
    muscleGroup,
    onSelectExercise,
  } = props;

  const {
    loading: getAllExerciseOptionsByGroupLoading,
    error: getAllExerciseOptionsByGroupError,
    data: exerciseOptionList
  } = useExerciseOptionsByGroup(muscleGroup)

  useLoadingAlert({
    loading: getAllExerciseOptionsByGroupLoading,
    message: 'Loading exercises...',
  });

  return (
    <>
      {exerciseOptionList?.map((exercise) => {
        const handleOnSelectExercise = () => {
          onSelectExercise(exercise);
        }

        return (
          <ExerciseOptionListItem
            key={exercise.id}
            exercise={exercise}
            onSelectExercise={handleOnSelectExercise}
          />
        );
      })}
      {getAllExerciseOptionsByGroupError &&
        <IonText color="primary">
          <h1>Something went wrong. Please try again later.</h1>
        </IonText>
      }
    </>
  );
};

export default ExerciseOptionList;

type ExerciseOptionListProps = {
  muscleGroup: MuscleGroupOptions;
  onSelectExercise: (exercise: ExerciseOptionItem) => void;
}