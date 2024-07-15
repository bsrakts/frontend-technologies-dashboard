"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ButtonBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetTechnologiesQuery } from "../../services/api";
import { Technology } from "../../types";
import { CircleNotificationsSharp } from "@mui/icons-material";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data } = useGetTechnologiesQuery();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = data
    ? Array.from(new Set(data.map((tech: Technology) => tech.category)))
    : [];

  const currentPath = pathname ? pathname.split("/")[1] : "all";

  return (
    <>
      <AppBar position="static" color="transparent" className="!shadow-sm">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className="font-mono text-gray-900 flex items-center w-full justify-center gap-x-2 text-sm md:text-2xl ml-16"
            sx={{ flexGrow: 1 }}
          >
            <CircleNotificationsSharp />
            Frontend Technologies
          </Typography>
          <ButtonBase>
            <Link
              href={`/${currentPath ? currentPath : "all"}?view=charts`}
              passHref
              legacyBehavior
            >
              <Typography variant="button" className="mr-2">
                Chart
              </Typography>
            </Link>
          </ButtonBase>
          <ButtonBase>
            <Link
              href={`/${currentPath ? currentPath : "all"}?view=tables`}
              passHref
              legacyBehavior
            >
              <Typography variant="button">Table</Typography>
            </Link>
          </ButtonBase>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <List>
          <Link href="/all?view=tables" passHref legacyBehavior>
            <ListItem button selected={currentPath === "all"}>
              <ListItemText primary="All" />
            </ListItem>
          </Link>
          {menuItems.map((category) => {
            const href = `/${category.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Link
                key={category}
                href={`${href}?view=tables`}
                passHref
                legacyBehavior
              >
                <ListItem button selected={currentPath === href.split("/")[1]}>
                  <ListItemText primary={category} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
