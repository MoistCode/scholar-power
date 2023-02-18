import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonContent } from "@ionic/react";
import { useRef } from "react";

const ExerciseDescriptionModal = (props: ExerciseDescriptionModalProps) => {
  const {
    triggerId,
    instructions
  } = props;

  const modal = useRef<HTMLIonModalElement>(null);

  const confirm = () => {
    modal.current?.dismiss('', 'confirm');
  };

  return (
    <IonModal ref={modal} trigger={triggerId}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {instructions}
      </IonContent>
    </IonModal>
  );
};

export default ExerciseDescriptionModal;

type ExerciseDescriptionModalProps = {
  triggerId: string;
  instructions: string;
};