import React from 'react';
import styles from '../styles/Car.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { axiosRes } from '../api/axiosDefaults';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Car2 = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    biddings_count,
    saves_count,
    save_id,
    title,
    price,
    year,
    km,
    image,
    updated_at,
    setCars,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/saves/', { car: id });
      setCars((prevCars) => ({
        ...prevCars,
        results: prevCars.results.map((car) => {
          return car.id === id
            ? { ...car, saves_count: car.saves_count + 1, save_id: data.id }
            : car;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/saves/${save_id}/`);
      setCars((prevCars) => ({
        ...prevCars,
        results: prevCars.results.map((car) => {
          return car.id === id
            ? { ...car, saves_count: car.saves_count - 1, save_id: null }
            : car;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
          </div>
        </Media>
      </Card.Body>
      <Link to={`/cars/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {price && (
          <Card.Text>$ {`${Number(price).toLocaleString('en')}`}</Card.Text>
        )}
        {year && km && (
          <Card.Text>
            Year: {year} - {`${Number(km).toLocaleString('en')}`} km
          </Card.Text>
        )}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own cars!</Tooltip>}
            >
              <i className="fas fa-heart" />
            </OverlayTrigger>
          ) : save_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`fas fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to save posts!</Tooltip>}
            >
              <i className="fas fa-heart" />
            </OverlayTrigger>
          )}
          {saves_count}
          <Link to={`/cars/${id}`}>
            <i className="fas fa-comments" />
          </Link>
          {comments_count}
          <Link to={`/cars/${id}`}>
            <i className="fas fa-gavel" />
          </Link>
          {biddings_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Car2;
