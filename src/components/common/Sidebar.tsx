"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ButtonBase,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetTechnologiesQuery } from "../../services/api";
import { Technology } from "../../types";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const pathname = usePathname();
  const { data, error, isLoading } = useGetTechnologiesQuery();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const uniqueCategories = Array.from(
        new Set(data.map((tech: Technology) => tech.category))
      );
      setCategories(uniqueCategories);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
      }}
    >
      <List>
        <Link href="/all?view=tables" passHref legacyBehavior>
          <ButtonBase
            component="a"
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              padding: "10px 16px",
              display: "block",
              textAlign: "left",
              ...(pathname === "/all" && {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              }),
            }}
            onClick={toggleSidebar}
          >
            <ListItem button selected={pathname === "/all"}>
              <ListItemText primary="All" />
            </ListItem>
          </ButtonBase>
        </Link>
        {categories.map((category) => {
          const href = `/${category.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <Link
              key={category}
              href={`${href}?view=tables`}
              passHref
              legacyBehavior
            >
              <ButtonBase
                component="a"
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  padding: "10px 16px",
                  display: "block",
                  textAlign: "left",
                  ...(pathname === href && {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  }),
                }}
                onClick={toggleSidebar}
              >
                <ListItem button selected={pathname === href}>
                  <ListItemText primary={category} />
                </ListItem>
              </ButtonBase>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
