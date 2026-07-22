import { Bell, Search, Drag, User, Question } from '@strapi/icons';

import { Button } from '@strapi/design-system';

import { GeneralHeader, H1, StyledForm, ActionDiv, INPUT, UserDiv } from './styles.jsx';
export default function Header() {
  function addMembers() {}

  return (
    <GeneralHeader>
      {/*Search */}
      <StyledForm>
        <Search />
        <INPUT type="search" placeholder="Search" />
      </StyledForm>

      {/*User Actions */}
      <ActionDiv>
        <Bell />
        <Question />
        <Drag />
        <UserDiv>
          <User />
          <button onClick={addMembers}>Add Members</button>
        </UserDiv>
      </ActionDiv>
    </GeneralHeader>
  );
}
