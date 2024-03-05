import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaOpencart } from "react-icons/fa6";
import { TfiUser } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <Navbar expand="md" className="sticky-nav">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            className="brandLogo"
            alt="Bold Skin"
            src="https://raw.githubusercontent.com/TheeCryptoKing/Bold-Skin/main/assets/Products/BoldSkin/BoldSkinLogo.png"
            width="155px"
            height="105px"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll></Nav>
          <ul className="icon-center">
            <Nav.Link href="#" onClick={handleProfile}>
              <TfiUser className="feature-icon" />
            </Nav.Link>
            <Nav.Link href="#" onClick={handleCart}>
              <FaOpencart className="feature-icon" />
            </Nav.Link>
            {/* <Nav.Link href="#action2"><FaFolderOpen className="feature-icon"/></Nav.Link> */}
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;