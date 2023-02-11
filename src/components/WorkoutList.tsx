import WorkoutCard from "./WorkoutCard";

const WorkoutList = (props: any) => {
  const {
    workouts,
  } = props;

  return (
    <>
      {workouts.map((workout: any) => (
        <WorkoutCard key={workout.PlanID} workout={workout} />
      ))}
    </>
  )
}

export default WorkoutList;