import React, { useState, useCallback, useEffect, ReactElement } from 'react';
import UserProfileCard from './UserProfileCard';
import axios from 'axios';

function MyPage(): ReactElement {
  return (
    <>
    <UserProfileCard />
    </>
  );
};
export default MyPage;