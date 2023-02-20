type WorkoutUserExerciseItemFromAPI = {
  ID: string;
  PlanID: string;
  Name: string;
  Sets: string;
  Reps: string;
  Load: string;
  ExerciseName: string;
  ExerciseMuscle: string;
  ExerciseEquipment: string;
  ExerciseInstructions:string;
  ExerciseID: string;
}

type WorkoutUserExerciseItem = {
  id: string;
  planId: string;
  name: string;
  sets: string;
  reps: string;
  load: string;
  exerciseName: string;
  exerciseMuscle: string;
  exerciseEquipment: string;
  exerciseInstructions: string;
  exerciseId: string;
  workoutName: string;
};