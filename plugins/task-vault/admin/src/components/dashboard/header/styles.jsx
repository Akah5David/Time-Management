import styled from 'styled-components';
import { Link, Form } from 'react-router-dom';

export const GeneralHeader = styled.header`
  max-width: 100%;
  background: #f4f4f4;
  display: flex;
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px 5px 10px;
`;

export const H1 = styled.h1`
  color: blue;
  font-weight: bolder;
  font-size: 1.2rem;
`;

// FORM
export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: row;
  gap: 2px;
  padding: 5px;
  border-radius: 10px;
  background-color: white;

  &::placholder {
    font-size: 32px;
    color: blue;
  }
`;

export const Nav = styled.nav``;

//INPUT
export const INPUT = styled.input`
  outline: none;
  border: none;
`;

// DIV ELEMENTS
export const ActionDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background-color: transparent;
  justify-content: space-between;
  gap: 12px;
  background-color: transparent;
  height: 100%;
`;

export const UserDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  padding: 5px;
  background-color: white;
  border-radius: 3px;
`;

export const ProfileDiv = styled.div`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;


