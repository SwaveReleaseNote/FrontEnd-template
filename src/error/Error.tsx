/* eslint-disable import/no-duplicates */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import img404 from '../assets/img/error/404.jpg';
import img400 from '../assets/img/error/400.jpg';
import img401 from '../assets/img/error/401.png';
import imgErrNetwork from '../assets/img/error/500.jpg';

const Error = (): JSX.Element => {
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const status = searchParams.get('status');

   const statusToImageMap: Record<string, string> = {
      '400': img400,
      '405': img400,
      '404': img404,
      '401': img401,
      ERR_NETWORK: imgErrNetwork,
   };

   const [imageUrl, setImageUrl] = useState<string>(imgErrNetwork);

   useEffect(() => {
      console.log('status: ', status);
      if (status !== null) {
         if (statusToImageMap[status] != null) {
            setImageUrl(statusToImageMap[status]);
            console.log('imageUrl: ', imageUrl);
         }
      }
   }, []);

   return (
      <div className="flex justify-center items-center">
         <img src={imageUrl} alt={imageUrl} className="w-[70%]" />
      </div>
   );
};

export default Error;
