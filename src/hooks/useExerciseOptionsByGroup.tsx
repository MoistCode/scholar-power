import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";

export const useExerciseOptionsByGroup = (muscleGroup: any): any => {
  const {
    fetchDataFn: getAllExerciseOptionsByGroup,
    loading,
    error,
    data,
  } = useFetch();

  const getAllExerciseOptionsByGroupFn = useCallback(async () => {
    await getAllExerciseOptionsByGroup({
      endpoint: `/api/v1/exercise/${muscleGroup}`,
      method: 'GET',
    });
  }, [getAllExerciseOptionsByGroup, muscleGroup]);

  useEffect(() => {
    getAllExerciseOptionsByGroupFn();
  }, [getAllExerciseOptionsByGroupFn])

  return {
    refetchFn: getAllExerciseOptionsByGroupFn,
    loading,
    error,
    data,
  };
}