import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export default function NavbarSection() {
  const { userData, setUserToken } = useContext(authContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/signin");
  }

  return (
    <Navbar maxWidth="xl" className="shadow-md">
      {/* LOGO */}
      <NavbarBrand>
        <Link to="/">
          <p className="font-bold text-xl text-primary-700">CIRCLE</p>
        </Link>
      </NavbarBrand>

      {/* RIGHT SIDE */}
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={userData?.name}
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="primary" onClick={logout}>
              {userData?.email}
            </DropdownItem>
            <DropdownItem key="profile">
              <Link to="/profile">
                <p className="font-semibold text-primary">Profile</p>
              </Link>
            </DropdownItem>
            <DropdownItem key="profile">
              <Link to="/setting">
                <p className="font-semibold text-gray-400">Setting</p>
              </Link>
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
