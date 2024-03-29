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
import InputGroup from 'react-bootstrap/InputGroup';

function CarEditForm() {
  const editor = useRef(null);
  const [errors, setErrors] = useState({});

  const [carData, setCarData] = useState({
    title: '',
    content: '',
    price: '',
    year: '',
    km: '',
    image: '',
    image2: '',
    image3: '',
    image4: '',
  });
  const { title, content, price, year, km, image, image2, image3, image4 } =
    carData;

  const imageInput = useRef(null);
  const imageInput2 = useRef(null);
  const imageInput3 = useRef(null);
  const imageInput4 = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/cars/${id}/`);
        const {
          title,
          content,
          price,
          year,
          km,
          image,
          image2,
          image3,
          image4,
          is_owner,
        } = data;

        is_owner
          ? setCarData({
              title,
              content,
              price,
              year,
              km,
              image,
              image2,
              image3,
              image4,
            })
          : history.push('/');
      } catch (err) {
        // console.log(err);
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
      content: data,
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

  const handleChangeImage2 = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image2);
      setCarData({
        ...carData,
        image2: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleChangeImage3 = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image3);
      setCarData({
        ...carData,
        image3: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleChangeImage4 = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image4);
      setCarData({
        ...carData,
        image4: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('year', year);
    formData.append('km', km);

    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    if (imageInput2?.current?.files[0]) {
      formData.append('image2', imageInput2.current.files[0]);
    }

    if (imageInput3?.current?.files[0]) {
      formData.append('image3', imageInput3.current.files[0]);
    }

    if (imageInput4?.current?.files[0]) {
      formData.append('image4', imageInput4.current.files[0]);
    }

    try {
      await axiosReq.put(`/cars/${id}/`, formData);
      history.push(`/cars/${id}`);
    } catch (err) {
      // console.log(err);
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

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            min="0"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>year</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="9999"
          name="year"
          value={year}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.year?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>km</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            min="0"
            max="999999"
            name="km"
            value={km}
            onChange={handleChange}
          />
          <InputGroup.Text>km</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      {errors?.km?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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

            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image2} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload2"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload2"
                accept="image/*"
                onChange={handleChangeImage2}
                ref={imageInput2}
              />
            </Form.Group>
            {errors?.image2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image3} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload3"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload3"
                accept="image/*"
                onChange={handleChangeImage3}
                ref={imageInput3}
              />
            </Form.Group>
            {errors?.image3?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image4} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload4"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload4"
                accept="image/*"
                onChange={handleChangeImage4}
                ref={imageInput4}
              />
            </Form.Group>
            {errors?.image4?.map((message, idx) => (
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
