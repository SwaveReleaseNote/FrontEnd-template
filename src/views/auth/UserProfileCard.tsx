import React, { useState, useEffect, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfileCard.css';
// import { getCookie } from './cookie';
import api from 'context/api';

function UserProfileCard(): ReactElement {
   const navigate = useNavigate();
   const [userName, setUserName] = useState(localStorage.getItem('name'));
   const [email, setEmail] = useState(localStorage.getItem('department'));
   const [phone, setPhone] = useState('0001-213-998761');
   const [department, setDepartment] = useState(localStorage.getItem('department'));
   const [mostViewed, setMostViewed] = useState('dolor sit amet.');

   useEffect(() => {
   //  const emailCookieKey = localStorage.getItem('email') as string;
      if (localStorage.getItem('token') == null) {
         navigate('/auth/sign-in');
      } else {
         console.log(localStorage.getItem('department'));
         if (localStorage.getItem('department') === 'null') {
            console.log('showdepartment');
         }
         try {
            setUserName(localStorage.getItem('name'));
            setEmail(localStorage.getItem('email'));
            setDepartment(localStorage.getItem('department'));
         } catch (error) {
            alert('재로그인해주세요.');
            navigate('/auth');
            console.error(error);
         }
      }
   }, []);
   const handleUserUpdateFormSubmit = (event: React.FormEvent): void => {
      event.preventDefault();
      console.log(userName, email, phone, department, mostViewed);
      api.put('user', {
         name: userName,
         email: email,
         phone: phone,
         department: department,
         mostViewed: mostViewed,
      })
         .then(response => {
            console.log(response.data); // Process the response as needed
            localStorage.setItem('name', userName ?? '');
            localStorage.setItem('email', email ?? '');
            localStorage.setItem('department', department ?? '');
            setUserName(localStorage.getItem('name'));
            setEmail(localStorage.getItem('email'));
            setDepartment(localStorage.getItem('department'));
            alert('Save Complete');
         })
         .catch(error => {
            console.error(error);
            // Handle error cases here
         });
      console.log('Form submitted');
   };

   const handleChangeUserInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;

      switch (name) {
         case 'name':
            setUserName(value);
            break;
         case 'email':
            setEmail(value);
            break;
         case 'phone':
            setPhone(value);
            break;
         case 'mostViewed':
            setMostViewed(value);
            break;
         default:
            break;
      }
   };
   const handleSelectUserDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const { value } = event.target;
      setDepartment(value);
   };

   /* 유저 삭제 */
   const handleClickButtonDeleteUser = (): void => {
      console.log(localStorage.getItem('token'));
      api.delete('user')
         .then(response => {
            console.log(response.data); // Process the response as needed
            // Navigate to the authentication page or perform other necessary actions
            navigate('/auth');
         })
         .catch(error => {
            console.error(error);
            // Handle error cases here
         });
   };

   /* department 설정 */
   const [showPasswordChangeModal, setShowPasswordChangeModal] = React.useState(false);
   const [password, setPassword] = React.useState('');

   const handlePasswordChangeModalButton = (): void => {
      setShowPasswordChangeModal(!showPasswordChangeModal);
   };

   const handleClickChangePasswordFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      // Handle forgot password form submission
      console.log(password);
      api.patch('http://61.109.214.110:80/api/user/password', {
         password: password,
      })
         .then(response => {
            // Handle successful response
            console.log(response.data);
            setShowPasswordChangeModal(!showPasswordChangeModal);
         })
         .catch(error => {
            // Handle error
            console.error(error);
         });
   };

   const handleChnagePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value);
   };
   const handleModalClose = (): void => {
      setShowPasswordChangeModal(false);
   };
   const headingStyles: React.CSSProperties = {
    marginTop: '45px',
    marginBottom: '5px',
    fontSize: '25px',
    font: "bold",
    color: '#212121'
  };

   return (
      <>
         <form onSubmit={handleUserUpdateFormSubmit}>
            <div className="wrapper h-full w-full" style={{ paddingTop: '10px' }}>
              <div className='left'>
               <div className="profilecard">
                <div className="profilecardavatar"></div>
                  <h3 style={headingStyles}>Name</h3>
                  <input
                     type="text"
                     name="name"
                     value={userName ?? ''}
                     onChange={handleChangeUserInputChange}
                     style={{
                        background: '#FAFAFA',
                        textAlign: 'center',
                     }}
                  />
                  </div>
                  </div>
               <div className="right">
                  <div className="info">
                     <h3>Information</h3>
                     <div className="info_data">
                        <div className="data">
                           <h4>Email</h4>
                           <input
                              type="text"
                              name="email"
                              value={email ?? ''}
                              onChange={handleChangeUserInputChange}
                              size={30}
                           />
                        </div>
                        <div className="data">
                           <h4>Password</h4>
                           <button
                              type="button"
                              className="mr-2 text-red-600"
                              onClick={handlePasswordChangeModalButton}>
                              Password Change
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="projects">
                     <h3>Project</h3>
                     <div className="projects_data">
                        <div className="data">
                           <h4>Department</h4>
                           <select
                              name="department"
                              value={department ?? ''}
                              onChange={handleSelectUserDepartmentChange}>
                              <option value="Department 1">Department 1</option>
                              <option value="Department 2">Department 2</option>
                              <option value="Department 3">Department 3</option>
                              <option value="인사">인사</option>
                              <option value="개발">개발</option>
                              <option value="전략기획">전략기획</option>
                           </select>
                        </div>
                        <div className="data">
                           <h4>Most Viewed</h4>
                           <input
                              type="text"
                              name="mostViewed"
                              value={mostViewed}
                              onChange={handleChangeUserInputChange}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex justify-end">
                     <button type="submit" className="mr-2">
                        Save
                     </button>
                     <div className="ml-auto">
                        <button type="button" onClick={handleClickButtonDeleteUser} className="text-red-600">
                           Delete User
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </form>
         {showPasswordChangeModal && (
            <div className="userprofileCard-modal-overlay">
               <div className="userprofileCard-modal-content">
                  <span className="userprofileCard-close" onClick={handleModalClose}>
                     &times;
                  </span>
                  <div className="mb-6 flex items-start justify-between">
                     <h3 className="text-xl font-semibold">Change Password</h3>
                     <button onClick={handlePasswordChangeModalButton} className="text-gray-500 hover:text-gray-700">
                        <svg
                           className="h-6 w-6"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </div>
                  {/* Department selection options */}
                  <div className="modal-body">
                     <form onSubmit={handleClickChangePasswordFormSubmit}>
                        {/* Forgot password form */}
                        <div className="mb-4">
                           <input
                              type="password"
                              className="w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter your password"
                              onChange={handleChnagePasswordInputChange}
                              required
                           />
                        </div>
                        <div className="flex justify-end">
                           <button
                              type="submit"
                              className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
                              Submit
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default UserProfileCard;
