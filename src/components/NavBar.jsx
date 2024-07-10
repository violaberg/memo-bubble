import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.jpg";
import styles from "../styles/NavBar.module.css";
import btnStyles from "../styles/Button.module.css"
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfo, faSignInAlt, faUserPlus, faCirclePlus, faSignOutAlt, faPhotoFilm } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInIcons = (
    <>

      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <FontAwesomeIcon icon={faSignOutAlt} />Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <FontAwesomeIcon icon={faSignInAlt} /> Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <FontAwesomeIcon icon={faUserPlus} /> Sign up
      </NavLink>

    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          className={btnStyles.ButtonTertiary}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <FontAwesomeIcon icon={faHome}/> Home
            </NavLink>
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/about"
            >
              <FontAwesomeIcon icon={faInfo} /> About
            </NavLink>
            <NavLink
              to="/capsules"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <FontAwesomeIcon icon={faPhotoFilm} /> Capsules
            </NavLink>
            <NavLink
              to="/capsules/create"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <FontAwesomeIcon icon={faCirclePlus} /> Add Capsule
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
