import { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { register } from '../services/user';
import { RegisterType } from '../types/types';

const Register = () => {
  const [userInfo, setUserInfo] = useState<RegisterType>({
    email: '',
    password: '',
    fname: '',
    lname: '',
  });
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register(userInfo);

      if (res.success) {
        window.location.href = '/login';
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="background-img vh-100" fluid>
      <Row>
        <Form onSubmit={onSubmit} className="user-form border p-5">
          <p className="h1 mb-5 text-primary">Register</p>
          <Form.Group
            controlId="register_email"
            as={Row}
            sm="8"
            className="mb-3"
          >
            <Form.Label column sm="4">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="email"
                placeholder="Type Email"
                className="user-form-input"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                required
              />
            </Col>
          </Form.Group>
          <Form.Group
            controlId="register_password"
            as={Row}
            sm="8"
            className="mb-3"
          >
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="password"
                name="password"
                placeholder="Type Password"
                className="user-form-input"
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                required
              />
            </Col>
          </Form.Group>
          <Form.Group
            controlId="register_fname"
            as={Row}
            sm="8"
            className="mb-3"
          >
            <Form.Label column sm="4">
              First Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="fname"
                placeholder="Type First Name"
                className="user-form-input"
                value={userInfo.fname}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, fname: e.target.value })
                }
                required
              />
            </Col>
          </Form.Group>
          <Form.Group
            controlId="register_lname"
            as={Row}
            sm="8"
            className="mb-3"
          >
            <Form.Label column sm="4">
              Last Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="lname"
                placeholder="Type Last Name"
                className="user-form-input"
                value={userInfo.lname}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, lname: e.target.value })
                }
                required
              />
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          {error ? <Alert variant="danger">{error}</Alert> : null}
          <p className="mt-3 mr-2">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Aleady a member? Login
            </Link>
          </p>
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
