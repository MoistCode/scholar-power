import WorkoutCard from "./WorkoutCard";

const WorkoutList = (props: WorkoutListProps) => {
  const {
    workouts,
  } = props;

  return (
    <>
      {workouts?.map((workout) => (
        <WorkoutCard key={workout.planId} workout={workout} />
      ))}
    </>
  )
}

export default WorkoutList;

type WorkoutListProps = {
  workouts: WorkoutOptionItem[];
}