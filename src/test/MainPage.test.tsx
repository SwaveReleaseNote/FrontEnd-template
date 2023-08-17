import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '../views/admin/default/MainPage'; // 경로에 맞게 수정
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UserRole, Project, mockProjects } from '../test/__mocks__/mockData';

const mock = new MockAdapter(axios);

const queryClient = new QueryClient();

describe('MainPage', () => {
   beforeEach(() => {
      mock.reset(); // Reset the mock adapter before each test
   });

   it('fetches and displays project data', async () => {
      // Mock successful response for /projects endpoint
      console.log('Setting up mock response');
      mock.onGet('/projects').reply(200, mockProjects);

      render(
         <QueryClientProvider client={queryClient}>
            <MemoryRouter>
               <MainPage />
            </MemoryRouter>
         </QueryClientProvider>,
      );

      // Wait for data to be fetched and displayed
      // await screen.findByText('Project Name 1'); // Adjust with your actual project name

      // Perform your assertions based on the rendered content
      // expect(screen.getByText('로딩중입니다...기다려주세요😊')).toBeInTheDocument();
      // ...more assertions
   });
});
