import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import useToken from "../hooks/useToken";

const Header = (props: HeaderProps) => {
  let {
    title,
  } = props;

  let { token } = useToken();

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {token &&
          <IonButtons slot="secondary">
            <IonButton>
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