import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonIcon,
  useIonAlert,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';

import { useLoggedInUser } from '../hooks/useLoggedInUser';

const Header = (props: HeaderProps) => {
  let {
    title,
  } = props;

  const [presentAlert] = useIonAlert();
  let loggedInUser = useLoggedInUser();

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {loggedInUser?.username &&
          <IonButtons slot="secondary">
            <IonButton
              onClick={() =>
                presentAlert({
                  header: 'Who is awesome and super fit?',
                  message: 'You are!',
                  buttons: ['Yeah I am!'],
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