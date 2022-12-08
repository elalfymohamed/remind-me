import * as React from "react";

import Link from "next/link";

import Cookies from "js-cookie";

import { userData } from "../../utility/userData";

type UserData = {
  first_name: string;
  last_name: string;
};

export const Header = () => {
  const user = userData() as UserData;

  const handelLogOut = () => {
    Cookies.remove("authorization");
    window.location.href = "/";
  };

  return (
    <header className="App-header">
      <div className="header-nav">
        <div className="nav-container">
          <h4>Add Task</h4>

          <ul className="nav-items">
            <li>
              <div className="nav-user">
                <h6>
                  {user?.first_name} {user?.last_name}
                </h6>
              </div>
            </li>
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/recently" className="nav-link">
                Recently
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-login"
                onClick={handelLogOut}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
