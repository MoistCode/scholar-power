type CreateWorkoutApiResponse = {
  Message: string;
};

type CreateWorkoutVariables = {
  uid: string;
  name: string;
  exercises: CreateWorkoutExerciseItem[];
}

type CreateWorkoutExerciseItem = {
  sets: string;
  reps: string;
  load: string;
  exercise_id: string;
}

type WorkoutOptionItemFromAPI = {
  PlanID: string;
  Name: string;
  CreatedAt: string;
  EditedAt: string;
  CreatorID: string;
};

type WorkoutOptionItem = {
  planId: string;
  name: string;
  createdAt: string;
  editedAt: string;
  creatorID: string;
};

type EditWorkoutApiResponse = {
  Message: string;
};

type EditWorkoutVariables = {
  uid: string;
  name: string;
  exercises: EditWorkoutExerciseItem[];
}

type EditWorkoutExerciseItem = {
  sets: string;
  reps: string;
  load: string;
  id?: string;
  exercise_id: string;
}
