import React from "react";
import logo from "../../assets/images/code-collab-logo.svg";

type THeader = {
  isHome?: boolean;
};

const Header = ({ isHome }: THeader) => {
  return (
    <header className="bg-zinc-900 text-white ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="code collab logo" />
            </a>
          </div>
          {!isHome && (
            <div className="flex items-center gap-7">
              <div className="relative">
                <span className="absolute -right-2 -top-2 rounded-full w-6 text-center p-1 bg-white text-black text-xs">
                  4
                </span>
                <button className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-gray-600 rounded-sm p-3 font-semibold ease-in duration-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="19"
                    fill="none"
                  >
                    <path
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17 15.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 11 18c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 5 15.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 11 9.75a5.995 5.995 0 0 0-5.058 2.772M5 15.719a8.986 8.986 0 0 1-3.74-.478 3 3 0 0 1 4.681-2.72m-.94 3.198a5.971 5.971 0 0 1 .94-3.197M14 3.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                  Collaborators
                </button>
              </div>
              <button className="bg-red-600 hover:bg-opacity-10 bg-opacity-25 rounded-sm py-3 px-6 text-red-600 font-semibold ease-in duration-75">
                Leave
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
