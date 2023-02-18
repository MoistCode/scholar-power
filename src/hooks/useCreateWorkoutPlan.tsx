import { useCallback } from "react";
import useFetch from "./useFetch";

export const useCreateWorkoutPlan = (): any => {
  const {
    fetchDataFn: createNewWorkoutPlan,
    loading,
    error,
    data,
  } = useFetch();

  const createNewWorkoutPlanFn = useCallback(async (variables: any) => {
    await createNewWorkoutPlan({
      endpoint: `/api/v1/workout`,
      method: 'POST',
      variables,
    });
  }, [createNewWorkoutPlan]);

  return {
    refetchFn: createNewWorkoutPlanFn,
    loading,
    error,
    data,
  };
}