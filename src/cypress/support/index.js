beforeEach(() => {
   cy.request('POST', 'http://localhost:8080/api/user/sample').then(response => {
      const user = response.body;
      cy.log('Test user created:', user);
   });
   cy.log('before all 화면 크기 1920x1080');
   cy.viewport(1920, 1080);
});

afterEach(() => {
   cy.request('DELETE', 'http://localhost:8080/api/user/sample').then(response => {
      const user = response.body;
      cy.log('Test user deleted:', user);
   });
});
