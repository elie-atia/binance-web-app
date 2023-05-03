import styled from 'styled-components';

export const ListItem = styled.li`
  padding: 0;
`;

export const Row = styled.div`
  display: flex;
`;

export const Col = styled.div`
  flex: 1;
`;

export const ProgressBar = styled.div`
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.bgColor};
`;

export const Card = styled.div`
  margin: 1rem 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const CardHeader = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const ListGroup = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const OrderBookProgress = styled.div`
  position: relative;
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
`;