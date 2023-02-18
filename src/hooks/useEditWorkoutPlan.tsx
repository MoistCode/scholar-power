import { useCallback } from "react";
import useFetch from "./useFetch";

export const useEditWorkoutPlan = (): any => {
  const {
    fetchDataFn: editNewWorkoutPlan,
    loading,
    error,
    data,
  } = useFetch();

  const editNewWorkoutPlanFn = useCallback(async ({planId, variables}: any) => {
    await editNewWorkoutPlan({
      endpoint: `/api/v1/workout/${planId}`,
      method: 'PUT',
      variables,
    });
  }, [editNewWorkoutPlan]);

  return {
    refetchFn: editNewWorkoutPlanFn,
    loading,
    error,
    data,
  };
}