const CodeEditor = () => {
  return (
    <div className="bg-zinc-900 col-start-1 col-end-3 h-screen border-r-2 border-gray-600">
      <div className="flex items-center justify-between bg-zinc-800 h-16">
        <div className="h-full pt-4 pb-4 pl-6 pr-6 font-bold border-t-4 border-blue-600 bg-zinc-900 text-lg">
          main.js
        </div>
        <div className="flex items-center justify-end gap-4  border-t-2 border-b-2 border-l-2 border-gray-600 w-full h-full pr-4">
          <select
            name="language"
            id="language"
            className="bg-transparent border"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c++">C++</option>
          </select>
          <button className="flex items-center justify-center gap-1 bg-blue-600 pt-2 pb-2 pl-4 pr-4  font-semibold rounded-sm hover:bg-blue-700 ease-in duration-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
            >
              <path
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4.375 4.71a.938.938 0 0 1 1.39-.82l9.617 5.289a.938.938 0 0 1 0 1.643L5.764 16.11a.938.938 0 0 1-1.389-.822V4.711Z"
              />
            </svg>
            Run
          </button>
        </div>
      </div>
      <textarea
        name="code"
        id="code"
        className="w-full h-[90vh] p-4 outline-none bg-transparent resize-none"
      ></textarea>
    </div>
  );
};

export default CodeEditor;
