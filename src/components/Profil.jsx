"use  client";

import React, { useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { useUser } from "@auth0/nextjs-auth0/client";
import Profile from "../../public/nav/profile-user-svgrepo-com.svg";
import Image from "next/image";

import PageLink from "./PageLink";
import AnchorLink from "./AnchorLink";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="light" light expand="md">
        <Container>
          {/* 
          <NavbarToggler onClick={toggle} data-testid="navbar-toggle" />*/}
          <Collapse isOpen={isOpen} navbar>
            {!isLoading && !user && (
              <Nav className="d-md-none mt-1 pt-1" navbar>
                <AnchorLink
                  href="/api/auth/login"
                  className="btn btn-primary btn-block "
                  tabIndex={0}
                  testId="navbar-login-mobile"
                >
                  <Image src={Profile} alt="login" className="w-6 h-6" />
                </AnchorLink>
              </Nav>
            )}
            {user && (
              <Nav
                id="nav-mobile"
                className="d-md-none justify-content-between"
                navbar
                data-testid="navbar-menu-mobile"
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-xl ml-auto"
                      width="40"
                      height="40"
                      decode="async"
                      data-testid="navbar-picture-mobile"
                      onClick={toggleProfile}
                    />
                  </span>
                </NavItem>
                {showProfile && (
                  <div>
                    <NavItem>
                      <PageLink href="/profile" testId="navbar-profile-mobile">
                        Profile
                      </PageLink>
                    </NavItem>
                    <NavItem id="qsLogoutBtn">
                      <AnchorLink
                        href="/api/auth/logout"
                        className="btn btn-link p-0"
                        testId="navbar-logout-mobile"
                      >
                        Log out
                      </AnchorLink>
                    </NavItem>
                  </div>
                )}
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
