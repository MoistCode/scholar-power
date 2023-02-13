import { IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar } from '@ionic/react';
import { chevronForward } from "ionicons/icons";
import { useRef } from 'react';
import Header from '../components/Header';

/**
 * This component is the page responsible for logging in.
 */
const Login = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <Header title="Welcome to Scholar Power!" />
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>
              <p>Log into an account</p>
            </IonLabel>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              ref={usernameInputRef}
              placeholder="Enter username"
            />
          </IonItem>
          <p></p>
          <IonItem fill="outline">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              ref={passwordInputRef}
              placeholder="Enter password"
              type="password"
            />
          </IonItem>
        </IonList>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton fill="solid" color="primary">
              <IonLabel>Log In</IonLabel>
              <IonIcon slot="end" icon={chevronForward}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Login;
