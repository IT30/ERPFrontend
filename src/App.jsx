import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Users } from "./pages/Users";
import { Login_register } from "./pages/Login_register";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">React JS Frontend</h3>

        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
          <Container>
            <Navbar.Brand href="#home">STIG</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/product">Product</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login_register">Login/Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login_register" element={<Login_register />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
