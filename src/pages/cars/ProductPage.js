import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Car from './Car';
import Asset from '../../components/Asset';

import appStyles from '../../App.module.css';
import styles from '../../styles/ProductPage.module.css';
import { useLocation } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';

import NoResults from '../../assets/no-results.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import PopularProfiles from '../profiles/PopularProfiles';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProductPage({ message, filter = '' }) {
  const [cars, setCars] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState('');
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosReq.get(`/cars/?${filter}search=${query}`);
        setCars(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchProducts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  const cards = hasLoaded ? (
    <>
      {cars.results.length ? (
        <InfiniteScroll
          children={cars.results.map((car) => (
            <Car product key={car.id} {...car} setCars={setCars} />
          ))}
          dataLength={cars.results.length}
          loader={<Asset spinner />}
          hasMore={!!cars.next}
          next={() => fetchMoreData(cars, setCars)}
        />
      ) : (
        <Container className={appStyles.Content}>
          <Asset src={NoResults} message={message} />
        </Container>
      )}
    </>
  ) : (
    <Container className={appStyles.Content}>
      <Asset spinner />
    </Container>
  );

  return (
    <Container>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search posts"
            />
          </Form>
        </Col>
        </Row>
        <Row>
        {Array.from({ length: 3 }).map((_, idx) => (
        <Col>{cards}</Col>))}
        <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
