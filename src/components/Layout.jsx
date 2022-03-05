import React from "react";
import { Menu } from "./Menu";

export const Layout = ({ children }) => {
  console.log(children);
  return (
    <div className="">
      <div className="flex justify-center items-center min-h-screen overflow-x-hidden	overflow-y-scroll">
        {children}
      </div>
      <Menu />
    </div>
  );
};
