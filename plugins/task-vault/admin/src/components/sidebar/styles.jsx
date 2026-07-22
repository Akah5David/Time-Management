import styled from 'styled-components';
import { Link, NavLink,  } from 'react-router-dom';





export const Sidebar = styled.aside`
  width: 30%;
  min-height: 100vh;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
`;

export const H1 = styled.h1`
  color: #0b0b0b;
  font-weight: bolder;
  font-size: 1.6rem;
`;

export const Nav = styled.nav``;

// DIV ELEMENTS
export const ActivitiesDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 12px;
  /* background-color: #00ff15; */
  height: 100%;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: no;
  gap: 12px;
  /* background-color: red; */

`;

export const ProfileDiv = styled.div`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// LINK
export const StyledLink = styled(NavLink)`
  color: #3b3b3b;
  text-decoration: none;
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 4px;
  border-radius: 3px;

  &.active {
    background-color: #0055ff;
    color: white;
    font-weight: bold;
  }
  
`;

export const ProfileLink = styled(Link)`
  display: flex;
  color: #454548;
  align-items: center;
  gap: 5px;
  line-height: 10px;
  text-decoration: none;
  /* background-color: red; */
  padding: 10px;
`;

//UL
export const Ul = styled.ul`
  width: 250px;
  height: 100vh;
  background: #18181b;
  color: white;
`;

export const Li = styled.li``;

export const Hr = styled.hr`
  color: pink;
`;
