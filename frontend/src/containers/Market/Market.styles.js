import styled from "styled-components";

export const NavItem = styled.li`
  display: block;
  margin-bottom: 0;
  margin-right: 0.5rem;
  font-family: Arial, sans-serif;
`;

export const NavLink = styled.a`
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  margin-bottom: -1px;
  line-height: 1.25;
  color: #007bff;
  cursor: pointer;

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

export const MarketsLink = styled.span`
  display: none;
  @media (min-width: 576px) {
    display: inline-block !important;
  }
`;

export const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  font-family: Arial, sans-serif;
`;