import { useCallback } from "react";
import useFetch from "./useFetch";
import { useLoggedInUser } from "./useLoggedInUser";

export const useWorkoutList = () => {
  let {
    username,
  } = useLoggedInUser();

  const {
    fetchDataFn: getAllWorkouts,
    loading,
    error,
    data,
  } = useFetch<WorkoutOptionItemFromAPI[]>();

  const getAllWorkoutsFn = useCallback(async (args?: { force?: boolean }) => {
    await getAllWorkouts({
      endpoint: `/api/v1/workout/user/${username}`,
      method: 'GET',
      force: args?.force,
    });
  }, [getAllWorkouts, username]);

  let formattedData: WorkoutOptionItem[]|null = null;

  if (data) {
    formattedData = data
      .map((workout: WorkoutOptionItemFromAPI) => {
        return {
          planId: workout.PlanID,
          name: workout.Name,
          createdAt: workout.CreatedAt,
          editedAt: workout.EditedAt,
          creatorID: workout.CreatorID,
        };
      });
  }

  return {
    refetchFn: getAllWorkoutsFn,
    loading,
    error,
    data: formattedData,
  };
};