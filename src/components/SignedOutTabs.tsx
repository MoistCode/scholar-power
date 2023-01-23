import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { ellipse, triangle } from 'ionicons/icons';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

/**
 * This component is the main tab bar for the app. It contains the routes for
 * the main pages of the app when the user is signed out.
 */
const SignedOutTabs = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="signup" href="/signup">
        <IonIcon icon={triangle} />
        <IonLabel>Sign Up</IonLabel>
      </IonTabButton>
      <IonTabButton tab="login" href="/login">
        <IonIcon icon={ellipse} />
        <IonLabel>Log In</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default SignedOutTabs;
