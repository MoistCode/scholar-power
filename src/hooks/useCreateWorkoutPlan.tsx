import { useCallback } from "react";
import useFetch from "./useFetch";

export const useCreateWorkoutPlan = () => {
  const {
    fetchDataFn: createNewWorkoutPlan,
    loading,
    error,
    data,
  } = useFetch<CreateWorkoutApiResponse>();

  const createNewWorkoutPlanFn = useCallback(async (variables: CreateWorkoutVariables) => {
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