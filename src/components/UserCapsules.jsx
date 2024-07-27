import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/ProfilePage.module.css";
import appStyles from "../App.module.css";
import { Link } from 'react-router-dom';


const UserCapsules = ({ userId }) => {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    const fetchUserCapsules = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${userId}/capsules/`);
        setCapsules(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserCapsules();
  }, [userId]);

  return (
    <Row className="mx-auto mt-3">
        <Col className="col-md-10 col-lg-8 mx-auto">
            <Card className={`${appStyles.Content} mx-3 shadow`}>
            <Card.Body>
                <Card.Title className={`${styles.ProfileFormHeader} text-center`}>My Capsules</Card.Title>
                {capsules.length > 0 ? (
                <ul className={styles.CapsulesList}>
                    {capsules.map(capsule => (
                    <li key={capsule.id}>
                        <h5>{capsule.title}</h5>
                        <p>{capsule.description}</p>
                        <p>{capsule.created_on}</p>
                        <p>{capsule.updated_on}</p>
                    </li>
                    ))}
                </ul>
                ) : (
                <p className="justify-content-center text-center">No capsules found.<br></br> Head over to{' '}
                <Link to={`/capsules/create`}>
                    <strong>Add capsule</strong>
                </Link> to create your very first one and start sharing those precious memories.</p>
                )}
            </Card.Body>
            </Card>
        </Col>
    </Row>
  );
};

export default UserCapsules;
