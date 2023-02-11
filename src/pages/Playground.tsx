import { IonContent, IonPage } from "@ionic/react"
import Header from "../components/Header"

const Playground = () => {

  return (
    <IonPage>
      <Header title="Welcome to Scholar Power!" />
      <IonContent fullscreen>
        Playground
      </IonContent>
    </IonPage>
  )
};

export default Playground;

