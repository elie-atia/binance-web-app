import styled from 'styled-components';

export const Card = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const Header = styled.div`
  background-color: #f8f9fa;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  padding: 0.75rem 1.25rem;
  font-weight: bold;
`;

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 1.25rem;
  font-size: 0.875rem;
`;

export const Text = styled.span`
  color: ${props => (props.positive ? '#28a745' : '#dc3545')};
`;