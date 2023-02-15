import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";

export const useExerciseList = (props: any): any => {
  const {
    planId,
  } = props;

  const {
    fetchDataFn: getAllExercises,
    loading,
    error,
    data,
  } = useFetch();

  const getAllExercisesFn = useCallback(async () => {
    await getAllExercises({
      endpoint: `/api/v1/workout/${planId}`,
      method: 'GET',
    });
  }, [getAllExercises, planId]);

  useEffect(() => {
    getAllExercisesFn();
  }, [getAllExercisesFn])

  return {
    refetchFn: getAllExercisesFn,
    loading,
    error,
    data,
  };
}