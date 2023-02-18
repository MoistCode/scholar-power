import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";

export const muscleGroups = Object.freeze([
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'traps',
  'triceps',
] as const);

export const useExerciseOptionsByGroup = (muscleGroup: MuscleGroupOptions) => {
  const {
    fetchDataFn: getAllExerciseOptionsByGroup,
    loading,
    error,
    data,
  } = useFetch<ExerciseOptionItemFromAPI[]>();

  const getAllExerciseOptionsByGroupFn = useCallback(async () => {
    await getAllExerciseOptionsByGroup({
      endpoint: `/api/v1/exercise/${muscleGroup}`,
      method: 'GET',
    });
  }, [getAllExerciseOptionsByGroup, muscleGroup]);

  useEffect(() => {
    getAllExerciseOptionsByGroupFn();
  }, [getAllExerciseOptionsByGroupFn])

  let formattedData: ExerciseOptionItem[]|null = null;

  if (data) {
    formattedData = data
      .map((exercise: ExerciseOptionItemFromAPI) => {
        return {
          id: exercise.ID,
          name: exercise.Name,
          muscle: exercise.Muscle,
          equipment: exercise.Equipment,
          instructions: exercise.Instructions,
        };
      });
  }

  return {
    refetchFn: getAllExerciseOptionsByGroupFn,
    loading,
    error,
    data: formattedData,
  };
}

export type MuscleGroupOptions = typeof muscleGroups[number];