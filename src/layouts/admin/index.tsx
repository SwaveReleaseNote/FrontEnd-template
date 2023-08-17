/*eslint-disable*/
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';
import routes from 'routes';
import ProjectDashboard from 'views/admin/default/pages/ProjectDashboard';
import EventSourceComponent from '../../views/auth/EventSourceComponent';
import { useRecoilValue } from 'recoil';
import {noteFieldState} from "../../context/atom";
import ReleaseNote from "../../views/admin/marketplace";
import {deactivateStompClient} from "../../views/auth/stompClientUtils";


export default function Admin(props: Record<string, any>): JSX.Element {
   const { ...rest } = props;
   const location = useLocation();
   const [open, setOpen] = React.useState(false);
   const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');


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
      const note = useRecoilValue(noteFieldState)

      return routes.map((prop, key) => {
         if (prop.layout === '/admin') {
            if (prop.path === 'dashboard/:projectId/:role') {
               return <Route path={`/${prop.path}`} element={<ProjectDashboard />} key={key} />;
            }
            else if (prop.path === "release-note") {
               return <Route path={`/${prop.path}`+"/"+note.releaseNoteId} element={<ReleaseNote />}/>
            }
            else {
               return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
            }
         } else {
            return null;
         }
      });
   };


   document.documentElement.dir = 'ltr';

   window.addEventListener('unload', event => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (window.PerformanceNavigationTiming) {
         const perfNavigation = window.performance.getEntriesByType('navigation')[0];
         const entriesNavigationTiming = perfNavigation as PerformanceNavigationTiming;
         if (entriesNavigationTiming.type !== 'reload' && entriesNavigationTiming.type !== 'navigate') {
            deactivateStompClient();
         }
      }

  
   });

   
   return (
      <>
      <EventSourceComponent />
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
