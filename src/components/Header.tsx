import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const Header = (props: HeaderProps) => {
  let {
    title,
  } = props;

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;

interface HeaderProps {
  title: string;
}