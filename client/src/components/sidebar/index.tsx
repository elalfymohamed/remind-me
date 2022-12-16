import * as React from "react";

import Link from "next/link";
import Image from "next/image";

//  hooks react
const { useEffect, useState, useRef } = React;

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content"></div>
    </aside>
  );
};
