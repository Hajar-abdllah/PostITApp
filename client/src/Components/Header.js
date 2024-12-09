import logo from "../Images/logo-t.png";
import "../App.css";
import { Link,useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";
import {Navbar,Nav,NavItem,NavLink} from "reactstrap";
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const handlelogout = async () => {
      dispatch(logout());
      //ensure that the state update from the logout action has been processed before proceeding to the next step.
      await new Promise((resolve) => setTimeout(resolve, 100));
  
      navigate("/login"); //redirect to login page route.
    };
  return (
    <>
    <Navbar>
    <Nav>
      <NavItem>
        <NavLink active href="#">
        <img src={logo} />
        </NavLink>
      </NavItem>
      <NavItem>
      <NavItem>
              <Link to="/">Home</Link>
          </NavItem>
 
      </NavItem>
      <NavItem>
      <Link to="/Profile">Profile</Link>
      </NavItem>
      <NavItem>
      <Link to="/Login">Login</Link>
      </NavItem>
      <NavItem>
      <Link onClick={handlelogout}>Logout</Link>
      </NavItem>
    </Nav>
  </Navbar>
  </>
 
 
  );
};
 
export default Header;