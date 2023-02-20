import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, useIonActionSheet } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { createOutline, playOutline, trashOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import useFetch from "../hooks/useFetch";
import useLoadingAlert from "../hooks/useLoadingAlert";
import { startWorkout } from "../slices/activatedWorkout";
import { refetchWorkouts } from "../slices/refetch";

import styles from './WorkoutCard.module.css';

const WorkoutCard = (props: WorkoutCardProps) => {
  const {
    workout,
  } = props;

  const {
    planId,
    name,
    createdAt,
    editedAt,
  } = workout;

  const [present] = useIonActionSheet();
  const [result, setResult] = useState<OverlayEventDetail>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (result?.data?.action === 'startworkout') {
      dispatch(startWorkout(planId));
    }
  }, [dispatch, planId, result?.data?.action]);

  const {
    fetchDataFn: deleteWorkout,
    loading,
    data: deleteWorkoutData,
  } = useFetch<{ Message: string }>();

  useLoadingAlert({
    loading: loading,
    message: 'Deleting workout...',
  });

  const onDeleteWorkout = async () => {
    await deleteWorkout({
      endpoint: `/api/v1/workout/${planId}`,
      method: 'DELETE',
    });
  };

  useEffect(() => {
    if (deleteWorkoutData?.Message === "Poof! It's gone.") {
      dispatch(refetchWorkouts());
    }
  }, [deleteWorkoutData?.Message, dispatch])

  if (result?.data?.action === 'startworkout') {
    return <Redirect to={`/workoutactivate/${planId}`} />;
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
        <IonCardSubtitle>Creation Date: {String(new Date(createdAt))}</IonCardSubtitle>
        <IonCardSubtitle>Last Edited: {String(new Date(editedAt))}</IonCardSubtitle>
      </IonCardHeader>

      <div className={styles.createButtonContainer}>
        <IonButton onClick={onDeleteWorkout} fill="clear">
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonButton>

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

type WorkoutCardProps = {
  workout: WorkoutOptionItem;
};