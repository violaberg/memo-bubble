import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults"; // Ensure you import axiosReq if not already imported

/**
 * The CaretDown component is a functional component that renders a caret down icon for a dropdown.
 * @param {function} onClick - The function to handle the click event.
 * @returns {JSX.Element} - The JSX for the component.
 */
const CaretDown = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`fa-solid fa-circle-chevron-down ${styles.DropdownCaret}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

/**
 * The MoreDropdown component is a functional component that renders a dropdown for editing or deleting a listing.
 * @param {function} handleEdit - The function to handle editing the listing.
 * @param {function} handleDelete - The function to handle deleting the listing.
 * @returns {JSX.Element} - The JSX for the component.
 */
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className={styles.Dropdown} drop="left">
      <Dropdown.Toggle as={CaretDown} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

/**
 * The ProfileEditDropdown component is a functional component that renders a dropdown for editing the user's profile.
 * @param {number} id - The id of the user's profile.
 * @returns {JSX.Element} - The JSX for the component.
 */
export function ProfileEditDropdown({ id }) {
  const history = useHistory();

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await axiosReq.delete(`/profiles/${id}/`);
        history.push('/'); // Redirect to home page or another appropriate page
      } catch (err) {
        console.error('Error deleting profile:', err);
      }
    }
  };

  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={CaretDown} />
      <Dropdown.Menu className={`${styles.DropdownMenu} shadow`}>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/capsules`)}
          aria-label="view-capsules"
          className={styles.DropdownItem}
        >
          <i className={`${styles.ProfileIcon} fas fa-photo-film`} /> My capsules
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
          className={styles.DropdownItem}
        >
          <i className={`${styles.ProfileIcon} fas fa-edit`} /> Edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
          className={styles.DropdownItem}
        >
          <i className={`${styles.ProfileIcon} fas fa-id-card`} /> Change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
          className={styles.DropdownItem}
        >
          <i className={`${styles.ProfileIcon} fas fa-key`} /> Change password
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleDeleteProfile}
          aria-label="delete-profile"
          className={styles.DropdownItem}
        >
          <i className={`${styles.ProfileIcon} fas fa-trash-alt`} /> <span className={styles.DangerText}>Delete my profile</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
