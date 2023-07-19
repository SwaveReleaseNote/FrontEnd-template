import React, { useState, useCallback, useEffect, ReactElement } from 'react';
import UserProfileCard from './UserProfileCard';
import DepartmentSelect from './DepartmentSelect';
import axios from 'axios';
import { loginState } from './contexts/atom';
import { useRecoilState } from 'recoil';

function MyPage(): ReactElement {
  const [isLogined,setIsLogined] = useRecoilState(loginState);
  const [isDepartment,setIsDepartment] = useState(false);
  
  useEffect(()=>{
    console.log(isLogined.department);
    if(isLogined.department===null){
      setIsDepartment(true);
    }
  },[])
  return (
    <>
    <UserProfileCard />
    </>
  );
};
export default MyPage;