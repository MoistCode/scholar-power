import { IonAlert, IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import Header from '../components/Header';
import useFetch from '../hooks/useFetch';

/**
 * This component is the page responsible for signing up.
 */
const SignUp = () => {
  let usernameInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);

  const [showAlert, setShowAlert] = useState(false);

  const {
    fetchDataFn: signUpUser,
    clearError: signUpUserClearError,
    loading: signUpUserLoading,
    error: signUpUserError,
    data: signUpUserData,
  } = useFetch();

  const onSignUp = async () => {
    let username = usernameInputRef?.current?.value;
    let password = passwordInputRef?.current?.value;

    await signUpUser({
      variables: { username, password },
      endpoint: '/api/v1/register',
      method: 'POST'
    });
  }

  useEffect(() => {
    if (!signUpUserLoading && !signUpUserError && signUpUserData) {
      localStorage.setItem('user_token', signUpUserData);
      window.location.href = window.location.origin;
    }

    if (signUpUserError && !showAlert) {
      setShowAlert(true);
    }
  }, [showAlert, signUpUserData, signUpUserError, signUpUserLoading])

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
            <IonButton fill="outline" onClick={onSignUp} disabled={signUpUserLoading}>
              <IonIcon slot="primary"/>
              Sign Up
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonAlert
          isOpen={Boolean(signUpUserError) && showAlert}
          onDidDismiss={() => {
            signUpUserClearError();
            setShowAlert(false);
          }}
          header="Cannot create account"
          message="The credentials supplied are invalid. Please try again."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
