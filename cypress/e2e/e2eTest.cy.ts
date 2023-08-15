describe('Email User Test', () => {
   /* ==== Test Created with Cypress Studio ==== */
   it('E-mail 로그인 테스트', function () {
      /* ==== Generated with Cypress Studio ==== */
      cy.visit('localhost:3000');
      cy.get('#email').clear('g');
      cy.get('#email').type('gkarjsdnr@xptmxm.com');
      cy.get('#password').clear('a');
      cy.get('#password').type('admin');
      cy.get('.linear').click();
      cy.get('.userprofileCard-modal-content > button').click();
      cy.get('.h-\\[450px\\]').should('have.text', 'Icon description참여한 프로젝트가 없습니다!!👻Icon description');
      cy.get('.\\!z-5').should('have.text', '🆕Recent Release Note작성된 릴리즈 노트가 없습니다..😭');
      cy.get('.cursor-pointer > b').should('have.text', '함건욱');
      cy.get('.text-black-400').should('have.text', '참여한 프로젝트가 없습니다!!👻');
      cy.get('.w-\\[100\\%\\]').should('have.text', '작성된 릴리즈 노트가 없습니다..😭');
      cy.get('.justify-between > div.flex > .ml-4').click();
      cy.get('.h-\\[450px\\] > :nth-child(2) > :nth-child(1) > .flex').should(
         'have.text',
         '구독한 프로젝트가 없습니다!!👻',
      );
      /* ==== End Cypress Studio ==== */
   });

   /* ==== Test Created with Cypress Studio ==== */
   it('회원정보(비밀번호, 부서) 수정 테스트', function () {
      /* ==== Generated with Cypress Studio ==== */
      cy.visit('localhost:3000');
      cy.get('#email').clear('gkarjsdnr@xptmxm.com');
      cy.get('#email').type('gkarjsdnr@xptmxm.com');
      cy.get('#password').clear('ad');
      cy.get('#password').type('admin');
      cy.get('.linear').click();
      cy.get(':nth-child(6) > :nth-child(1) > :nth-child(1) > .flex > .cursor-pointer').click();
      cy.get('.text-gray-800').click();
      cy.get('.pt-5s').click();
      cy.get('.info > h3').should('have.text', 'Information');
      cy.get('.info > h3').should('be.visible');
      cy.get('.right').should('be.visible');
      cy.get('.mt-1').should('be.visible');
      cy.get('.mt-1').should('have.text', '우리 누리');
      cy.get('.info_data > :nth-child(1)').should('have.text', 'Email');
      cy.get('.info_data > :nth-child(2) > h4').should('have.text', 'Password');
      cy.get(':nth-child(2) > .mr-2').click();
      cy.get('.mb-4 > .w-full').clear('a');
      cy.get('.mb-4 > .w-full').type('admin2');
      cy.get('.flex > .rounded-md').click();
      cy.get('.projects_data > :nth-child(1) > select').select('Department 3');
      cy.get('.pt-5s').click();
      cy.get('.flex > .mr-2').click();
      cy.get('.cursor-pointer > b').click();
      cy.get('.ml-4 > .mt-3').click();
      cy.get('#email').clear('gkarjsdnr@xptmxm.com');
      cy.get('#email').type('gkarjsdnr@xptmxm.com');
      cy.get('#password').clear('ad');
      cy.get('#password').type('admin');
      cy.get('.linear').click();
      cy.get('.mx-auto.min-h-screen > .relative').click();
      cy.get('#password').clear();
      cy.get('#password').type('admin2');
      cy.get('.linear').click();
      cy.get(':nth-child(6) > :nth-child(1) > :nth-child(1) > .flex > .cursor-pointer').click();
      cy.get('.text-gray-800').click();
      cy.get('.projects_data > :nth-child(1) > select').should('have.attr', 'name', 'department');
      /* ==== End Cypress Studio ==== */
   });

   /* ==== Test Created with Cypress Studio ==== */
   it('프로젝트 생성 테스트', function () {
      cy.visit('localhost:3000');
      /* ==== Generated with Cypress Studio ==== */
      cy.get('#email').clear('gkarjsdnr@xptmxm.com');
      cy.get('#email').type('gkarjsdnr@xptmxm.com');
      cy.get('#password').clear('a');
      cy.get('#password').type('admin');
      cy.get('.linear').click();
      cy.get('.userprofileCard-modal-content > button').click();
      cy.get('.text-black').click();
      cy.get('#projectName').clear('1');
      cy.get('#projectName').type('1');
      cy.get('#description').clear('1');
      cy.get('#description').type('1');
      cy.get('.dark\\:hover\\:bg-navy-300').click();
      cy.get('.bg-white-400 > .ml-5').should('have.text', '1');
      cy.get('.bottom-\\[1\\%\\] > .text-xl').click();
      cy.get('.dark\\:hover\\:bg-red-800').click();
      cy.get('.mt-4 > :nth-child(1)').click();
      /* ==== End Cypress Studio ==== */
   });

   /* ==== Test Created with Cypress Studio ==== */
   it('프로젝트 관리', function () {
      /* ==== Generated with Cypress Studio ==== */
      cy.visit('localhost:3000');
      cy.get('#email').clear('gkarjsdnr@xptmxm.com');
      cy.get('#email').type('gkarjsdnr@xptmxm.com');
      cy.get('#password').clear('a');
      cy.get('#password').type('admin');
      cy.get('.linear').click();
      cy.get('select').select('Department 2');
      cy.get('.userprofileCard-modal-content > button').click();
      cy.get('.text-black').click();
      cy.get('form').click();
      cy.get('#projectName').clear('1');
      cy.get('#projectName').type('1');
      cy.get('#description').clear('1');
      cy.get('#description').type('1');
      cy.get('.ml-3').should('have.text', 'Department 2');
      cy.get(':nth-child(1) > .flex > .dark\\:bg-gray-800').clear('이');
      cy.get(':nth-child(1) > .flex > .dark\\:bg-gray-800').type('이');
      cy.get(':nth-child(5) > .ml-40').should('have.text', '추천하는 팀원이승섭+');
      cy.get('.dark\\:hover\\:bg-navy-300').click();
      cy.visit('http://localhost:3000/admin/default');
      cy.get('.mt-8 > .font-normal').click();
      cy.get('[href="/admin/default"] > .relative > .my-\\[3px\\] > div > .leading-1').click();
      cy.get('.bottom-\\[1\\%\\] > .text-xl').click();
      cy.get('form > :nth-child(5) > :nth-child(1)').click();
      cy.get(':nth-child(1) > .flex > .dark\\:bg-gray-800').clear('d');
      cy.get(':nth-child(1) > .flex > .dark\\:bg-gray-800').type('이');
      cy.get('.mb-2 > .dark\\:hover\\:bg-gray-700').click();
      cy.get('.bottom-\\[1\\%\\] > .text-xl').click();
      cy.get('.dark\\:hover\\:bg-red-800').click();
      cy.get('.mt-4 > :nth-child(1)').click();
      /* ==== End Cypress Studio ==== */
   });
});
