import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import bubbleStyles from '../../styles/Bubbles.module.css';

import { Link } from 'react-router-dom';
import Asset from '../../components/Asset';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import { axiosReq } from '../../api/axiosDefaults';

const Bubbles = ({ capsules, setCapsules, hasLoaded }) => {
  const [sortOrder, setSortOrder] = useState('');

  const data = capsules.results || [];

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/capsules/?ordering=${sortOrder}`);
        setCapsules(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [sortOrder, setCapsules]);

  return (
    <Container
      id='scrollableDiv'
      fluid
      className={`${bubbleStyles.BubblesContainer} mt-4`}
    >
      <Row>
      <h1 className="text-center">Memory Sanctuary</h1>
        <Col className="col-sm-6 col-lg-4 mx-auto">
          <Form.Group controlId="sortOrder" className="mb-4 mt-2">
            <Form.Label>Sort by:</Form.Label>
            <Form.Control className={`${bubbleStyles.SortBar} shadow`} as="select" value={sortOrder} onChange={handleSortChange}>
              <option value="">Select...</option>
              <option value="-release_date">Latest Release</option>
              <option value="location">Location A-Z</option>
              <option value="-location">Location Z-A</option>
              <option value="likes">Most Likes</option>
              <option value="owner">Owner A-Z</option>
              <option value="-owner">Owner Z-A</option>

            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      {hasLoaded ? (
        <>
          {data.length ? (
            <InfiniteScroll
              dataLength={data.length}
              loader={<Asset spinner />}
              hasMore={!!capsules.next}
              next={() => fetchMoreData(capsules, setCapsules)}
              scrollableTarget='scrollableDiv'
            >
              <Row className='justify-content-center mx-0'>
                {data.map((capsule) => (
                  <Col
                    key={capsule.id}
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={3}
                    className='d-flex justify-content-center mb-3 gx-1'
                  >
                        <Card className={bubbleStyles.Bubble}>
                        <Link
                        to={`capsules/${capsule.id}`}
                        className='text-decoration-none'
                      >
                          {capsule.images.length > 0 ? (
                          <img
                            src={capsule.images[0].url}
                            alt={capsule.images[0].title}
                            className={bubbleStyles.BubbleImage}
                          />
                        ) : (
                          <Card.Img
                            variant="top"
                            src="https://via.placeholder.com/150"
                            className={bubbleStyles.BubbleImage}
                          />
                        )}
                          <h2 className={bubbleStyles.BubbleTitle}>
                            {capsule.title}
                          </h2>
                          <div className={bubbleStyles.BubbleOwner}>
                            Owner: <strong>{capsule.owner}</strong>
                          </div>
                          <div className={bubbleStyles.BubbleLocation}>
                            Location: <strong>{capsule.location}</strong>
                          </div>
                          <div className={bubbleStyles.BubbleDate}>
                            Created on:<br></br><strong>{capsule.created_on}</strong>
                          </div>
                          </Link>
                        </Card>
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          ) : (
            <Container>
              <Asset message='No results found' />
            </Container>
          )}
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
};

export default Bubbles;
