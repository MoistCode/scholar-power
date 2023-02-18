type ExerciseOptionItemFromAPI = {
  ID: string;
  Name: string;
  Muscle: string;
  Equipment: string;
  Instructions: string;
};

type ExerciseOptionItem = {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  instructions: string;
};

type UserExercise = {
  id: string;
  name: string;
  instructions: string;
  sets: string;
  reps: string;
  load: string;
};
