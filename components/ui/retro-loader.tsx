const RetroSpinner = () => {
  return (
    <div className="flex space-x-2">
      <div
        className="w-3 h-3 bg-[#fcd34d] border-2 border-black animate-bounce  "
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-3 h-3 bg-[#f472b6] border-2 border-black animate-bounce  "
        style={{ animationDelay: "0.4s" }}
      ></div>
      <div
        className="w-3 h-3 bg-[#60a5fa] border-2 border-black animate-bounce  "
        style={{ animationDelay: "0.6s" }}
      ></div>
    </div>
  );
};

export default RetroSpinner;
