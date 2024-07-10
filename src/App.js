import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useState } from "react";
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
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Terms from "./pages/legal/Terms";
import FAQ from "./pages/legal/FAQ";
import ContactMessagesList from "./pages/contact/ContacMessagesList";
import ContactMessage from "./pages/contact/ContactMessage";
import ContactPage from "./pages/contact/ContactPage";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const [cookieConsent, setCookieConsent] = useState(getCookieConsentValue("cookieConsent"));
  const [showCookieBanner, setShowCookieBanner] = useState("byCookieValue");
  const [setNonEssentialConsent] = useState(getCookieConsentValue("nonEssentialCookies") === "true");


  if (cookieConsent === "false") {
    setCookieConsent(false);
  }

  if (
    path === "/privacyPolicy" ||
    path === "/terms" ||
    path === "/faq/"
  ) {
    styles.Main = styles.MainHome;
  }

  return (
    <HelmetProvider>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/about" render={() => <About />} />
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
        <Footer />
        <Container />
        <>
          <CookieConsent
            location="bottom"
            buttonText="Accept All Cookies"
            declineButtonText="Decline Non-Essential Cookies"
            enableDeclineButton
            visible={showCookieBanner}
            onAccept={() => {
              setNonEssentialConsent(true);
              setShowCookieBanner("hidden");
              document.cookie = "nonEssentialCookies=true; path=/; max-age=31536000";
            }}
            onDecline={() => {
              setNonEssentialConsent(false);
              setShowCookieBanner("hidden");
              document.cookie = "nonEssentialCookies=false; path=/; max-age=31536000";
            }}
            cookieName="nonEssentialCookies"
            containerClasses="d-flex justify-content-center align-items-center"
            contentClasses={`${styles.CookieBannerContent} m-0 ps-1 pt-1`}
            buttonWrapperClasses={`${styles.CookieBannerButtonWrapper} m-0`}
            buttonClasses="m-0 me-1"

          >
            This website uses cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. We also use cookies from third-party services like Google Maps to display interactive maps. By clicking "Accept All Cookies", you consent to our use of all cookies. If you choose to "Decline Non-Essential Cookies", Google Maps and other third-party services will be disabled, but essential cookies for the proper functioning of the site will still be set. <a href="/privacyPolicy" style={{ color: '#fefefe', textDecoration: 'underline' }}>Learn more</a>.
          </CookieConsent>
          <div className={styles.CookieReset}><i onClick={() => {
            setShowCookieBanner("show");
          }} className="fa-solid fa-link"></i>
          </div>
        </>

      </div>
    </HelmetProvider>
  );
}

export default App;
