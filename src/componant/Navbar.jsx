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
          <p className="font-bold text-xl text-primary">CIRCLE</p>
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
              src={userData?.photo || "https://i.pravatar.cc/150"}
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <Link to="/profile">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-primary">{userData?.email}</p>
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
