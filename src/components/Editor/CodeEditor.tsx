import CodeMirror from "codemirror";
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
import EditorHeader from "./EditorHeader";

const CodeEditor = () => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(editorRef.current!, {
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
    });

    return () => {
      editor.toTextArea();
    };
  }, []);

  return (
    <>
      <div className="bg-zinc-900 col-start-1 col-end-3 h-screen border-r-2 border-gray-600">
        <EditorHeader language={language} setLanguage={setLanguage} />
        <textarea
          ref={editorRef}
          name="code"
          id="code"
          className="w-full text-black"
          defaultValue={"console.log('Hello world!');"}
        ></textarea>
      </div>
    </>
  );
};

export default CodeEditor;
