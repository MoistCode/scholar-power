import { useMemo } from "react";
import WorkoutCard from "./WorkoutCard";

const WorkoutList = (props: WorkoutListProps) => {
  const {
    workouts,
  } = props;

  // Sort workouts by last edited date.
  const sortedWorkoutList = useMemo(() => workouts.sort((a, b) => {
    const aDate = new Date(a.editedAt);
    const bDate = new Date(b.editedAt);
    return bDate.getTime() - aDate.getTime();
  }), [workouts]);

  return (
    <>
      {sortedWorkoutList?.map((workout) => (
        <WorkoutCard key={workout.planId} workout={workout} />
      ))}
    </>
  )
}

export default WorkoutList;

type WorkoutListProps = {
  workouts: WorkoutOptionItem[];
}