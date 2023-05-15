import CodeEditor from "../components/Editor/CodeEditor";
import InputArea from "../components/Editor/InputArea";
import OutputArea from "../components/Editor/OutputArea";
import Header from "../components/Header/Header";

const Editor = () => {
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
