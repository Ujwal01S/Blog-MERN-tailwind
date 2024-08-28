import React from 'react'
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput} from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);

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
    <div>
        <Navbar className='border-b-2'>
            <Link to='/' 
            className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Anoymous
                </span> Blog
            </Link>
            <form>
            <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={IoIosSearch}
                className='hidden lg:inline'
            />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill> {/*  This is for small screen hidden for largescreen */}
                <IoIosSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>
                <button 
                className='w-12 h-10 hidden sm:inline'
                color='gray'
                pill
                >
                    <FaMoon />
                </button>

                {currentUser ? (
                    <Dropdown
                    arrowIcon= {false}
                    inline
                    label = {
                        <Avatar alt = 'user' img={currentUser.profilePicture} rounded />
                    }
                    >
                        <DropdownHeader>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to = {'/dashboard?tab=profile'}>
                            <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <DropdownDivider />
                        <DropdownItem onClick={handleSignOut}>SignOut</DropdownItem>
                    </Dropdown>
                ) : (
  
                    <Link to = '/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' outline> {/*  flowbite properties */}
                            Sign In
                    </Button>
                </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active= {path === '/'} as={'div'}>
                    <Link to = '/'>Home</Link>
                </Navbar.Link>

                <Navbar.Link active= {path === '/about'} as={'div'}>
                <Link to = '/about'>About</Link>
                </Navbar.Link>

                <Navbar.Link active= {path === '/projects'} as={'div'}>
                <Link to = '/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    </div>
  )
}

export default Header