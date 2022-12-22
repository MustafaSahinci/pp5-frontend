import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/BiddingCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function BiddingCreateForm(props) {
  const { car, setCar, setBiddings, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/biddings/", {
        content,
        car,
      });
      setBiddings((prevBiddings) => ({
        ...prevBiddings,
        results: [data, ...prevBiddings.results],
      }));
      setCar((prevCar) => ({
        results: [
          {
            ...prevCar.results[0],
            biddings_count: prevCar.results[0].biddings_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            // className={styles.Form}
            placeholder="my Bid..."
            type="number"
            min="0"
            value={content}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        bid
      </button>
    </Form>
  );
}

export default BiddingCreateForm;