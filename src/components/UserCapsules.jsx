import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/ProfilePage.module.css";
import appStyles from "../App.module.css";
import btnStyles from '../styles/Button.module.css';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const UserCapsules = ({ userId }) => {
  const [capsules, setCapsules] = useState([]);
  const history = useHistory();

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
        <h1 className="text-center my-3">My Capsules</h1>
            <Card className={`${appStyles.Content} mx-3 shadow`}>
            <Card.Body>
                {capsules.length > 0 ? (
                <ul className={styles.CapsulesList}>
                    {capsules.map(capsule => (
                    <li key={capsule.id}>
                        <h2>{capsule.title}</h2>
                        <p>{capsule.location}</p>
                        <p>{capsule.created_on}</p>
                        <p>{capsule.updated_on}</p>
                    </li>
                    ))}
                </ul>
                ) : (
                <p className="justify-content-center text-center"><strong className="text-uppercase">No capsules found</strong><br></br> Head over to
                    <strong> add capsule</strong> to create your very first one and start sharing those precious memories.</p>
                )}
            </Card.Body>
            <Card.Footer className={`${styles.CardFooter} text-center`}>
              <Button
                className={`${btnStyles.Button} ${btnStyles.ButtonDanger} m-3 shadow`}
                onClick={() => history.goBack()}
              >
                Back to profile
              </Button>
              <Button 
              className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow`} 
              onClick={() => history.push(`/capsules/create`)}
            >
              Add capsule
            </Button>
            </Card.Footer>
            </Card>
        </Col>
    </Row>
  );
};

export default UserCapsules;
