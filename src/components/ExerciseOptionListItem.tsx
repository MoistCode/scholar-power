import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import ExerciseDescriptionModal from "./ExerciseDescriptionModal";
import styles from './ExerciseOptionListItem.module.css';

const ExerciseOptionListItem = (props: any) => {
  const {
    exercise,
    onSelectExercise,
  } = props;

  const {
    ID: id,
    Name: name,
    Muscle: muscle,
    Equipment: equipment,
    Instructions: instructions,
  } = exercise;

  let triggerId = `open-exercise-option-descripton-modal-${id}`;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{name}</h3>
            <IonButton className={styles.iconBtn} fill="clear" id={triggerId}>
              <IonIcon slot="icon-only" icon={informationCircleOutline} />
            </IonButton>
          </div>
        </IonCardTitle>
      </IonCardHeader>

      <IonList>
        <IonItem>
          <IonLabel>Muscle: <b className="ion-margin-start">{muscle}</b></IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>Equipment: <b className="ion-margin-start">{equipment}</b></IonLabel>
        </IonItem>
      </IonList>

      <IonButton fill="clear" onClick={onSelectExercise}>
        Add to workout
      </IonButton>

      <ExerciseDescriptionModal
        triggerId={triggerId}
        instructions={instructions}
      />
    </IonCard>
  );
};

export default ExerciseOptionListItem;