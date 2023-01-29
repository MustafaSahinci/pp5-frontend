import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import appStyles from '../App.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import BiddingCreateForm from '../pages/biddings/BiddingCreateForm';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../components/Asset';
import { fetchMoreData } from '../utils/utils';
import Bidding from '../pages/biddings/Bidding';
import { useParams } from 'react-router';
import { axiosReq } from '../api/axiosDefaults';

function BiddingModal(props) {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [car, setCar] = useState({ results: [] });
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
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Place your bid
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
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
            'biddings'
          ) : null}
          {biddings.results.length ? (
            <InfiniteScroll
              children={biddings.results.map((bidding) => (
                <Bidding
                  key={bidding.id}
                  {...bidding}
                  setCar={setCar}
                  setBiddings={setBiddings}
                />
              ))}
              dataLength={biddings.results.length}
              loader={<Asset spinner />}
              hasMore={!!biddings.next}
              next={() => fetchMoreData(biddings, setBiddings)}
            />
          ) : currentUser ? (
            <span>No biddings yet, be the first to bid!</span>
          ) : (
            <span>No biddings... yet</span>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BiddingModal;
