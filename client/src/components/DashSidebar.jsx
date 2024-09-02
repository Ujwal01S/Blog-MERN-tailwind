import React, {useState, useEffect} from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux';
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import { Link , useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';



const DashSidebar = () => {

    const {currentUser} = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if(tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  const handleSignOut = async() => {
    try {
      const res = await fetch(`api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signOutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className='w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup className='flex flex-col gap-2 '>
                {currentUser && currentUser.isAdmin && (
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
                        label = {currentUser.isAdmin ? 'Admin' : 'User'}
                        as = 'div'
                        >
                            Profile
                        </SidebarItem>  
                    </Link>

                  {currentUser.isAdmin && (
                    <Link to = '/dashboard?tab=posts'>
                      <SidebarItem 
                      active= {tab === 'posts'}
                      icon = {HiDocumentText}
                      as= 'div'
                      >
                        Posts
                      </SidebarItem>
                    </Link>
                  )}

                  {currentUser.isAdmin && (
                    <>
                    <Link to = '/dashboard?tab=users'>
                      <SidebarItem 
                      active= {tab === 'users'}
                      icon = {HiOutlineUserGroup}
                      as= 'div'
                      >
                        Users
                      </SidebarItem>
                    </Link>

                    <Link to = '/dashboard?tab=comments'>
                      <SidebarItem 
                      active= {tab === 'comments'}
                      icon = {HiAnnotation}
                      as= 'div'
                      >
                        Comments
                      </SidebarItem>
                    </Link>
                    
                    </>
                  )}


                <SidebarItem
                icon = {HiArrowSmRight}
                className = 'cursor-pointer'
                onClick = {handleSignOut}
                >Sign Out</SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar