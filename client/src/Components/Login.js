import { Link } from "react-router-dom";
import logoL from "../Images/logo-t.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useState } from "react";
import { login } from "../Features/UserSlice";
import { useSelector,useDispatch } from 'react-redux';
import {Button,Col,Label,Container,Row,Form,FormGroup,Input,} from "reactstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState(); 
  const [password, setpassword] = useState();

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
  dispatch(login(userData))
 };
  
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    } 
  }, [user, isError, isSuccess]);

  

  return (
    <div>
      <Container className="login" >
        
      <Form className="div-form">
        <Row className="login-form input">
          <Col md={3} className="loginImage">
          <img src={logoL}  />
          </Col>
         
        </Row>
        <Row>
        <h3>Login</h3>  
  
          <Col md={3}>
          <FormGroup >
    <Label for="exampleEmail">
      Email
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Enter Email"
      type="email"
      onChange={(e) => setemail(e.target.value)}
    />
   </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
          <FormGroup>
            
    <Label for="examplePassword">
      Password
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Enter Password"
      type="password"
      onChange={(e) => setpassword(e.target.value)}
    />
  </FormGroup>
  </Col> 
  </Row> 
  
  <Row>
      <FormGroup >
        <Input
          id="checkbox2"
          type="checkbox"
        />
        <Label >
          Remember Me
        </Label>
        <div>
          <a href="">Forget Password?</a>
        </div>
      </FormGroup>
    
        </Row>
        <Row>
          <Col md={3}>
          <Button
                color="primary"
                className="button"
                onClick={() => handleLogin()}>Login</Button>
  <p className="smalltext">
              No Account? <Link to="/register">Sign Up now.</Link>
            </p>
          </Col>
        </Row>
        
        </Form>
      </Container>  
    </div>
 
  );
};
 
export default Login;