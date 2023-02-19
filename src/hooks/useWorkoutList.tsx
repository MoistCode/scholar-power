import { useCallback, useEffect } from "react";
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

  const getAllWorkoutsFn = useCallback(async () => {
    await getAllWorkouts({
      endpoint: `/api/v1/workout/user/${username}`,
      method: 'GET',
    });
  }, [getAllWorkouts, username]);

  useEffect(() => {
    getAllWorkoutsFn();
  }, [getAllWorkoutsFn])

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