import React, { useEffect, useState } from 'react';
import PersistentNavigation from '../reusableComponents/persistentNavigation';
import DrawerNavigation from '../reusableComponents/drawerNavigation';
import { useLocation } from 'react-router-dom'


const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;
 
  
/* function useCurrentWidth() {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
    window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return width;
}  */



export default function Navigation (props) {
    let [width, setWidth] = useState(getWidth());
    const location = useLocation()
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => { 
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        }
       
    }, []) ;

    const checkForAuthRoutes = ()=>{
        let isAuthRoute = false
        let authRoutes = ['/login', '/forgotPassword', '/resetPassword']
    
        authRoutes.map( route =>{
            if( location.pathname.startsWith(route)){
                isAuthRoute = true
            }
        })
        return isAuthRoute
    }

    return (
        <>
            {
                
                width >= 768 ?
                <div className={checkForAuthRoutes() ? "d-none" : "" }>  
                    <PersistentNavigation>
                        {props.children}
                    </PersistentNavigation>
                </div> :
                <div className={checkForAuthRoutes() ? "d-none" : "" }>  
                    <DrawerNavigation>
                        {props.children}
                    </DrawerNavigation>
                </div>
            }
        </>
    )
} 