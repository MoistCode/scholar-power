import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useRef } from 'react';

/**
 * This component is the page responsible for signing up.
 */
const SignUp = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Username</IonLabel>
            <IonInput
              ref={usernameInputRef}
              placeholder="Enter username"
            />
          </IonItem>
          <IonItem>
            <IonLabel>Password</IonLabel>
            <IonInput
              ref={passwordInputRef}
              placeholder="Enter password"
              type="password"
            />
          </IonItem>
        </IonList>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton fill="outline">
              <IonIcon slot="primary"/>
              Sign Up
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
