import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header=()=>{
    return(
        <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href='/'>Weather App</Navbar.Brand>
          <Nav className="options">
            <div><Link to='/' style={{textDecoration:'none', color:'white'}}>Home</Link></div>
            <div><Link to='previous' style={{textDecoration:'none', color:'white'}}>PreviousInfo</Link></div>
          </Nav>
        </Container>
      </Navbar>
        </div>
    )
}
export default Header;