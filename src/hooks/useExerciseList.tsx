import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";

export const useExerciseList = (props: { planId: string }) => {
  const {
    planId,
  } = props;

  const {
    fetchDataFn: getAllExercises,
    loading,
    error,
    data,
  } = useFetch<WorkoutUserExerciseItemFromAPI[]>();

  const getAllExercisesFn = useCallback(async () => {
    await getAllExercises({
      endpoint: `/api/v1/workout/${planId}`,
      method: 'GET',
    });
  }, [getAllExercises, planId]);

  useEffect(() => {
    getAllExercisesFn();
  }, [getAllExercisesFn])

  let formattedData: WorkoutUserExerciseItem[]|null = null;

  if (data) {
    formattedData = data
      .map((workoutExercise: WorkoutUserExerciseItemFromAPI) => {
        return {
          id: workoutExercise.ID,
          planId: workoutExercise.PlanID,
          name: workoutExercise.Name,
          sets: workoutExercise.Sets,
          reps: workoutExercise.Reps,
          load: workoutExercise.Load,
          exerciseName: workoutExercise.ExerciseName,
          exerciseMuscle: workoutExercise.ExerciseMuscle,
          exerciseEquipment: workoutExercise.ExerciseEquipment,
          exerciseInstructions: workoutExercise.ExerciseInstructions,
          exerciseId: workoutExercise.ExerciseID,
          workoutName: workoutExercise.Name,
        };
      });
  }

  return {
    refetchFn: getAllExercisesFn,
    loading,
    error,
    data: formattedData,
  };
}