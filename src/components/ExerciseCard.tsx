import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import ExerciseDescriptionModal from "./ExerciseDescriptionModal";
import styles from './ExerciseCard.module.css';

const ExerciseCard = (props: any) => {
  const {
    exercise,
  } = props;

  const {
    ID: id,
    Sets: sets,
    Reps: reps,
    Load: load,
    ExerciseName: name,
    ExerciseMuscle: muscle,
    // ExerciseEquipment: equipment,
    ExerciseInstructions: instructions,
  } = exercise;

  let triggerId = `open-exercise-descripton-modal-${id}`;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{name}</h2>
            <IonButton fill="clear" id={triggerId}>
              <IonIcon slot="icon-only" icon={informationCircleOutline} />
            </IonButton>
          </div>
        </IonCardTitle>
        <IonCardSubtitle>{muscle}</IonCardSubtitle>
      </IonCardHeader>

      <IonList>
        <IonItem>
          <IonLabel>Sets</IonLabel>
          <IonInput value={sets}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Reps</IonLabel>
          <IonInput value={reps}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Load</IonLabel>
          <IonInput value={load}></IonInput>
        </IonItem>
      </IonList>

      <ExerciseDescriptionModal
        triggerId={triggerId}
        instructions={instructions}
      />
    </IonCard>
  );
};

export default ExerciseCard;