import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';
import NavBar from './components/NavBar';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import CapsulesPage from './pages/capsules/CapsulesPage';
import { EmailSent } from './pages/auth/EmailSent';
import EmailConfirmed from './pages/auth/EmailConfirmed';
import { CapsulePage } from './pages/capsules/CapsulePage';
import CapsuleCreateForm from './pages/capsules/CapsuleCreateForm';
import ProfilePage from "./pages/profiles/ProfilePage";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./pages/errors/NotFound";
import Forbidden403 from "./pages/errors/Forbidden403";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Terms from "./pages/legal/Terms";
import FAQ from "./pages/legal/FAQ";
import ContactMessagesList from "./pages/contact/ContactMessagesList";
import ContactMessage from "./pages/contact/ContactMessage";
import ContactPage from "./pages/contact/ContactPage";

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
          <Route exact path="/email-confirmed" render={() => <EmailConfirmed />} />
          <Route exact path="/capsules/create" render={() => <CapsuleCreateForm />} />
          <Route exact path="/capsules" render={() => <CapsulesPage />} />
          <Route exact path="/capsules/:id" render={() => <CapsulePage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route exact path="/forbidden" render={() => <Forbidden403 />} />
          <Route exact path="/notfound" render={() => <NotFound />} />
          <Route render={() => <NotFound />} />
          <Route exact path="/privacyPolicy" render={() => <PrivacyPolicy />} />
          <Route exact path="/terms" render={() => <Terms />} />
          <Route exact path="/faq" render={() => <FAQ />} />
          <Route exact path="/contact" render={() => <ContactPage />} />
          <Route
            exact
            path="/contact_list"
            render={() => <ContactMessagesList />}
          />
          <Route
            exact
            path="/contact_list/:id"
            render={() => <ContactMessage />}
          />

        </Switch>
      </Container>

    </div>
  );
}

export default App;
