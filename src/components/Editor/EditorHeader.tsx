type EditorHeaderProps = {
  language: string;
  setLanguage: (value: string) => void;
};

const EditorHeader = ({ language, setLanguage }: EditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-zinc-800 h-16">
      <div className="h-full pt-4 pb-4 pl-6 pr-6 font-bold border-t-4 border-blue-600 bg-slate-700 text-lg">
        main.js
      </div>
      <div className="flex items-center justify-end gap-4  border-t-2 border-b-2 border-l-2 border-gray-600 w-full h-full pr-4">
        <select
          name="language"
          id="language"
          className="bg-transparent border outline-none p-2 rounded"
          defaultValue={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript" className="bg-zinc-800">
            JavaScript
          </option>
          <option value="python" className="bg-zinc-800">
            Python
          </option>
          <option value="clike" className="bg-zinc-800">
            C++
          </option>
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.375 4.71a.938.938 0 0 1 1.39-.82l9.617 5.289a.938.938 0 0 1 0 1.643L5.764 16.11a.938.938 0 0 1-1.389-.822V4.711Z"
            />
          </svg>
          Run
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
