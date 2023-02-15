import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";
import { useLoggedInUser } from "./useLoggedInUser";

export const useWorkoutList = () => {
  let loggedInUser = useLoggedInUser();

  const {
    fetchDataFn: getAllWorkouts,
    loading,
    error,
    data,
  } = useFetch();

  const getAllWorkoutsFn = useCallback(async () => {
    console.log('Fetching workouts...');
    await getAllWorkouts({
      endpoint: `/api/v1/workout/user/${loggedInUser?.username}`,
      method: 'GET',
    });
  }, [getAllWorkouts, loggedInUser?.username]);

  useEffect(() => {
    getAllWorkoutsFn();
  }, [getAllWorkoutsFn])

  return {
    refetchFn: getAllWorkoutsFn,
    loading,
    error,
    data,
  };
};