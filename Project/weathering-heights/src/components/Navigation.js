import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
    // TODO: NOT WORKING
    // const { currentUser } = useAuth()
    // console.log(currentUser)

    return (
        <Navbar bg="light" variant="light">
            <Nav className="me-auto">

                <NavItem eventkey={1} href="/">
                  <Nav.Link as={Link} to="/" >Home</Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/my-profile">
                  <Nav.Link as={Link} to="/my-profile" >Profile</Nav.Link>
                </NavItem>
                <NavItem eventkey={3} href="/login">
                  <Nav.Link as={Link} to="/login" >Login</Nav.Link>
                </NavItem>

            </Nav>
        </Navbar>
    )
};

export default Navigation;

// {!currentUser && <Nav.Link href="#features">Login</Nav.Link>}
// {currentUser && <Nav.Link href="#features">Logout</Nav.Link>}