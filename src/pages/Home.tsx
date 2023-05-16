import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  setCollaboratorName,
  setEditorRoomId,
  setNumberOfCollaborators,
} from "../redux/editorSlice";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({
    room_id: "",
    username: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateNewRoom = () => {
    const id = uuidv4();
    setRoomId(id);
  };

  const validateInputs = () => {
    setError({
      room_id: "",
      username: "",
    });

    if (!roomId) {
      setError((prev) => ({
        ...prev,
        room_id: "Room Id is required!",
      }));
      return false;
    }
    if (!username) {
      setError((prev) => ({
        ...prev,
        username: "Display name is required!",
      }));
      return false;
    }

    return true;
  };

  const handleJoinRoom = () => {
    if (!validateInputs()) return;
    dispatch(setEditorRoomId(roomId));
    dispatch(setCollaboratorName(username));
    dispatch(setNumberOfCollaborators(1));
    navigate(`/editor/${roomId}`);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") handleJoinRoom();
  };

  return (
    <>
      <Header isHome={true} />
      <div className="flex items-center justify-center bg-zinc-900 text-white h-[92vh]">
        <div className="w-full max-w-lg bg-zinc-900 ml-3 mr-3 p-8 rounded-sm border-2 border-gray-600">
          <h1 className="font-bold text-3xl mb-8">Join/Create Rooms</h1>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={(e) => handleEnter(e)}
            type="text"
            name="room-id"
            id="room-id"
            placeholder="Enter Room Id"
            className={
              !error.room_id
                ? "w-full p-3 rounded-sm border-2 border-gray-600 bg-zinc-800 outline-none focus:border-blue-600"
                : "w-full p-3 rounded-sm border-2 border-red-600 bg-zinc-800 outline-none focus:border-red-600"
            }
          />
          {error && (
            <span className="text-red-600 text-sm">{error.room_id}</span>
          )}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={(e) => handleEnter(e)}
            type="text"
            name="username"
            id="username"
            placeholder="Enter Name to be displayed"
            className={
              !error.username
                ? "w-full p-3 rounded-sm border-2 border-gray-600 bg-zinc-800 outline-none focus:border-blue-600 mt-4"
                : "w-full p-3 rounded-sm border-2 border-red-600 bg-zinc-800 outline-none focus:border-red-600 mt-4"
            }
          />
          {error && (
            <span className="text-red-600 text-sm">{error.username}</span>
          )}
          <button
            type="submit"
            onClick={handleJoinRoom}
            className="w-full p-3 rounded-sm font-semibold bg-blue-600 hover:bg-blue-700 ease-in duration-75 mt-6"
          >
            Join
          </button>
          <p className="text-sm text-right mt-4">
            Don't have a room id?{" "}
            <span
              className="underline cursor-pointer font-bold text-blue-600"
              onClick={handleCreateNewRoom}
            >
              Create Room
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
