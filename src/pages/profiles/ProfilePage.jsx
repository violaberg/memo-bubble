import React, { useEffect, useState } from "react";

import { Container, Col, Row, Card, Image } from 'react-bootstrap';
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { ProfileEditDropdown } from "../../components/MoreDropDown";
import { useRedirect } from "../../hooks/useRedirect";
import Forbidden403 from "../errors/Forbidden403";

function ProfilePage() {
  /**
   * The ProfilePage component is a functional component that renders the profile page for a user.
   * It fetches the profile data from the API using the profile id from the URL.
   * @returns {JSX.Element} - The JSX for the component.
   * @param {Object} profileData - The profile data.
   * @param {Object} currentUser - The current user data.
   * @param {Function} setProfileData - A function to set the profile data state.
   * @param {Function} useRedirect - A function to redirect the user to the login page.
   */

  useRedirect("loggedOut");
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profileData, setProfileData] = useState({
    id: "",
    owner: "",
    first_name: "",
    last_name: "",
    email_address: "",
    image: "",
    phone: "",
    created_at: "",
    updated_at: "",
  });

  // Fetch the profile data from the API.
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfileData(data);
      } catch (err) {
        // console.log(err);
        if (err.response.status === 401) {
          <Forbidden403 />;
        }
      }
    };
    fetchProfileData();
  }, [id]);

  return (
    <>
      {currentUser && (
        <Container className="my-3 pt-2">
          <Row>
            <Col className="my-2 mx-auto col-lg-10 col-xl-8">
            <h1 className="pt-2">{profileData.first_name}'s Profile Page</h1>
              <Card className={`${appStyles.Content} my-2 shadow`}>
                  <>
                    {profileData?.owner && (
                      <ProfileEditDropdown id={profileData.id} />
                    )}
                  </>
                <Card.Body>
                  <Row>
                    <Col className="text-center pt-4 mx-auto" md={4}>
                      <Image
                        className={`${styles.ProfileImg} w-75 shadow`}
                        src={profileData.image}
                        alt={profileData.owner}
                        fluid
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Title>
                        <h2 className="pt-4" style={{fontSize: "20px"}}>{profileData.first_name} {profileData.last_name}</h2>
                      </Card.Title>
                      <Card.Text className="pl-2">
                        <label>Username:</label> {profileData.owner}
                        <br />
                        <label>Email:</label> {profileData.email_address}
                        <br />
                        <label>Phone:</label> {profileData.phone}
                        <br />
                        <label>Joined at:</label> {profileData.created_at}
                        <br />
                        <label>Updated at:</label> {profileData.updated_at}
                        <br />
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ProfilePage;