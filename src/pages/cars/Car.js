import React from 'react';
import styles from '../../styles/Car.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import parse from 'html-react-parser';
import Carousel from 'react-bootstrap/Carousel';

const Car = (props, { product }) => {
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
    content,
    price,
    year,
    km,
    image,
    image2,
    image3,
    image4,
    updated_at,
    carPage,
    setCars,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/cars/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/cars/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

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
            {is_owner && carPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      {product ? (
        <Link to={`/cars/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
      ) : (
        <Carousel interval={null}>
          <Carousel.Item>
            <Link to={`/cars/${id}`}>
              <img className="d-block w-100" src={image} alt="image1" />
            </Link>
          </Carousel.Item>
          {image2 ? (
            <Carousel.Item>
              <img className="d-block w-100" src={image2} alt="image2" />
            </Carousel.Item>
          ) : null}
          <Carousel.Item>
            <img className="d-block w-100" src={image3} alt="image3" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image4} alt="image4" />
          </Carousel.Item>
        </Carousel>
      )}
      <Card.Body>
        {product ? (
          <>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {price && <Card.Text>$ {price}</Card.Text>}
            {year && km && <Card.Text>{year}      {km} km</Card.Text>}
            {/* {km && <Card.Text>{km} km</Card.Text>} */}
          </>
        ) : (
          <>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {price && <Card.Text>$ {price?.toLocaleString() || ''}</Card.Text>}
            {year && km && <Card.Text>{year} {km} km</Card.Text>}
            {/* {km && <Card.Text>{km} km</Card.Text>} */}
            {content && <Card.Text>{parse(content)}</Card.Text>}
          </>
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
            <i className="fas fa-gavel"/>
          </Link>
          {biddings_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Car;
