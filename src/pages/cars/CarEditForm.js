import React, { useEffect, useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import styles from '../../styles/CarCreateEditForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import { useHistory, useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import JoditEditor from 'jodit-react';

function CarEditForm() {
  const editor = useRef(null);
  const [errors, setErrors] = useState({});

  const [carData, setCarData] = useState({
    title: '',
    content: '',
    price: '',
    image: '',
  });
  const { title, content, price, image } = carData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/cars/${id}/`);
        const { title, content, price, image, is_owner } = data;

        is_owner
          ? setCarData({ title, content, price, image })
          : history.push('/');
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setCarData({
      ...carData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeContent = (data) => {
    setCarData({
      ...carData,
      'content': data,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setCarData({
        ...carData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);

    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/cars/${id}/`, formData);
      history.push(`/cars/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))} */}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <JoditEditor
          ref={editor}
          value={content}
          name="content"
          onChange={(newContent) => handleChangeContent(newContent)}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          min="0"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default CarEditForm;
