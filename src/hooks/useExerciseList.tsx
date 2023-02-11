import { useCallback, useEffect } from "react";
import useFetch from "./useFetch";

const testListOfExercisesForPlan1 = [
  {
    "ID": "1",
    "PlanID": "1",
    "Name": "Ab Day",
    "Sets": "3",
    "Reps": "10",
    "Load": "N/A",
    "ExerciseName": "Elbow plank",
    "ExerciseMuscle": "abdominals",
    "ExerciseEquipment": "body_only",
    "ExerciseInstructions": "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder. Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised."
  },
  {
    "ID": "2",
    "PlanID": "1",
    "Name": "Ab Day",
    "Sets": "3",
    "Reps": "10",
    "Load": "N/A",
    "ExerciseName": "Bottoms Up",
    "ExerciseMuscle": "abdominals",
    "ExerciseEquipment": "body_only",
    "ExerciseInstructions": "Begin by lying on your back on the ground. Your legs should be straight and your arms at your side. This will be your starting position. To perform the movement, tuck the knees toward your chest by flexing the hips and knees. Following this, extend your legs directly above you so that they are perpendicular to the ground. Rotate and elevate your pelvis to raise your glutes from the floor. After a brief pause, return to the starting position."
  },
  {
    "ID": "3",
    "PlanID": "1",
    "Name": "Ab Day",
    "Sets": "3",
    "Reps": "10",
    "Load": "N/A",
    "ExerciseName": "Landmine twist",
    "ExerciseMuscle": "abdominals",
    "ExerciseEquipment": "other",
    "ExerciseInstructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
  },
  {
    "ID": "12",
    "PlanID": "1",
    "Name": "Ab Day",
    "Sets": "32",
    "Reps": "102",
    "Load": "22",
    "ExerciseName": "Elbow plank 2",
    "ExerciseMuscle": "abdominals",
    "ExerciseEquipment": "body_only",
    "ExerciseInstructions": "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder. Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised."
  },
  {
    "ID": "22",
    "PlanID": "1",
    "Name": "Ab Day",
    "Sets": "32",
    "Reps": "102",
    "Load": "22",
    "ExerciseName": "Bottoms Up 2",
    "ExerciseMuscle": "abdominals",
    "ExerciseEquipment": "body_only",
    "ExerciseInstructions": "Begin by lying on your back on the ground. Your legs should be straight and your arms at your side. This will be your starting position. To perform the movement, tuck the knees toward your chest by flexing the hips and knees. Following this, extend your legs directly above you so that they are perpendicular to the ground. Rotate and elevate your pelvis to raise your glutes from the floor. After a brief pause, return to the starting position."
  },
  {
    "ID": "32",
    "PlanID": "1",
    "Name": "Ab Day",
    "Sets": "32",
    "Reps": "102",
    "Load": "22",
    "ExerciseName": "Landmine twist 2",
    "ExerciseMuscle": "abdominals",
    "ExerciseEquipment": "other",
    "ExerciseInstructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
  }
];

export const useExerciseList = (props: any) => {
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

  if (process.env.REACT_APP_ENV === 'development') {
    return {
      refetchFn: getAllExercisesFn,
      loading: false,
      error: null,
      data: testListOfExercisesForPlan1,
    };
  } else {
    return {
      refetchFn: getAllExercisesFn,
      loading,
      error,
      data,
    };
  }
}