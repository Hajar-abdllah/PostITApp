import Posts from "./Posts";
import SharePosts from "./SharePost";
import User from "./User";
import { Row, Col } from "reactstrap"; //import the Reactstrap Components
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const email = useSelector(state => state.user?.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);


  return (
    <>

        <Row>
         <Col md={3}>
          <User/>
         </Col>
         <Col md={9}>
          <SharePosts/>
         </Col>
        </Row>
        <Row>
         <Col md={3}></Col>
         <Col md={9}>
          <Posts/>
         </Col>
        </Row>
    </>
  );
};
 
export default Home;
 