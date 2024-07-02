import React from 'react';
import Container from 'react-bootstrap/Container';

const Bubbles = ({ dataResults }) => {
  const data = dataResults.results || [];
  console.log('data', data);
  console.log('dataResults', dataResults);

  return (
    <Container>
      <div>Lots of Bubbles will be rendered here</div>
      <div>
        {data.map((capsule, index) => (
          <div key={index}>
            <h2>{capsule.title}</h2>
            <p>{capsule.message}</p>
            <p>
              <strong>Created On: {capsule.created_on}</strong>
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Bubbles;
