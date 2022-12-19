import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import appStyles from '../../App.module.css';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Car from './Car';
import PopularProfiles from '../profiles/PopularProfiles';

import BiddingCreateForm from '../biddings/BiddingCreateForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Bidding from '../biddings/Bidding';

function CarPage() {
  const { id } = useParams();
  const [car, setCar] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [biddings, setBiddings] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: car }, { data: biddings }] = await Promise.all([
          axiosReq.get(`/cars/${id}`),
          axiosReq.get(`/biddings/?car=${id}`),
        ]);
        setCar({ results: [car] });
        setBiddings(biddings);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Car {...car.results[0]} setCars={setCar} carPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <BiddingCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              car={id}
              setCar={setCar}
              setBiddings={setBiddings}
            />
          ) : biddings.results.length ? (
            'Biddings'
          ) : null}
          {biddings.results.length ? (
            biddings.results.map((bidding) => (
              <Bidding
                key={bidding.id}
                {...bidding}
                setCar={setCar}
                setBiddings={setBiddings}
              />
            ))
          ) : currentUser ? (
            <span>No biddings yet, be the first to bid!</span>
          ) : (
            <span>No biddings... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default CarPage;
