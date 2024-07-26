import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
  /**
   * The ProfileEditForm component is a functional component that renders a form for editing the user's profile.
   * It fetches the user's profile data from the API and updates the user's profile data.
   * @returns {JSX.Element} - The JSX for the component.
   */

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const profileDataSet = useRef(false);

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    image: "",
    phone: "",
  });
  const { first_name, last_name, email_address, image, phone } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      // redirect user if they are not the owner of this profile
      if (currentUser?.profile_id?.toString() === id) {
        try {
          // fetch the user's profile data from the API
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { first_name, last_name, email_address, image, phone } = data;
          // set the profile data state if it has not been set
          if (!profileDataSet.current) {
            setProfileData({
              first_name,
              last_name,
              email_address,
              image,
              phone,
            });
            profileDataSet.current = true;
          }
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [history, id, currentUser]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email_address", email_address);
    formData.append("phone", phone);
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group className="p-2">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={first_name}
          onChange={handleChange}
          name="first_name"
          className={`${styles.Input} mx-auto shadow`}
        />
      </Form.Group>
      {errors?.first_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className="p-2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={last_name}
          onChange={handleChange}
          name="last_name"
          className={`${styles.Input} mx-auto shadow`}
        />
      </Form.Group>
      {errors?.last_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className="p-2">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          value={email_address}
          onChange={handleChange}
          name="email_address"
          className={`${styles.Input} mx-auto shadow`}
        />
      </Form.Group>
      {errors?.email_address?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className={`${styles.ProfileEditForm} p-2`}>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={phone}
          onChange={handleChange}
          name="phone"
          className={`${styles.Input} mx-auto shadow`}
        />
      </Form.Group>
      {errors?.phone?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}. The format should be +CC MMMM MMMM. For example, +44 1234
          567890.
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.ButtonDanger} m-3 shadow`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow`}
        type="submit"
      >
        save
      </Button>
    </>
  );

  return (
    <Row className="mx-3">
      <Col className={`${appStyles.Content} mx-auto my-4 shadow`} lg={10} xl={8}>
        <Form onSubmit={handleSubmit}>
          <Row className="my-2">
            <Col className="p-0 p-md-2 text-center" md={7} lg={6}>
              <Container>
                <Form.Group className="pt-3 mx-auto">
                  {image && (
                    <figure>
                      <Image className={`${styles.ProfileEditFormImg} w-75 shadow`} src={image} fluid />
                    </figure>
                  )}
                  {errors?.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.ButtonTertiary} my-auto px-1 py-2 mb-3 shadow`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                  <input
                    type="file"
                    id="image-upload"
                    ref={imageFile}
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setProfileData({
                          ...profileData,
                          image: URL.createObjectURL(e.target.files[0]),
                        });
                      }
                    }}
                  />
                </Form.Group>
                <div className="d-md-none">{textFields}</div>
              </Container>
            </Col>
            <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
              <Container>{textFields}</Container>
            </Col>
          </Row>
        </Form>
    </Col>
    </Row>
  );
};

export default ProfileEditForm;