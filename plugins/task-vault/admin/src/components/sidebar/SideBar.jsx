import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';

import { Box, Flex, Typography } from '@strapi/design-system';
import { GridNine } from '@strapi/icons';

import { Sidebar, Div, StyledLink, H1, ActivitiesDiv, ProfileDiv, ProfileLink, Hr } from './styles';

export default function SideBar() {
  return (
    <Sidebar>
      <H1>Project Alpha</H1>

      <ActivitiesDiv>
        <Div>
          <StyledLink to="dashboard">
            <GridNine />
            <span>Dashboard</span>
          </StyledLink>

          <StyledLink to="tasks">
            <GridNine />
            <span>Tasks</span>
          </StyledLink>

          <StyledLink to="projects">
            <GridNine />
            <span>Projects</span>
          </StyledLink>
        </Div>

        <Div>
          <Hr></Hr>
          <ProfileLink to="projects">
            <GridNine />
            <ProfileDiv>
              <span>David Akah</span>
              <span>Full stack developer</span>
            </ProfileDiv>
          </ProfileLink>
        </Div>
      </ActivitiesDiv>
    </Sidebar>
  );
}
