import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import styles from '../../styles/CapsuleCreateForm.module.css';

function CreatEditFormFields({ capsuleData, errors, handleChange, handleLocationSelect, handleLocationChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setApiLoaded(true);
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadScript();
    } else {
      setApiLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (apiLoaded) {
      const input = document.getElementById('location');
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['geocode'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        handleLocationSelect(place.formatted_address);
      });
    }
  }, [apiLoaded, handleLocationSelect]); // Include handleLocationSelect in the dependency array

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'location') {
      handleLocationChange(value);
      fetchSuggestions(value);
    } else {
      handleChange(event);
    }
  };

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/maps/place/?input=${encodeURIComponent(input)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleLocationSelect(suggestion.description);
    setSuggestions([]);
  };

  return (
    <>
      <Row>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={capsuleData.title?.trim()}
            onChange={handleInputChange}
            className={`${styles.Input} mx-auto shadow`}
          />
        </Form.Group>
        {errors.title?.map((message, idx) => (
          <Alert variant='warning' key={idx}>
            {message}
          </Alert>
        ))}
      </Row>
      <Row>
        <Form.Group className='pt-2' controlId='message'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            name='message'
            value={capsuleData.message}
            onChange={handleInputChange}
            className={`${styles.Input} mx-auto shadow`}
          />
        </Form.Group>
        {errors.message?.map((message, idx) => (
          <Alert variant='warning' key={idx}>
            {message}
          </Alert>
        ))}
      </Row>
      <Row>
        <Form.Group className='pt-2' controlId='release_date'>
          <Form.Label>Release Date</Form.Label>
          <Form.Control
            type='date'
            name='release_date'
            value={capsuleData.release_date}
            onChange={handleInputChange}
            className={`${styles.Input} mx-auto shadow`}
          />
        </Form.Group>
        {errors.release_date?.map((message, idx) => (
          <Alert variant='warning' key={idx}>
            {message}
          </Alert>
        ))}
      </Row>
      <Row>
        <Form.Group className='pt-2' controlId='location'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            placeholder='Search Places ...'
            name='location'
            value={capsuleData.location}
            onChange={handleInputChange}
            className={`${styles.Input} mx-auto shadow`}
          />
          {loading && <div>Loading...</div>}
          <div className={styles.AutocompleteDropdownContainer}>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.place_id}
                className='suggestion-item'
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ backgroundColor: '#ffffff', cursor: 'pointer' }}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </Form.Group>
        {errors.location?.map((message, idx) => (
          <Alert key={idx} variant='warning'>
            {message}
          </Alert>
        ))}
      </Row>
    </>
  );
}

export default CreatEditFormFields;
