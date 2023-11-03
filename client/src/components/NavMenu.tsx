import { Nav } from 'react-bootstrap';

const NavMenu = ({
  menu,
}: {
  menu: {
    label: string;
    path: string;
    icon: JSX.Element;
  };
}) => {
  const logout = () => {
    localStorage.removeItem('quizToken');
  };

  return (
    <Nav.Item>
      <Nav.Link
        href={menu.path}
        onClick={() => menu.label === 'Logout' && logout()}
        eventKey={menu.path}
      >
        {menu.icon} {menu.label}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavMenu;
