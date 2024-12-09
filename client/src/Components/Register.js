
import Logo from '../Images/logo-t.png';
import image1 from '../Images/image1.jpg';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import {registerUser,deleteUser,updateUser} from"../Features/UserSlice";
import "../App.css";
import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import {useForm} from"react-hook-form";
import {yupResolver} from"@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
} from "reactstrap";


const Register = () => {
  const userList=useSelector((state)=>state.users.value);
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [confirmPassword,setconfirmPassword]=useState("");
  const dispatch=useDispatch();
  const navigate = useNavigate() 

    const {
      register,
      handleSubmit, // Submit the form when this is called
      formState: { errors },
    } = useForm({
      resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
    });
  const onSubmit = (data) => {
    try {
      
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      console.log("Form Data", data);
      alert("Validation all good.");
      dispatch(registerUser(userData));
      navigate("/login");  
    } catch (error) {
      console.log("Error.");
    }
   
  
  

  };
  const handleDelete=(email)=>{
    dispatch(deleteUser(email));
  }
  const handleUpdate=(email)=>{
    const userData={
      name:name,
      email:email,
      password:password,
    };
    dispatch(updateUser(userData));
  }




  return (
    <Container fluid>
    <Row className="formrow">
    <Col className="columndiv1" lg="5">
    <Form className="div-form" onSubmit={handleSubmit(onSubmit)}>
    
      <img src={Logo}/>
    
    <FormGroup >
      <Col md={12}>
      
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter your name..."
          {...register("name",{
          onChange:(e)=>setname(e.target.value),
        })}
        />
        <p className="erorr">{errors.name?.message}</p>
      </Col>
    </FormGroup>
    
   <FormGroup >
      <Col md={12}>
        <input
           type="text"
           className="form-control"
           id="email"
           placeholder="Enter your email..."
          {...register("email", {
            onChange: (e) => setemail(e.target.value),
          })}
        />
        <p className="erorr">{errors.email?.message}</p>
      </Col>
    </FormGroup>
    

    <FormGroup >
      <Col md={12}>
        <input
          id="password"
          className="form-control"
          placeholder="Enter Your Password"
          type="password"
          {...register("password", {
            onChange: (e) => setpassword(e.target.value),
          })}
        />
        <p className="erorr">{errors.password?.message}</p>
      </Col>
    </FormGroup>


    <FormGroup >
      <Col md={12}>
        <input
          id="confirmPassword"
          className="form-control"
          placeholder="Corfirm Your Password"
          type="password"
          {...register("confirmPassword", {
            onChange: (e) => setconfirmPassword(e.target.value),
          })}
        />
        <p className="erorr">{errors.confirmPassword?.message}</p>
      </Col>
    </FormGroup>


    <FormGroup>
      <Col>
        <Button color="primary"className="button">
          Submit
        </Button >
      </Col>
    </FormGroup>


   
  </Form>
  </Col>
  <Col className="columndiv2" lg="7">
  <img src={image1} className='loginImage'/>
  </Col>
  </Row>
  {/* <Row>
    <Col md={6}>
    <div>
      <table>
      <tbody>
        {userList.map((user) =>(
        <tr key={user.email}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td><Button color= "primary"onClick={()=>handleDelete(user.email)}>Delete User</Button><br></br></td>
        <td><Button color= "primary"onClick={()=>handleUpdate(user.email)}>Update User</Button></td>
        </tr>
        ))}
      </tbody>
      </table>
    </div>
    </Col>
  </Row> */}
  </Container>
  );
};
 
export default Register;
 