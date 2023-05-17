import { DefaultEventsMap } from "@socket.io/component-emitter";
import CodeMirror, { EditorFromTextArea } from "codemirror";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/lint/lint";
import "codemirror/addon/selection/active-line";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/theme/material.css";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import EditorHeader from "./EditorHeader";
import ACTIONS from "../../actions";

type CodEditorProps = {
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  onCodeChange: (value: string) => void;
  editorRoomId: string;
};

const CodeEditor = ({
  socketRef,
  onCodeChange,
  editorRoomId,
}: CodEditorProps) => {
  const editorRef = useRef<EditorFromTextArea | null>(null);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(
      document.getElementById("code") as HTMLTextAreaElement,
      {
        mode: { name: "python", version: 3, singleLineStringErrors: false },
        theme: "material",
        autoRefresh: true,
        autoCloseTags: true,
        autocorrect: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 4,
        autofocus: true,
        matchBrackets: true,
        lint: true,
        gutters: ["CodeMirror-lint-markers"],
        styleActiveLine: true,
      }
    );

    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      if (origin !== "setValue") {
        socketRef?.emit(ACTIONS.CODE_CHANGE, {
          editorRoomId,
          code,
        });
      }
    });

    return () => {
      editorRef.current!.toTextArea();
    };
  }, [editorRoomId, onCodeChange, socketRef]);

  useEffect(() => {
    if (socketRef) {
      socketRef.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current!.setValue(code);
        }
      });
    }

    return () => {
      socketRef?.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef]);

  return (
    <>
      <div className="bg-zinc-900 col-start-1 col-end-3 h-screen border-r-2 border-gray-600">
        <EditorHeader language={language} setLanguage={setLanguage} />
        <textarea name="code" id="code" className="w-full"></textarea>
      </div>
    </>
  );
};

export default CodeEditor;
