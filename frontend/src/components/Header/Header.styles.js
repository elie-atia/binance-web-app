import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledHeader = styled.header`
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: Arial, sans-serif;
`;



export const StyledNavLink = styled(NavLink)`
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  line-height: 1.25;
  color: #007bff;
  background-color: transparent;
  border: 1px solid transparent;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: #0056b3;
    text-decoration: none;
  }

  &.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;
