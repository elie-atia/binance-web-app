import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const CardBody = styled.div`
  padding: 1.25rem;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Col = styled.div`
  flex: 1;
  padding: 0.75rem;
  box-sizing: border-box;

  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 16.666667%;
  }
`;

export const TickerSymbol = styled.h2``;

export const Label = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: #6c757d;
`;

export const Value = styled.span`
  font-weight: bold;
`;

export const ValueChange = styled(Value)`
  color: ${(props) => (props.change >= 0 ? '#28a745' : '#dc3545')};
`;
