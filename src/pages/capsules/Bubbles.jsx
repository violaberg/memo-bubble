import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bubbleStyles from '../../styles/Bubbles.module.css';

import { Link } from 'react-router-dom';
import Asset from '../../components/Asset';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';

const Bubbles = ({ capsules, setCapsules, hasLoaded }) => {
  const data = capsules.results || [];

  return (
    <Container
      id='scrollableDiv'
      fluid
      className={bubbleStyles.BubblesContainer}
    >
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
                          <p className={bubbleStyles.BubbleOwner}>
                            Owner: <strong>{capsule.owner}</strong>
                          </p>
                          <p className={bubbleStyles.BubbleLocation}>
                            Location: {capsule.location}
                          </p>
                          <p className={bubbleStyles.BubbleDate}>
                            Created on:<br></br><strong>{capsule.created_on}</strong>
                          </p>
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
