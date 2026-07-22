import styled from 'styled-components';
import { Link, Form } from 'react-router-dom';

export const DashBoardMain = styled.main`
  width: 100%;
  background: #f4f4f4;
  display: flex;
  background-color: #02ff28;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`;

//UL
export const StatiscticUl = styled.ul`
  min-width: 100%;
  background: #f4f4f4;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: red;
  padding: 0px 10px 0px 10px;
  overflow: none;
  gap: 10px;
  justify-content: space-between;
`;

export const ActivityUl = styled.ul`
  min-width: 100%;
  background: #f4f4f4;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background-color: #ea02ff;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;

  #pending-complete {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  #created-updated {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

//Li
export const ActivityLi = styled.li`
  display: flex;
  flex-direction: column;
  background-color: orange;
  flex-direction: center;
  align-items: center;
  border: 2px;
  border-radius: 3px;
`;
export const StatisticsLi = styled.li`
  display: flex;
  flex-direction: row;
  background-color: orange;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px;
  padding: 2px 8px;
  border-radius: 3px;
`;

//DIV
export const StatisticsDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: center;
  align-items: flex-start;
`;
export const AnalyticsDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: orange;
  flex-direction: center;
  align-items: flex-start;
  border: 2px;
  padding: 3px;
  border-radius: 3px;
`;

export const RecentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ProjectDiv = styled.div`
  display: flex;
  flex-direction: row;
  background-color: brown;
  gap: 10px;

  > h1 {
    font-size: 16px;
    font-weight: bold;
  }

  #project-color {
    display: flex;
    flex-direction: row;
    gap: 10px;
    background-color: red;
  }
`;
