import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";
import { useLoggedInUser } from "./useLoggedInUser";

export const useWorkoutHistory = () => {
  const {
    fetchDataFn: getWorkoutHistory,
    loading,
    error,
    data,
  } = useFetch<CompletedWorkoutFromAPI[]>();

  let { uid } = useLoggedInUser() || {};

  const getWorkoutHistoryFn = useCallback(async (args?: { force?: boolean }) => {
    if (!uid) return;

    await getWorkoutHistory({
      endpoint: `/api/v1/history/${uid}`,
      method: 'GET',
      force: args?.force,
    });
  }, [getWorkoutHistory, uid]);

  useEffect(() => {
    getWorkoutHistoryFn({ force: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let formattedData: CompletedWorkout[]|null = null;

  if (data) {
    formattedData = data
      .map((completedWorkout: CompletedWorkoutFromAPI) => {
        return {
          athleteId: completedWorkout.AthleteID,
          date: completedWorkout.Date,
          duration: completedWorkout.Duration,
          id: completedWorkout.ID,
          notes: completedWorkout.Notes,
          planId: completedWorkout.PlanID,
        };
      });
  }

  return {
    refetchFn: getWorkoutHistoryFn,
    loading,
    error,
    data: formattedData,
  };
}