import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GeminiMessages = ({ imageId, imagesArray }) => {
  // Find the image with the specified imageId
  const image = imagesArray.find((image) => image.id === imageId);

  // Extract gemini messages from the found image
  const geminiMessages = image?.gemini_messages || [];

  return (
    <Container>
      <Row>
        <Col>
          {geminiMessages.length > 0 ? (
            geminiMessages.map((msg, index) => (
              <p key={index}>
                {index + 1}.{msg.message}
              </p>
            ))
          ) : (
            <p>No Gemini messages found for this image.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GeminiMessages;
