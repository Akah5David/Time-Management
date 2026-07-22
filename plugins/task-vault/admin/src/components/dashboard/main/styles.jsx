import styled from 'styled-components';
import { Link, Form } from 'react-router-dom';
import { Button } from '@strapi/design-system';

export const DashBoardMain = styled.main`
  width: 100%;
  background: #f4f4f4;
  display: flex;
  background-color: #eaebeb;
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
  background-color: transparent;
  overflow: none;
  gap: 7px;
  justify-content: space-between;
`;

export const ActivityUl = styled.ul`
  min-width: 100%;
  background: #f4f4f4;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  background-color: transparent;
  flex-direction: column;
  justify-content: space-between;

  #pending-complete {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: transparent;
  }

  #created-updated {
    display: grid;
    background-color: #edeef3;
    grid-template-columns: 1fr;
    grid-template-rows: repeat() (2, 1fr);
    gap: 10px;
  }

  #created-updated #recent-projects {
    display: flex;
    background-color: transparent;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
  }
`;

//Li
export const ActivityLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  flex-direction: center;
  gap: 3px;
  align-items: flex-start;
  border: 2px;
  padding: 7px;
  border-radius: 3px;

  .project-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    width: 100%;
    font-weight: bold;
  }

  .project-title .title {
  }

  .project-content {
  }

  .progress-details {
    width: 100%;
  }

  .progress-details .progress-info {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: transparent;
  }

  .progress-details .percentage-bar {
  }
`;
export const StatisticsLi = styled.li`
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2px;
  border: 2px;
  padding: 8px 8px;
  border-radius: 3px;
`;

//DIV
export const StatisticsDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  align-items: flex-start;
  width: 100%;

  > h3 {
    font-weight: bold;
    font-size: 16px;
  }
`;
export const AnalyticsDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f5f6;
  flex-direction: center;
  align-items: flex-start;
  border: 2px;
  padding: 3px;
  border-radius: 3px;
`;

export const RecentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  grid-column: span 2;
`;
export const ShieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  justify-content: space-between;
  width: 100%;

  > p{
    padding: 0px 3px;
    background-color: #b9fcb9;
    color:#026021;
    border-radius: 2px;
  }
`;

export const ProjectDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  gap: 10px;

  > h1 {
    font-size: 12px;
    font-weight: bold;
  }

  > button {
    color: blue;
  }
`;

export const SystemDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: transparent;

  #system-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: transparent;
  }

  #system-header > h4 {
    font-weight: bold;
  }

  #system-header > button {
    color: blue;
  }

  #system-details {
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .user-info {
    display: flex;
    flex-direction: row;
    background-color: #f7f5f6;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 3px;
  }

  .user-info .color {
    height: 8px;
    width: 8px;
    background-color: #02b808;
    border-radius: 50%;
  }

  .portfolio {
    background-color: transparent;
    display: flex;
    flex-direction: row;
    gap: 7px;
  }
`;

export const TaskTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 3px;
  overflow: hidden;

  thead {
    text-align: left;
    color: #403e3e;
    background-color: #ddf5ffb5;
  }

  tbody {
    text-align: left;
    background-color: white;
  }

  tfoot {
    width: 100%;
    background-color: #ddf5ffb5;
    color: black;
  }

  th,
  td {
    border-bottom: 1.5px solid #ddd;
  }

  th.actions {
    display: flex;
    justify-content: flex-end;
  }

  td.actions {
    text-align: right;
    vertical-align: middle;
  }

  td.chevron {
    display: flex;
    justify-content: flex-end;
  }

  td.project-col > h4 {
    font-weight: bold;
  }

  th:last-child,
  td:last-child {
    padding-right: 10px;
  }

  th:first-child,
  td:first-child {
    text-align: left;
    padding-left: 10px;
  }

  td:first-child {
    text-align: left;
    border-left: 3px solid #ddd;
    padding-left: 10px;

    &:hover {
      border-left-color: red;
    }
  }

  .footer > td {
    border: 0;
  }

  .lower > span {
    background-color: #71f971cf;
    padding: 0px 5px 0px 5px;
    border-radius: 1px;
    color: #006911;
    text-transform: uppercase;
  }
  .critical > span {
    background-color: #f67a7a;
    padding: 0px 5px 0px 5px;
    border-radius: 1px;
    color: #ad0000;
    text-transform: uppercase;
  }
`;

export const TableButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0;
  color: black;
  cursor: pointer;
  width: 24px;
  border: 0;
  height: 24px;
`;
export const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-betweenffffff;
  align-items: center;
  gap: 3px;
  padding: 4px;
  width: auto;
  height: auto;
  border: 0px;
  background-color: #71ccf3b5;
  color: #1b1b1b;
  border-radius: 3px;
  text-transform: capitalize;ffffff

  > span {
    font-size: 10px;
    font-weight: 500;
  }
`;
export const NewTaskButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
  padding: 4px;
  width: auto;
  height: auto;
  border: 0px;
  background-color: #005ac7;
  color: white;
  border-radius: 3px;

  > span {
    font-size: 10px;
    font-weight: 500;
  }
`;

export const OperationDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const InjectionZone = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
`;
export const UrgentDiv = styled.caption`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;

  > h3 {
    font-size: 12px;
    font-weight: bold;
  }

  > div {
    display: flex;
    flex-direction: row;
    gap: 7px;
  }
`;
