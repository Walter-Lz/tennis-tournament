// app/layout.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from "styled-components";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    document.title = "Tennis Tournament APP";
  }, []);

  return (
    <html lang="es">
      <Body>
        <Header>
          <Nav>
            <MenuIcon onClick={toggleMenu}>
              <Bar />
              <Bar />
              <Bar />
            </MenuIcon>
            <NavLinks $isOpen={isMenuOpen}>
              <NavItem href="/"onClick={toggleMenu}>Inicio</NavItem>
              <NavItem href="/Tournament"onClick={toggleMenu}>Torneo</NavItem>
            </NavLinks>
          </Nav>
        </Header>
        <Main>{children}</Main>
        <Footer>
          <p>&copy; 2025 Todos los derechos reservados</p>
        </Footer>
      </Body>
      </html>
  );
}
const Body = styled.body`
  font-family: Arial;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
`;
const Header = styled.header`
  background-color: #5b2333;
  padding: 10px 20px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const MenuIcon = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    background-color: #898686;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
`;
const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #5b2333;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-20px)")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
`;
const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  margin: 10px 0;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #898686;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
const Main = styled.main`
  padding: 20px;
`;
const Footer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: #5b2333;
  color: white;
`;