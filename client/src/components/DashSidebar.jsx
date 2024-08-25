import React, {useState, useEffect} from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { useSelector } from 'react-redux';
import {HiChartPie, HiUser} from 'react-icons/hi';
import { Link , useLocation} from 'react-router-dom';


const DashSidebar = () => {

    const currentUser = useSelector(state => state.user);
    const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if(tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  return (
    <Sidebar className='w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup>
                {currentUser && (
                    <Link to='/dashboard?tab=dash'>
                        <SidebarItem
                        active = {tab === 'dash'}
                        icon = {HiChartPie}
                        as = 'div'
                        >
                            Dashboard
                        </SidebarItem>
                            
                        
                    </Link>
                )}
                <Link to='/dashboard?tab=profile'>
                        <SidebarItem
                        active = {tab === 'profile'}
                        icon = {HiUser}
                        label = 'User'
                        as = 'div'
                        >
                            Profile
                        </SidebarItem>
                            
                        
                    </Link>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar