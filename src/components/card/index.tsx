import React from 'react';

const Card: React.FC<{
   variant?: string;
   extra?: string;
   children?: JSX.Element | any[];
   [x: string]: any;
}> = props => {
   const { variant, extra, children, ...rest } = props;
   return (
      <div
         className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ${
            extra ?? ''
         }`}
         {...rest}>
         {children}
      </div>
   );
};

export default Card;
