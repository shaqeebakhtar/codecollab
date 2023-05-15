import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/code-collab-logo.svg";
import Collaborator from "./Collaborator";

type THeaderProps = {
  isHome?: boolean;
};

const Header = ({ isHome }: THeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const onLeave = () => {
    navigate("/");
  };

  return (
    <header className="bg-zinc-900 text-white">
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="code collab logo" />
            </a>
          </div>
          {!isHome && (
            <div className="flex items-center gap-7">
              <Collaborator
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
              />

              <button
                onClick={onLeave}
                className="bg-red-600 hover:bg-opacity-10 bg-opacity-25 rounded-sm py-3 px-6 text-red-600 font-semibold ease-in duration-75"
              >
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
