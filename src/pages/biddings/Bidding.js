import React, { useState } from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Bidding.module.css';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import BiddingEditForm from './BiddingEditForm';

const Bidding = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setCar,
    setBiddings,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/biddings/${id}/`);
      setCar((prevCar) => ({
        results: [
          {
            ...prevCar.results[0],
            biddings_count: prevCar.results[0].biddings_count - 1,
          },
        ],
      }));

      setBiddings((prevBiddings) => ({
        ...prevBiddings,
        results: prevBiddings.results.filter((bidding) => bidding.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <BiddingEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setBiddings={setBiddings}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>$ {`${Number(content).toLocaleString("en")}`}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Bidding;
