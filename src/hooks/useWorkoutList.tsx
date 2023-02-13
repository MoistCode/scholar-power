import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";
import { useLoggedInUser } from "./useLoggedInUser";

const testingListOfWorkouts = [
  {
    "PlanID": "1",
    "Name": "Ab Day",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "1"
  },
  {
    "PlanID": "2",
    "Name": "Core",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "2"
  },
  {
    "PlanID": "12",
    "Name": "Ab Day 2",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "1"
  },
  {
    "PlanID": "22",
    "Name": "Core2",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "2"
  },
  {
    "PlanID": "13",
    "Name": "Ab Day3",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "1"
  },
  {
    "PlanID": "23",
    "Name": "Core3",
    "CreatedAt": "2023-02-10 06:49:41.000",
    "EditedAt": "2023-02-10 06:49:41.000",
    "CreatorID": "2"
  },
];

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

  console.log('workout props', {
    refetchFn: getAllWorkoutsFn,
    loading,
    error,
    data,
  });
  if (process.env.REACT_APP_ENV === 'development') {
    return {
      refetchFn: getAllWorkoutsFn,
      loading: false,
      error: null,
      data: testingListOfWorkouts,
    };
  } else {
    return {
      refetchFn: getAllWorkoutsFn,
      loading,
      error,
      data,
    };
  }
};