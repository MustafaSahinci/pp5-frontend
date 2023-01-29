import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import appStyles from '../../App.module.css';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Car from '../../components/Car';
import PopularProfiles from '../profiles/PopularProfiles';

import CommentCreateForm from '../comments/CommentCreateForm';
import BiddingCreateForm from '../biddings/BiddingCreateForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Comment from '../comments/comment';
import Bidding from '../biddings/Bidding';

import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import BiddingModal from '../../components/BiddingModal';
import { Button } from 'react-bootstrap';

function CarPage() {
  const { id } = useParams();
  const [car, setCar] = useState({ results: [] });
  const [modalShow, setModalShow] = useState(false);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [biddings, setBiddings] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  let hasBid = false
  hasBid = biddings?.results.map((bid) => {
    if (bid.owner === currentUser) {
      return true
    }
  })

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: car }, { data: biddings }, { data: comments }] =
          await Promise.all([
            axiosReq.get(`/cars/${id}`),
            axiosReq.get(`/biddings/?car=${id}`),
            axiosReq.get(`/comments/?car=${id}`),
          ]);
        setCar({ results: [car] });
        setBiddings(biddings);
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  console.log('biddings', biddings.results)

  return (
    <Container>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
          <Car {...car.results[0]} setCars={setCar} carPage />
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <Button
            className="d-lg-none .d-xl-none"
            variant="success"
            size="lg"
            block
            onClick={() => setModalShow(true)}
          >
            Show biddings
          </Button>
          <br />

          <BiddingModal show={modalShow} onHide={() => setModalShow(false)} />

          <Container className={appStyles.Content}>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                car={id}
                setCar={setCar}
                setComments={setComments}
              />
            ) : comments.results.length ? (
              'comments'
            ) : null}
            {comments.results.length ? (
              <InfiniteScroll
                children={comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setCar={setCar}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            ) : currentUser ? (
              <span>No comments yet, be the first to comment!</span>
            ) : (
              <span>No comments... yet</span>
            )}
          </Container>
        </Col>

        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          {biddings.results.map((Bidding) => {
            return Bidding.owner === currentUser;
          })}
          
          <Container className={appStyles.Content}>
            {currentUser && !hasBid ? (
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
        </Col>
      </Row>
    </Container>
  );
}

export default CarPage;
