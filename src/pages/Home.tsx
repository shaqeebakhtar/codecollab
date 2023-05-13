import { useState } from "react";
import Header from "../components/Header/Header";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <Header isHome={true} />
      <div className="flex items-center justify-center bg-zinc-900 text-white h-[92vh]">
        <div className="w-full max-w-lg bg-zinc-900 ml-3 mr-3 p-8 rounded-sm border-2 border-gray-600">
          <h1 className="font-bold text-3xl mb-8">Join/Create Rooms</h1>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            type="text"
            name="room-id"
            id="room-id"
            placeholder="Enter Room Id"
            className="w-full p-3 rounded-sm border-2 border-gray-600 bg-zinc-800 outline-none focus:border-blue-600"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="Enter Name to be displayed"
            className="w-full p-3 rounded-sm border-2 border-gray-600 bg-zinc-800 outline-none focus:border-blue-600 mt-4"
          />
          <button className="w-full p-3 rounded-sm font-semibold bg-blue-600 hover:bg-blue-700 ease-in duration-75 mt-6">
            Join
          </button>
          <p className="text-sm text-right mt-4">
            Don't have a room id?{" "}
            <span className="underline cursor-pointer font-bold text-blue-600">
              Create Room
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
