
import {
  IonContent,
  IonList,
  IonItem,
  IonPage,
  IonToolbar,
  IonLabel,
  IonInput,
  IonButtons,
  IonTextarea,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonHeader,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonLoading,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import { addCircleOutline, informationCircleOutline } from 'ionicons/icons';
import capitalize from 'lodash/capitalize';

import { useEffect, useCallback, useRef, useState } from 'react';
import Header from '../components/Header';

const muscleOptions = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'traps',
  'triceps',
];

/**
 * This component is the page responsible for creating a new workout.
 */
const CreateWorkout = () => {
  let titleInputRef = useRef<HTMLIonInputElement>(null);
  let subtitleInputRef = useRef<HTMLIonInputElement>(null);
  let descriptionTextAreaRef = useRef<HTMLIonTextareaElement>(null);

  const onCreateWorkout = async () => {
    let title = titleInputRef?.current?.value;
    let subtitle = subtitleInputRef?.current?.value;
    let description = descriptionTextAreaRef?.current?.value;

    console.log('Creating workout with', title, subtitle, description);
  }

  return (
    <IonPage>
      <EditOrCreateWorkout
        headerTitle="Create Workout"
        titleInputRef={titleInputRef}
        subtitleInputRef={subtitleInputRef}
        descriptionTextAreaRef={descriptionTextAreaRef}
        primaryButtonText="Create Workout"
        onSubmit={onCreateWorkout}
      />
    </IonPage>
  );
};

export default CreateWorkout;

export const EditOrCreateWorkout = (props: any) => {
  let {
    headerTitle,
    titleInputRef,
    subtitleInputRef,
    descriptionTextAreaRef,
    titleDefaultValue,
    subtitleDefaultValue,
    descriptionDefaultValue,
    primaryButtonText,
    onSubmit,
    onDismiss,
  } = props;

  let modalId = `open-modal-add-exercise-${headerTitle.replace(' ', '')}`;

  return (
    <>
      <Header title={headerTitle} />
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Title</IonLabel>
            <IonInput
              ref={titleInputRef}
              placeholder="Title"
              value={titleDefaultValue}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Subtitle</IonLabel>
            <IonInput
              ref={subtitleInputRef}
              placeholder="Subtitle"
              value={subtitleDefaultValue}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Description</IonLabel>
            <IonTextarea
              ref={descriptionTextAreaRef}
              placeholder="Description"
              value={descriptionDefaultValue}
            />
          </IonItem>
        </IonList>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton fill="outline" id={modalId}>
              <IonIcon slot="secondary"/>
              Add Exercise
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton strong={true} onClick={onDismiss}>
                Back
              </IonButton>
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton fill="solid" onClick={onSubmit}>
              <IonIcon slot="primary"/>
              {primaryButtonText}
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <AddExerciseModal modalId={modalId}/>
      </IonContent>
    </>
  );
}

const AddExerciseModal = ({ modalId }: any) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  let [ muscleGroup, setMuscleGroup ] = useState('');
  let [ listOfExercises, setListOfExercises ] = useState([]);
  let [ showLoading, setShowLoading ] = useState(false);

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  const getAndSaveExercisesToLocalStorage = useCallback(async (selectedMuscleGroup: string) => {
    setShowLoading(true);

    console.log('cowman123', process.env);

    let res = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscleGroup}` ,{
      method: 'GET',
      // @ts-expect-error
      headers: {
        'X-Api-Key': process.env.REACT_APP_API_NINJA_KEY,
      },
    });

    let exercises = await res.json();

    setListOfExercises(exercises)
    
    let savedItem = JSON.stringify({
      exercises,
      timestamp: new Date(),
    });

    localStorage.setItem(`exercises-${selectedMuscleGroup}`, savedItem);
  }, [])

  useEffect(() => {
    if (!muscleGroup) return;
    

    (async function () {
      let strigifiedExercises = localStorage.getItem(`exercises-${muscleGroup}`);
  
      if (strigifiedExercises) {
        let exercises = JSON.parse(strigifiedExercises);
        let timeSinceSaved = Number(new Date()) - Number(new Date(exercises.timestamp));
        let shouldFetchNewExercises = false;
  
        if (!exercises) {
          shouldFetchNewExercises = true;
        }
  
        if (timeSinceSaved > 86400000) {
          localStorage.removeItem(`exercises-${muscleGroup}`);
          shouldFetchNewExercises = true;
        }

        if (shouldFetchNewExercises) {
          await getAndSaveExercisesToLocalStorage(muscleGroup);
        } else {
          setListOfExercises(JSON.parse(strigifiedExercises).exercises);
        }
      } else {
        getAndSaveExercisesToLocalStorage(muscleGroup);
      }
    })()
  }, [getAndSaveExercisesToLocalStorage, muscleGroup]);

  useEffect(() => {
    setShowLoading(false);
  }, [listOfExercises]);

  return (
    <IonModal ref={modal} trigger={modalId}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton strong={true} onClick={() => confirm()}>
              Back
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Muscle Group</IonLabel>
            <IonSelect
              placeholder="Muscle Group"
              onIonChange={(e) => {
                setMuscleGroup(e.detail.value);
              }}
            >
              {muscleOptions.map((muscleOption) => {
                return (
                  <IonSelectOption
                    key={muscleOption}
                    value={muscleOption}
                  >
                    {capitalize(muscleOption.replace('_', ' '))}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        </IonList>

        <IonLoading
          isOpen={showLoading}
          message={`Updating exercises for ${muscleGroup}`}
        />

        {listOfExercises.map((exercise, index) => {
              let {
                name,
                type,
                muscle,
                equipment,
                difficulty,
                instructions,
              } = exercise;
    
              return (
                <ExerciseCard
                  key={name}
                  name={name}
                  type={type}
                  muscle={muscle}
                  equipment={equipment}
                  difficulty={difficulty}
                  instructions={instructions}
                />
              );
            })}

      </IonContent>
    </IonModal>
  )
}

const ExerciseCard = (props: ExerciseCardProps) => {
  let {
    name,
    type,
    muscle,
    equipment,
    difficulty,
    instructions,
  } = props;
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState<OverlayEventDetail>();

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

let triggerId = `open-exercise-descripton-modal-${name}`;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
        <IonItem>
          <IonLabel>Type</IonLabel>
          <IonCardSubtitle>{capitalize(type.replace('_', ' '))}</IonCardSubtitle>
        </IonItem>
        <IonItem>
          <IonLabel>Muscle</IonLabel>
          <IonCardSubtitle>{capitalize(muscle.replace('_', ' '))}</IonCardSubtitle>
        </IonItem>
        <IonItem>
          <IonLabel>Equipment</IonLabel>
          <IonCardSubtitle>{capitalize(equipment.replace('_', ' '))}</IonCardSubtitle>
        </IonItem>
        <IonItem>
          <IonLabel>Difficulty</IonLabel>
          <IonCardSubtitle>{capitalize(difficulty.replace('_', ' '))}</IonCardSubtitle>
        </IonItem>
      </IonCardHeader>

      <div>
        <IonButton fill="clear" id={triggerId}>
          <IonIcon slot="icon-only" icon={informationCircleOutline} />
        </IonButton>
        <IonButton
          fill="clear"
          onClick={() => console.log('cowman added an exercise')}
        >
          <IonIcon slot="icon-only" icon={addCircleOutline} />
        </IonButton>
      </div>

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
    </IonCard>
  );
}

interface ExerciseCardProps {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}
