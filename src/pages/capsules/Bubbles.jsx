import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Asset from '../../components/Asset';

const Bubbles = ({ dataResults, hasLoaded }) => {
  const data = dataResults.results || [];

  return (
    <Container>
      <div>Lots of Bubbles will be rendered here</div>
      <div>
        Create a new capsule
        {hasLoaded ? (
          data.map((capsule, index) => (
            <div key={index}>
              <Link to={`capsules/${capsule.id}`}>
                <h2>{capsule.title}</h2>
                <p>{capsule.message}</p>
                <p>
                  <strong>Created On: {capsule.created_on}</strong>
                </p>
              </Link>
            </div>
          ))
        ) : (
          <Asset spinner message='Loading...' animation='grow' variant='info' />
        )}
      </div>
    </Container>
  );
};

export default Bubbles;
