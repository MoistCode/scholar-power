import { IonText, useIonLoading } from "@ionic/react";
import { useEffect } from "react";
import { useExerciseOptionsByGroup } from "../hooks/useExerciseOptionsByGroup";
import ExerciseOptionListItem from "./ExerciseOptionListItem";

const ExerciseOptionList = (props: any) => {
  const {
    muscleGroup,
    onSelectExercise,
  } = props;

  const [present, dismiss] = useIonLoading();

  const {
    loading: getAllExerciseOptionsByGroupLoading,
    error: getAllExerciseOptionsByGroupError,
    data: exerciseOptionList
  } = useExerciseOptionsByGroup(muscleGroup)

  useEffect(() => {
    if (getAllExerciseOptionsByGroupLoading) {
      present({
        message: 'Loading exercises...',
      });
    }

    if (!getAllExerciseOptionsByGroupLoading) {
      dismiss();
    }
  }, [dismiss, getAllExerciseOptionsByGroupLoading, present]);

  return (
    <>
      {exerciseOptionList?.map((exercise: any) => {
        const handleOnSelectExercise= () => {
          onSelectExercise(exercise);
        }

        return (
          <ExerciseOptionListItem
            key={exercise.ID}
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
