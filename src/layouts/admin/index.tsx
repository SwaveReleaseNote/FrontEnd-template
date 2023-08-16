import React, { useRef} from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';
import routes from 'routes';
import ProjectDashboard from 'views/admin/default/pages/ProjectDashboard';
import * as StompJs from '@stomp/stompjs';
import { getCookie } from '../../views/auth/cookie';
import api from 'context/api';

export default function Admin(props: Record<string, any>): JSX.Element {
   const { ...rest } = props;
   const location = useLocation();
   const [open, setOpen] = React.useState(false);
   const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');
   const client = useRef<StompJs.Client | null>(null);

   const disconnect = (): void => {
      console.log('disconnect');
      if (client.current == null || !client.current.connected) return;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      client.current.deactivate();
   };

   React.useEffect(() => {
      getActiveRoute(routes);
      console.log(location.pathname);
      if (location.pathname === '/admin/default') {
         setOpen(false);
      } else {
         setOpen(true);
      }
   }, [location.pathname]);
   React.useEffect(() => {
      console.log(open);
   }, [open]);

   const getActiveRoute = (routes: RoutesType[]): string | boolean => {
      const activeRoute = 'Main Dashboard';
      for (let i = 0; i < routes.length; i++) {
         if (window.location.href.includes(routes[i].layout + '/' + routes[i].path)) {
            setCurrentRoute(routes[i].name);
         }
      }
      return activeRoute;
   };

   const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
      const activeNavbar = false;
      for (let i = 0; i < routes.length; i++) {
         if (window.location.href.includes(routes[i].layout + routes[i].path)) {
            return (routes[i].secondary ?? false); // Provide a default value (false in this case)
         }
      }
      return activeNavbar;
   };

   const getRoutes = (routes: RoutesType[]): any => {
      return routes.map((prop, key) => {
         if (prop.layout === '/admin') {
            if (prop.path === 'dashboard/:projectId/:role') {
               return <Route path={`/${prop.path}`} element={<ProjectDashboard />} key={key} />;
            } else {
               return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
            }
         } else {
            return null;
         }
      });
   };


   React.useLayoutEffect(() => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (window.PerformanceNavigationTiming) {
         console.info('window.performance works fine on this browser');

         const perfNavigation = window.performance.getEntriesByType('navigation')[0];
         const entriesNavigationTiming = perfNavigation as PerformanceNavigationTiming;
         console.log(entriesNavigationTiming.type);
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         if (entriesNavigationTiming.type === 'reload') {
            console.log('reload type');
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            async function fetchData() {
               try {
                  const response = await api.get(`/user`)
   
                  // api의 응답을 제대로 받은 경우
                  /* axios 값 log 확인 */
                  console.log(response.data);
                  window.localStorage.setItem('state', 'true');
                  window.localStorage.setItem('name', response.data.username);
                  window.localStorage.setItem('email', response.data.email);
                  window.localStorage.setItem('info', '');
                  window.localStorage.setItem('department', response.data.department);
                  window.localStorage.setItem('token', getCookie('id'));
                  console.log(localStorage.getItem('email'));
   
                  client.current = new StompJs.Client({
                     brokerURL: 'ws://localhost:8080/ws-stomp',
                     // eslint-disable-next-line @typescript-eslint/no-empty-function
                     connectHeaders: {
                        Authorization: localStorage.getItem('token') ?? '',
                     },
                     onConnect: () => {
                        console.log('success');
                     },
                  });
                  client.current.activate();

               } catch (error) {
                  console.error(error);
                  // Handle error cases here
               }
            }

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetchData();
         }
      }
   }, []);

   document.documentElement.dir = 'ltr';

   window.addEventListener('unload', event => {
      disconnect();
      window.localStorage.clear();
      alert('정말 종료하시겠습니까?');
   });

   
   return (
      <>
         <div className="flex h-full w-full">
            {open ? (
               <Sidebar
                  open={open}
                  onClose={() => {
                     setOpen(false);
                  }}
               />
            ) : null}
            {/* Navbar & Main Content */}
            <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
               {/* Main Content */}
               <main
                  className={`mx-12 h-full flex-none transition-all md:pr-2 ${
                     open ? 'xl:ml-[313px]' : 'xl:ml-[150px]]'
                  }`}>
                  {/* Routes */}
                  <div className="h-full">
                     <Navbar
                        onOpenSidenav={() => {
                           setOpen(true);
                        }}
                        brandText={currentRoute}
                        secondary={getActiveNavbar(routes)}
                        {...rest}
                     />
                     <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                        <Routes>
                           {/* TODO: routes.tsx에 프로젝트 리스트 선택할 수 있도록 추가 */}
                           {getRoutes(routes)}

                           <Route path="/" element={<Navigate to="/admin/default" replace />} />
                        </Routes>
                     </div>
                     <div className="p-3">
                        <Footer />
                     </div>
                  </div>
               </main>
            </div>
         </div>
         
      </>
   );
}
