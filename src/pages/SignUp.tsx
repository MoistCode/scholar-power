import { 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonIcon, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonToolbar
} from '@ionic/react';
import { chevronForward } from "ionicons/icons";
import { useRef } from 'react';
import Header from '../components/Header';

/**
 * This component is the page responsible for signing up.
 */

// TODO: add Ionic alerts for invalid username/password

const SignUp = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <Header title="Welcome to Scholar Power!" />
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>
              <p>Register a new account</p>
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
              <IonLabel>Sign Up</IonLabel>
              <IonIcon slot="end" icon={chevronForward}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
