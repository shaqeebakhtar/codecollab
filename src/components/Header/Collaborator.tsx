import Avatar from "react-avatar";
import { useToast } from "@chakra-ui/toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

type TClients = {
  socketId: string;
  collaboratorName: string;
};

type CollaboratorProps = {
  clients?: TClients[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (prev: (prev: boolean) => boolean) => void;
};

const Collaborator = ({
  clients,
  isDropdownOpen,
  setIsDropdownOpen,
}: CollaboratorProps) => {
  const toast = useToast();
  const { editorRoomId, collaboratorName } = useSelector(
    (state: RootState) => state.editor
  );

  const editorName = collaboratorName;

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(editorRoomId);

    toast({
      title: "Room Id copied successfully",
      status: "success",
      isClosable: false,
    });
  };

  return (
    <div className="relative">
      <span className="absolute -right-2 -top-2 rounded-full w-6 text-center p-1 bg-white text-black text-xs">
        {clients?.length}
      </span>
      <button
        onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
        className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border-2 border-gray-600 rounded-sm p-3 font-semibold ease-in duration-75"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="19"
          fill="none"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 15.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 11 18c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 5 15.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 11 9.75a5.995 5.995 0 0 0-5.058 2.772M5 15.719a8.986 8.986 0 0 1-3.74-.478 3 3 0 0 1 4.681-2.72m-.94 3.198a5.971 5.971 0 0 1 .94-3.197M14 3.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
        Collaborators
      </button>

      {isDropdownOpen && (
        <div className="absolute z-50 w-80 top-14 right-0 bg-zinc-800 p-4 border-2 border-gray-600 rounded-sm drop-shadow-xl">
          <button
            className="flex items-center justify-center gap-2 bg-blue-600 w-full p-3 cursor-pointer font-semibold rounded-sm text-sm hover:bg-blue-700 ease-in duration-75"
            onClick={handleCopyRoomId}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
            >
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.055 3.24a1.876 1.876 0 0 0-1.805-1.365h-2.5c-.859 0-1.583.577-1.805 1.365m6.11 0c.046.162.07.333.07.51v0c0 .345-.28.625-.625.625h-5a.625.625 0 0 1-.625-.625v0c0-.177.024-.348.07-.51m6.11 0c.538.04 1.074.092 1.606.154.917.106 1.589.897 1.589 1.82V16.25c0 1.035-.84 1.875-1.875 1.875h-8.75A1.875 1.875 0 0 1 3.75 16.25V5.214c0-.923.672-1.714 1.589-1.82a40.184 40.184 0 0 1 1.606-.154"
              />
            </svg>
            Copy Invite Code
          </button>
          <span className="block w-full h-px bg-[#5d5d5d] mt-4"></span>
          <div className="max-h-48 mt-3 overflow-y-auto">
            {clients &&
              clients.map((client) => (
                <div
                  className="flex items-center gap-3 py-2"
                  key={client.socketId}
                >
                  <Avatar
                    name={client.collaboratorName}
                    size="36"
                    round="4px"
                    maxInitials={1}
                    textSizeRatio={2}
                  />
                  <p>
                    {client.collaboratorName}
                    <span className="text-xs font-semibold text-zinc-400">
                      {editorName === client.collaboratorName && " (You)"}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborator;
