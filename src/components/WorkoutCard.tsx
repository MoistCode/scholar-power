import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, useIonActionSheet } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { createOutline, playOutline } from "ionicons/icons";
import { useState } from "react";

import styles from './WorkoutCard.module.css';

const WorkoutCard = (props: any) => {
  const {
    workout,
  } = props;

  const {
    PlanID: planId,
    Name: name,
    CreatedAt: createdAt,
    EditedAt: editedAt,
  } = workout;

  const [present] = useIonActionSheet();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState<OverlayEventDetail>();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
        <IonCardSubtitle>Creation Date: {createdAt}</IonCardSubtitle>
        <IonCardSubtitle>Last Edited: {editedAt}</IonCardSubtitle>
      </IonCardHeader>

      <div className={styles.createButtonContainer}>
        <IonButton fill="clear" routerLink={`/workout/${planId}`}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonButton>

        <IonButton
          fill="clear"
          onClick={() =>
            present({
              header: 'Start this workout?',
              buttons: [
                {
                  text: 'Yes',
                  data: {
                    action: 'startworkout',
                  },
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  data: {
                    action: 'cancel',
                  },
                },
              ],
              onDidDismiss: ({ detail }) => setResult(detail),
            })
          }
        >
          <IonIcon slot="icon-only" icon={playOutline} />
        </IonButton>
      </div>
    </IonCard>
  );
};

export default WorkoutCard;