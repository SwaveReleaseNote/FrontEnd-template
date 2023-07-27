/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
// ProjectDashboard.test.tsx
import React from 'react';
import { render, waitFor, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from  "axios-mock-adapter";

import ProjectDashboard from '../pages/ProjectDashboard';

const mockAxios = new MockAdapter(axios);

describe('ProjectDashboard', () => {
  test('renders project dashboard correctly', async () => {
    const location = { search: '?projectId=1&role=Manager&projectName=Test Project' };

    // Mock the axios GET request for fetching project data
    mockAxios.onGet('http://localhost:8080/api/project/1').reply(200, {
      id: 1,
      name: 'Test Project',
      description: 'This is a test project',
      createDate: '2023-07-28',
      isDeleted: false,
    });

    // Render the component with MemoryRouter and provided location props
    const { getByText } = render(
      <MemoryRouter initialEntries={[location]}>
        <Route path="/admin/project/dashboard" Component={ProjectDashboard} />
      </MemoryRouter>
    );

    // Wait for the API call to be completed
    await waitFor(() => {
      // Check if the project name is rendered correctly
      expect(getByText('Test Project')).toBeInTheDocument();

      // Check if the "Project Management" button is rendered for manager role
      expect(getByText('Project Management⚙️')).toBeInTheDocument();
    });
  });

  test('displays "Project deleted" message correctly', async () => {
    const location = { search: '?projectId=1&role=Manager&projectName=Test Project' };

    // Mock the axios GET request for fetching project data
    mockAxios.onGet('http://localhost:8080/api/project/1').reply(200, {
      id: 1,
      name: 'Test Project',
      description: 'This is a test project',
      createDate: '2023-07-28',
      isDeleted: true,
    });

    // Render the component with MemoryRouter and provided location props
    const { getByText }: RenderResult = render(
      <MemoryRouter initialEntries={[location]}>
        <Route path="/admin/project/dashboard" Component={ProjectDashboard} />
      </MemoryRouter>
    );

    // Wait for the API call to be completed
    await waitFor(() => {
      // Check if the "Oops! This project has been deleted." message is rendered
      expect(getByText('Oops! This project has been deleted.')).toBeInTheDocument();
    });
  });
});
