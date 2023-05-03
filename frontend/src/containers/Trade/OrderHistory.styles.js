import styled from 'styled-components';


export const CWrapper = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CBox = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

export const H3 = styled.h3`
  margin-bottom: 10px;
`;

export const P = styled.p`
  margin-bottom: 10px;
`;

export const UlTable = styled.div`
  width: 100%;
`;

export const UlList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  &:nth-child(even) {
    background-color: #f7f7f7;
  }
`;

export const Li = styled.li`
  list-style: none;
  flex: 1;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #ff3860;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
`;