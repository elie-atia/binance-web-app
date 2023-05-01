import styled from "styled-components";
import { Link } from 'react-router-dom';



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

export const TableRow = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
  &:hover {
    background-color: #f8f9fa;
  }
  > div {
    flex: 1;
    padding: 0.5rem;
    border-top: 1px solid #dee2e6;
  }
`;

export const TextDanger = styled.div`
  color: #dc3545;
`;

export const TextSuccess = styled.div`
  color: #28a745;
`;

export const InlineMobile = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
  }
`;

export const MobileRow = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  border-top: 1px solid #dee2e6;
`;

export const Col12 = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
`;

export const Col4 = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const MutedSmall = styled.div`
  font-weight: 300;
  color: #6c757d;
  font-size: 0.875em;
`;

export const Small = styled.span`
  font-size: 0.875em;
`;

export const TableHeader = styled.div`
  display: flex;
  font-weight: bold;
  padding: 0.5rem;
  > div {
    flex: 1;
    padding: 0.5rem;
    border-top: 1px solid #dee2e6;
  }
`;





