import { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { login } from '../services/user';
import { Link } from 'react-router-dom';
import { LoginType } from '../types/types';

const Login = () => {
  const [userInfo, setUserInfo] = useState<LoginType>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await login(userInfo);

      if (res.success) {
        localStorage.setItem('quizToken', res.data);
        window.location.href = '/';
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
          <p className="h1 mb-5 text-primary">Login</p>
          <Form.Group controlId="login_email" as={Row} sm="8" className="mb-3">
            <Form.Label column sm="4">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="email"
                className="user-form-input"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                placeholder="Type Email"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group
            controlId="login_password"
            as={Row}
            sm="8"
            className="mb-5"
          >
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="password"
                name="password"
                className="user-form-input"
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                placeholder="Type Password"
                required
              />
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          {error ? <Alert variant="danger">{error}</Alert> : null}
          <p className="mt-3 mr-2">
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Not a member? Register
            </Link>
          </p>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
