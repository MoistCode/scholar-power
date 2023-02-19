import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonIcon,
  useIonAlert,
  useIonActionSheet,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { personCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import { useLoggedInUser } from '../hooks/useLoggedInUser';

const Header = (props: HeaderProps) => {
  let {
    title,
  } = props;

  const [present] = useIonActionSheet();
  const [result, setResult] = useState<OverlayEventDetail>();

  const [presentAlert] = useIonAlert();
  let loggedInUser = useLoggedInUser();

  useEffect(() => {
    const message = result?.data?.action;

    if (message === 'awesomeness') {
      presentAlert({
        message: 'You are!',
        buttons: ['Yeah I am!'],
      });
    }

    if (message === 'logout') {
      localStorage.removeItem('user_token');
      window.location.href = window.location.origin;
    }
  }, [presentAlert, result?.data?.action])

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {loggedInUser?.username &&
          <IonButtons slot="secondary">
            <IonButton
              onClick={() =>
                present({
                  header: 'User Menu-ish',
                  buttons: [
                    {
                      text: 'Who is awesome and super fit?',
                      data: {
                        action: 'awesomeness',
                      },
                    },
                    {
                      text: 'Logout',
                      data: {
                        action: 'logout',
                      },
                    },
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      data: {
                        action: 'cancel',
                      },
                    },
                  ],
                  onDidDismiss: ({ detail }) => setResult(detail),
                })
              }
            >
              <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        }
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;

type HeaderProps = {
  title: string;
};