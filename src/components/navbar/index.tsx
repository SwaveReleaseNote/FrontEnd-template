import Dropdown from 'components/dropdown';
import { FiAlignJustify, FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import imageSrc from 'assets/img/layout/Navbar.png';
import { BsArrowBarUp } from 'react-icons/bs';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { IoMdNotificationsOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import React, { useState, useEffect } from 'react';
import api from 'context/api';
import { useQueryClient } from 'react-query';

interface Notice {
   title: string;
   message: string;
}

const Navbar = (props: { onOpenSidenav: () => void; brandText: string; secondary?: boolean | string }): JSX.Element => {
   const navbarimage = imageSrc as string;
   const { onOpenSidenav, brandText } = props;
   const [darkmode, setDarkmode] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const handleKeyDownSearchInput = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
      if (event.key === 'Enter') {
         try {
            await queryClient.refetchQueries(['searchResults', searchTerm]).then(() => {
               console.log('refetch projects');
               console.log('searchTerm', searchTerm);
            });
         } catch (error) {
            console.error(error);
         } finally {
            navigate('/admin/project/searchResult', {
               state: {
                  searchTerm: searchTerm,
               },
            });
            setSearchTerm('');
         }
      }
   };

   const handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(event.target.value);
   };

   /* 알림 */
   const [notificationMessage, setNotificationMessage] = useState([
      {
         title: '',
         message: '',
      },
   ]);
   const [inputText, setInputText] = useState({
      title: '',
      message: '',
   });

   const noticeList: Notice[] = [];
   const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
   const handleNotificationButtonClick = async (): Promise<Notice[]> => {
      // Toggle the visibility of the notification dropdown
      setNotificationDropdownVisible(prevVisible => !prevVisible);
      if (notificationDropdownVisible) {
         setNotificationMessage([
            {
               title: '',
               message: '',
            },
         ]);
      } else {
         try {
            const topicName = localStorage.getItem('user_id') as string;
            const response = await api.get(`kafka/get-topic-all/${topicName}`);
            console.log(response.data);
            console.log(response.data.oldMessage);
            const newNotifications: Notice[] = [];
            for (const message of response.data.oldMessage) {
               try {
                  const messagejson = JSON.parse(message);
                  newNotifications.push({
                     title: messagejson.type,
                     message: messagejson.content,
                  });
               } catch (error) {
                  console.log('error');
               }
            }

            setNotificationMessage(prevNotifications => [...prevNotifications, ...newNotifications]);
         } catch (error: any) {
            console.error('Error fetching projects', error);
            return [
               {
                  title: 'New Update: Horizon UI Dashboard PRO',
                  message: 'A new update for your downloaded item is available!',
               },
               {
                  title: 'New Update: Horizon UI Dashboard PRO',
                  message: 'A new update for your downloaded item is available!',
               },
               {
                  title: 'New Update: Horizon UI Dashboard PRO',
                  message: 'A new update for your downloaded item is available!',
               },
            ];
         }
      }

      return noticeList;
   };
   useEffect(() => {
      if (inputText.title !== '' && inputText.message !== '') {
         console.log(inputText);
         setNotificationMessage(prevMessages => [
            ...prevMessages,
            {
               title: inputText.title,
               message: inputText.message,
            },
         ]);
         setInputText({
            title: '',
            message: '',
         });
      }
   }, [inputText]);
   return (
      <nav className="mb-5 sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
         <div className="ml-[6px]">
            <div className="h-6 w-[224px] pt-1">
               <a
                  className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                  href=" ">
                  Pages
                  <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white"> / </span>
               </a>
               <Link
                  className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                  to="#">
                  {brandText}
               </Link>
            </div>
            <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
               <Link to="#" className="font-bold capitalize hover:text-navy-700 dark:hover:text-white">
                  {brandText}
               </Link>
            </p>
         </div>

         <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[500px] xl:gap-2">
            <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
               <p className="pl-3 pr-2 text-xl">
                  <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
               </p>
               <input
                  value={searchTerm}
                  onChange={handleChangeSearchInput}
                  onKeyDown={() => handleKeyDownSearchInput}
                  type="text"
                  placeholder="프로젝트 검색..."
                  className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
               />
            </div>
            <span
               className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
               onClick={onOpenSidenav}>
               <FiAlignJustify className="h-5 w-5" />
            </span>

            {/* start Notification */}
            <Dropdown
               button={
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  <p className="cursor-pointer" onClick={handleNotificationButtonClick}>
                     <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
                  </p>
               }
               animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
               classNames={'py-2 top-4 -left-[230px] md:-left-[440px] w-max'}>
               <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
                  <div className="flex items-center justify-between">
                     <p className="text-base font-bold text-navy-700 dark:text-white">Notification</p>
                     <p className="text-sm font-bold text-navy-700 dark:text-white">Mark all read</p>
                  </div>
                  <div className="overflow-y-auto max-h-[300px]">
                     {' '}
                     {/* Add scrolling container */}
                     {notificationMessage.map(
                        (notification, index) =>
                           notification.title !== '' &&
                           notification.message !== '' && (
                              <button key={index} className="flex w-full items-center">
                                 <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                                    <BsArrowBarUp />
                                 </div>
                                 <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                                    <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                                       {notification.title}
                                    </p>
                                    <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                                       {notification.message}
                                    </p>
                                 </div>
                              </button>
                           ),
                     )}
                  </div>
               </div>
            </Dropdown>

            {/* start Horizon PRO */}
            <Dropdown
               button={
                  <p className="cursor-pointer">
                     <IoMdInformationCircleOutline className="h-4 w-4 text-gray-600 dark:text-white" />
                  </p>
               }
               animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
               classNames={'py-2 top-8 -left-[180px] w-max'}>
               <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                  <div
                     style={{
                        backgroundImage: `url(${navbarimage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                     }}
                     className="mb-2 aspect-video w-full rounded-lg"
                  />
                  <a
                     target="blank"
                     href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
                     className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold text-white transition duration-200 hover:bg-brand-600 hover:text-white active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200">
                     Buy Horizon UI PRO
                  </a>
                  <a
                     target="blank"
                     href="https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-free-tailwind-react"
                     className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10">
                     See Documentation
                  </a>
                  <a
                     target="blank"
                     href="https://horizon-ui.com/?ref=live-free-tailwind-react"
                     className="hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700 dark:text-white dark:hover:text-white">
                     Try Horizon Free
                  </a>
               </div>
            </Dropdown>

            {/* start Dark Mode */}
            <div
               className="cursor-pointer text-gray-600"
               onClick={() => {
                  if (darkmode) {
                     document.body.classList.remove('dark');
                     setDarkmode(false);
                  } else {
                     document.body.classList.add('dark');
                     setDarkmode(true);
                  }
               }}>
               {darkmode ? (
                  <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
               ) : (
                  <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
               )}
            </div>

            {/* Profile & Dropdown */}
            <Dropdown
               button={
                  <div className="flex w-full flex-col gap-2 rounded-[20px]">
                     <div className="flex w-full flex-col gap-2 rounded-[20px]">
                        <p className="cursor-pointer overflow-break dark:text-white">
                           Hello <b>{localStorage.getItem('name')}</b> 👻⚙️
                        </p>
                     </div>
                  </div>
               }
               classNames={'py-2 top-8 -left-[180px] w-max'}>
               <div className="ml-40 flex h-[135px] w-[135px] flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                  <div className="ml-5 mt-3">
                     <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                           👋 Hey, <b>{localStorage.getItem('name')}</b>
                        </p>{' '}
                     </div>
                  </div>
                  <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

                  <div className="ml-4 mt-3 flex flex-col">
                     <div
                        onClick={() => {
                           navigate('/admin/MyPage');
                        }}
                        className="hover:cursor-pointer text-sm text-gray-800 dark:text-white hover:dark:text-white">
                        My Page
                     </div>
                     <div
                        onClick={() => {
                           navigate('/user/logout');
                        }}
                        className="hover:cursor-pointer mt-3 text-sm font-medium text-red-500 hover:text-red-500">
                        Log Out
                     </div>
                  </div>
               </div>
            </Dropdown>
         </div>
      </nav>
   );
};

export default Navbar;
