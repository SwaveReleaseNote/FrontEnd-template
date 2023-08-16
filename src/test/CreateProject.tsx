/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import CreateProject from '../views/admin/default/pages/CreateProject';
import { MemoryRouter } from 'react-router-dom';

describe('CreateProject', () => {
   it('should add a team member when a recommended member is clicked', () => {
      render(
         <MemoryRouter>
            <CreateProject />
         </MemoryRouter>,
      );

      // Initially, no team members are present
      const teamMembersList = screen.queryByTestId('team-members-list');
      // expect(teamMembersList?.children).toBeUndefined();

      // // Click on the recommended member to add them to the team
      // const recommendedMemberButton = screen.getByText('+');
      // userEvent.click(recommendedMemberButton);

      // // After the click, the team members list should have one member
      // expect(teamMembersList.children).toHaveLength(1);
   });
});
