import { useCallback } from "react";
import useFetch from "./useFetch";

export const useEditWorkoutPlan = () => {
  const {
    fetchDataFn: editNewWorkoutPlan,
    loading,
    error,
    data,
  } = useFetch<EditWorkoutApiResponse>();

  const editNewWorkoutPlanFn = useCallback(async (args: editNewWorkoutPlanFnArgs) => {
    const { planId, variables } = args;

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

type editNewWorkoutPlanFnArgs = {
  planId: string,
  variables: EditWorkoutVariables
};