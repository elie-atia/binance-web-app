import styled from 'styled-components';

export const Card = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  position: relative;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.14);
  }
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardMedia = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  overflow: hidden;
`;

export const Typography = styled.div`
  color: ${(props) => (props.color === 'text.secondary' ? '#6b6b6b' : '#000')};
  font-size: ${(props) => {
    switch (props.variant) {
      case 'h5':
        return '1.5rem';
      case 'body2':
        return '0.875rem';
      default:
        return '1rem';
    }
  }};
  font-weight: ${(props) => (props.variant === 'h5' ? 500 : 400)};
  line-height: 1.5;
  margin-bottom: ${(props) => (props.variant === 'h5' ? '0.35em' : '0.25em')};
`;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -${(props) => (props.spacing ? props.spacing / 2 : 0)}px;
`;

export const GridItem = styled.div`
  padding: ${(props) => (props.spacing ? props.spacing / 2 : 0)}px;
  box-sizing: border-box;

  @media (min-width: 960px) {
    flex-basis: 33.33%;
    max-width: 33.33%;
  }

`;
