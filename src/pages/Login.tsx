import { IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar, IonAlert } from '@ionic/react';
import { chevronForward } from "ionicons/icons";
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

/**
 * This component is the page responsible for logging in.
 */
const Login = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);
  const [showAlert, setShowAlert] = useState(false);

  const {
    fetchDataFn: signInUser,
    clearError: signInUserClearError,
    loading: signInUserLoading,
    error: signInUserError,
    data: signInUserData,
  } = useFetch();

  const onLogIn = async () => {
    let username = usernameInputRef?.current?.value;
    let password = passwordInputRef?.current?.value;

    await signInUser({
      variables: { username, password },
      endpoint: '/api/v1/auth',
      method: 'POST'
    });
  };

  useEffect(() => {
    if (!signInUserLoading && !signInUserError && signInUserData) {
      localStorage.setItem('user_token', signInUserData);
      window.location.href = window.location.origin;
    }

    if (signInUserError && !showAlert) {
      setShowAlert(true);
    }
  }, [showAlert, signInUserData, signInUserError, signInUserLoading])

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
            <IonButton fill="solid" color="primary" onClick={onLogIn} disabled={signInUserLoading}>
              <IonLabel>Log In</IonLabel>
              <IonIcon slot="end" icon={chevronForward}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonAlert
          isOpen={Boolean(signInUserError) && showAlert}
          onDidDismiss={() => {
            signInUserClearError();
            setShowAlert(false);
          }}
          header="Invalid Credentials"
          message="Looks like the credentials you've entered are invalid. Please try again."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
