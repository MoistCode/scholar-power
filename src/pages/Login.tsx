import { IonContent, IonHeader, IonList, IonItem, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { useRef } from 'react';

/**
 * This component is the page responsible for logging in.
 */
const Login = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
              Login
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Login;
