import { useState } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import IMAGES from "../../assets"; // Importing images from single "IMAGES" object
import { AuthState } from "../../context/AuthProvider";
import ProfileModal from "../ProfileModal/ProfileModal";

import "./NavigationBar.css";
import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const NavigationBar = () => {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const { auth, setAuth } = AuthState();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    return navigate("/login");
  };

  const theme = useTheme();
  const breakpointSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Navbar collapseOnSelect expand="md" variant="dark" id="nav">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Box display="flex" alignItems="center">
            <img
              alt="KaedeCo Scavenger Hunt"
              // @ts-ignore
              src={IMAGES.logo}
              height="30"
              className="d-inline-block align-top"
            />
            {breakpointSmUp ? (
              <Typography variant="h5" display="inline" ml={2} mt={1}>
                Scavenger Hunt
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          {auth ? (
            <DropdownButton
              variant=""
              align="end"
              title={
                <Image
                  id="profileDropdownIcon"
                  src={auth.profilePic}
                  alt="Navbar profile image"
                  roundedCircle
                />
              }
            >
              <Dropdown.Item as="button" onClick={() => setModalShow(true)}>
                Profile
              </Dropdown.Item>
              <ProfileModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />

              <Dropdown.Divider />

              {auth.admin && (
                <>
                  {" "}
                  <Dropdown.Item as="button" onClick={() => navigate("/admin")}>
                    Admin
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </>
              )}

              <Dropdown.Item as="button" onClick={logoutHandler}>
                Log out
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <Nav.Item>
              <button
                className="nav-button me-2"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="nav-button"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </Nav.Item>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
