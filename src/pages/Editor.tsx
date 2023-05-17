import { useEffect, useRef } from "react";
import CodeEditor from "../components/Editor/CodeEditor";
import InputArea from "../components/Editor/InputArea";
import OutputArea from "../components/Editor/OutputArea";
import Header from "../components/Header/Header";
import socketInit from "../socket";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import ACTIONS from "../actions";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Editor = () => {
  const socketRef = useRef<null | Socket<DefaultEventsMap, DefaultEventsMap>>(
    null
  );
  const navigate = useNavigate();
  const toast = useToast();
  const { editorRoomId, collaboratorName } = useSelector(
    (state: RootState) => state.editor
  );

  useEffect(() => {
    (async () => {
      const handleSocketError = (error: Error) => {
        console.log("Socket error", error);
        toast({
          title: "Unable to join room, try again",
          status: "error",
          isClosable: false,
        });
        navigate("/");
      };

      socketRef.current = await socketInit();

      socketRef.current.on("connect_error", (err) => handleSocketError(err));
      socketRef.current.on("connect_failed", (err) => handleSocketError(err));

      // emit join action
      socketRef.current.emit(ACTIONS.JOIN, { editorRoomId, collaboratorName });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, collaboratorName, socketId }) => {
          console.log(socketId);
        }
      );
    })();

    return () => {};
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-3 text-white">
        <CodeEditor />
        <div className="grid grid-row-2 bg-zinc-900">
          <InputArea />
          <OutputArea />
        </div>
      </div>
    </>
  );
};

export default Editor;
