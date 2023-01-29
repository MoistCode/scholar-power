import { IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar } from '@ionic/react';
import { useRef } from 'react';
import Header from '../components/Header';

/**
 * This component is the page responsible for signing up.
 */
const SignUp = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  const onSignUp = async () => {
    let username = usernameInputRef?.current?.value;
    let password = passwordInputRef?.current?.value;

    let response = await fetch('http://test.seismos.io:3000/api/v1/user/',{
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
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
