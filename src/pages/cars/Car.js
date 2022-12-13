import React from "react";
import styles from "../../styles/Car.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

const Car = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    biddings_count,
    saves_count,
    save_id,
    title,
    content,
    image,
    updated_at,
    carPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/saves/", { car: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((car) => {
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
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((car) => {
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
            {is_owner && carPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/cars/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own cars!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : save_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to save posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {saves_count}
          <Link to={`/cars/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {biddings_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Car;