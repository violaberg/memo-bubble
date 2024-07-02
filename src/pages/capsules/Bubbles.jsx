import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Bubbles = ({ dataResults }) => {
  const data = dataResults.results || [];
  console.log('data', data);
  console.log('dataResults', dataResults);

  return (
    <Container>
      <div>Lots of Bubbles will be rendered here</div>
      <div>
        Create a new capsule
        {data.map((capsule, index) => (
          <Link to={`capsules/${capsule.id}`}>
            <div key={index}>
              <h2>{capsule.title}</h2>
              <p>{capsule.message}</p>
              <p>
                <strong>Created On: {capsule.created_on}</strong>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Bubbles;
