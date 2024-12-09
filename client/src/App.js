import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container , Row  } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import { useSelector } from "react-redux";
const App = () => {
  const email = useSelector(state => state.user?.email);
  
  return (
    <Container fluid>
    <Router>
      <Row>
        {email ? (
          <>
            <Header />
          </>
        ) : null}
      </Row>
      <Row className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Row>
      <Row>
        {email ? (
          <>
            <Footer />
          </>
        ) : null}
      </Row>
    </Router>
  </Container>
  );
};

export default App;
