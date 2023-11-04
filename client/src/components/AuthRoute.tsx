import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Col, Container, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { AiOutlineHome, AiOutlineFileText } from 'react-icons/ai';
import { RiFileHistoryFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { setUser } from '../redux/userSlice';
import { getUser } from '../services/user';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import NavMenu from './NavMenu';

const userMenu: {
  label: string;
  path: string;
  icon: JSX.Element;
}[] = [
  {
    label: 'Home',
    path: '/',
    icon: <AiOutlineHome />,
  },
  {
    label: 'Reports',
    path: '/user/report',
    icon: <RiFileHistoryFill />,
  },
  {
    label: 'Logout',
    path: '/login',
    icon: <RiLogoutBoxRLine />,
  },
];

const adminMenu: {
  label: string;
  path: string;
  icon: JSX.Element;
}[] = [
  {
    label: 'Home',
    path: '/',
    icon: <AiOutlineHome />,
  },
  {
    label: 'Exam',
    path: '/admin/exam',
    icon: <AiOutlineFileText />,
  },
  {
    label: 'Reports',
    path: '/admin/report',
    icon: <RiFileHistoryFill />,
  },
  {
    label: 'Logout',
    path: '/login',
    icon: <RiLogoutBoxRLine />,
  },
];

const AuthRoute = () => {
  const { user } = useAppSelector((state) => state.user) as any;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const path = window.location.pathname;

  const getUserInfo = useCallback(async () => {
    try {
      const res = await getUser();

      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        console.log(res.message);
      }
    } catch (err: any) {
      navigate('/login');
      console.log(err);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem('quizToken')) {
      getUserInfo();
    } else {
      navigate('/login');
    }
  }, [getUserInfo, navigate]);

  // navbar help : https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap

  return user ? (
    <Container fluid>
      <Row className="p-4 bg-secondary">
        <Col xs={10}>
          <p className="h3 text-white text-center">Moon's Quiz App</p>
        </Col>
        <Col xs={2}>
          <p className="h5 text-white mt-2 text-end">
            Role: {user.isAdmin ? 'Admin' : 'User'}
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs="2">
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Offcanvas
              id="responsive-navbar-nav"
              aria-labelledby="responsive-navbar-nav"
              placement="start"
            >
              <Offcanvas.Body>
                <Nav
                  className="flex-column ms-auto"
                  variant="underline"
                  activeKey={path}
                >
                  {user.isAdmin
                    ? adminMenu.map((menu) => (
                        <NavMenu key={menu.label} menu={menu} />
                      ))
                    : userMenu.map((menu) => (
                        <NavMenu key={menu.label} menu={menu} />
                      ))}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>
        </Col>
        <Col xs="10">
          <Row>
            <Outlet />
          </Row>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default AuthRoute;
