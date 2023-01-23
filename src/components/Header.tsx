import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, useIonAlert } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import useToken from "../hooks/useToken";

const Header = (props: HeaderProps) => {
  let {
    title,
  } = props;

  let { token } = useToken();
  const [presentAlert] = useIonAlert();

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {token &&
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

interface HeaderProps {
  title: string;
}