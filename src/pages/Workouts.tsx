import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonPage } from '@ionic/react';
import { createOutline, playOutline } from 'ionicons/icons';
import Header from '../components/Header';
import styles from './Workouts.module.css';

// TODO: Replace this with a call to the API.
const exampleListOfWorkouts = [
  {
    title: "Workout 1",
    subtitle: "Workout 1 subtitle",
    description: "Workout 1 description",
  },
  {
    title: "Workout 2",
    subtitle: "Workout 2 subtitle",
    description: "Workout 2 description",
  },
  {
    title: "Workout 3",
    subtitle: "Workout 3 subtitle",
    description: "Workout 3 description",
  },
  {
    title: "Workout 4",
    subtitle: "Workout 4 subtitle",
    description: "Workout 4 description",
  },
  {
    title: "Workout 5",
    subtitle: "Workout 5 subtitle",
    description: "Workout 5 description",
  },
  {
    title: "Workout 6",
    subtitle: "Workout 6 subtitle",
    description: "Workout 6 description",
  },
  {
    title: "Workout 7",
    subtitle: "Workout 7 subtitle",
    description: "Workout 7 description",
  },
  {
    title: "Workout 8",
    subtitle: "Workout 8 subtitle",
    description: "Workout 8 description",
  }
];

/**
 * This component is the page responsible for displaying the user-generated
 * workouts.
 */
const Workouts = () => {
  return (
    <IonPage>
      <Header title="Workouts" />
      <IonContent fullscreen>
        {exampleListOfWorkouts.map((workout, index) => {
          return (
            <WorkoutCard
              key={`workout.title-${index}`}
              title={workout.title}
              subtitle={workout.subtitle}
              description={workout.description}
            />
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Workouts;

const WorkoutCard = (props: WorkoutCardProps) => {
  let {
    title,
    subtitle,
    description,
  } = props;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        {description}
      </IonCardContent>
      <div className={styles.createButtonContainer}>
        <IonButton fill="clear" >
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonButton>
        <IonButton fill="clear" >
          <IonIcon slot="icon-only" icon={playOutline} />
        </IonButton>
      </div>
    </IonCard>
  );
}

interface WorkoutCardProps {
  title: string;
  subtitle: string;
  description: string;
}