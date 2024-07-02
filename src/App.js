import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';
import NavBar from './components/NavBar';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import CapsulesPage from './pages/capsules/CapsulesPage';
import { EmailSent } from './pages/auth/EmailSent';
import EmailConfirmation from './pages/auth/EmailConfirmation';
import { CapsulePage } from './pages/capsules/CapsulePage';

function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/email-sent" render={() => <EmailSent />} />
          <Route exact path="/email-confirmation" render={() => <EmailConfirmation />} />
          <Route exact path="/capsules" render={() => <CapsulesPage />} />
          <Route exact path="/capsules/:id" render={() => <CapsulePage />} />
        </Switch>
      </Container>

    </div>
  );
}

export default App;
