import { useEffect, useRef, useState } from "react";
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
import Split from "react-split";

type TClients = {
  socketId: string;
  collaboratorName: string;
};

const Editor = () => {
  const [clients, setClients] = useState<TClients[]>([]);
  const socketRef = useRef<null | Socket<DefaultEventsMap, DefaultEventsMap>>(
    null
  );
  const codeRef = useRef<string | null>(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { editorRoomId, collaboratorName } = useSelector(
    (state: RootState) => state.editor
  );

  const editorName = collaboratorName;

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
          if (collaboratorName !== editorName) {
            toast({
              title: `${collaboratorName} has joined the room`,
              status: "info",
              isClosable: false,
            });
          }
          setClients(clients);
          socketRef.current?.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // disconnected client
      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, collaboratorName }) => {
          toast({
            title: `${collaboratorName} has left the room`,
            status: "info",
            isClosable: false,
          });
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        }
      );
    })();

    return () => {
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
      socketRef.current?.disconnect();
    };
  }, [collaboratorName, editorRoomId, navigate, toast, editorName]);

  if (!collaboratorName) {
    navigate("/");
  }

  return (
    <>
      <Header clients={clients} />
      <Split
        className="split grid grid-cols-3 h-screen text-white overflow-hidden"
        gutterSize={8}
        maxSize={1000}
        gutterAlign="end"
      >
        <CodeEditor
          editorRoomId={editorRoomId}
          socketRef={socketRef.current}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
        <div className="flex flex-col bg-zinc-900">
          <InputArea />
          <OutputArea />
        </div>
      </Split>
    </>
  );
};

export default Editor;
