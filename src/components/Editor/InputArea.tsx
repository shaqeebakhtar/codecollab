const InputArea = () => {
  return (
    <div className="border-t-2 border-gray-600 h-16">
      <div className="h-full w-max pt-4 pb-4 pl-6 pr-6 border-r-2 border-b-2 border-gray-600 text-lg">
        Input
      </div>
      <textarea
        name="input"
        id="input"
        className="w-full h-full p-4 outline-none bg-transparent resize-none"
      ></textarea>
    </div>
  );
};

export default InputArea;
