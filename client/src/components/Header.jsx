import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Anoymous
          </span>{" "}
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={IoIosSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          {" "}
          {/*  This is for small screen hidden for largescreen */}
          <IoIosSearch />
        </Button>

        <div className="flex gap-2 md:order-2">
                <Button
                    className="w-12 h-10 hidden sm:inline"
                    color="gray"
                    pill
                    onClick={() => dispatch(toggleTheme())}
                >

                    { theme === "light" ?  <FaSun/> : <FaMoon/>}
                </Button>

          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </DropdownHeader>
              <Link to={"/dashboard?tab=dash"}>
                <DropdownItem>Dashboard</DropdownItem>
              </Link>
              <DropdownDivider />
              <Link to={"/dashboard?tab=profile"}>
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={handleSignOut}>SignOut</DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                {" "}
                {/*  flowbite properties */}
                Sign In
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/dashboard?tab=dash"} as={"div"}>
            <Link to="/dashboard?tab=dash">Dashboard</Link>
          </Navbar.Link>

          {/* /dashboard?tab=dash */}

          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
