import { IonContent, IonList, IonItem, IonPage, IonToolbar, IonLabel, IonInput, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { useRef } from 'react';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

/**
 * This component is the page responsible for logging in.
 */
const Login = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  let signInUser = useFetch();

  const onLogIn = async () => {
    let username = usernameInputRef?.current?.value;
    let password = passwordInputRef?.current?.value;

    let response = await signInUser({
      variables: { username, password },
      endpoint: '/api/v1/auth',
      method: 'POST'
    });

    let userToken = await response.json();

    if (userToken) {
      localStorage.setItem('user_token', userToken);
      window.location.href = window.location.origin;
    }
  }

  return (
    <IonPage>
      <Header title="Welcome to Scholar Power!" />
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
            <IonButton fill="outline" onClick={onLogIn}>
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
