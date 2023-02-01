import { IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar } from '@ionic/react';
import { useRef } from 'react';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

/**
 * This component is the page responsible for signing up.
 */
const SignUp = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  let createNewUser = useFetch();

  const onSignUp = async () => {
    let username = usernameInputRef?.current?.value;
    let password = passwordInputRef?.current?.value;

    let response = await createNewUser({
      variables: { username, password },
      endpoint: '/api/v1/user',
      method: 'POST'
    });

    console.log(response);
  }

  return (
    <IonPage>
      <Header title="Register a new account" />
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
            <IonButton fill="outline" onClick={onSignUp}>
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
