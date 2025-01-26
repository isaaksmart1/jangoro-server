export function ChatBox() {
  return (
    <div className="my-8 mx-auto w-full max-w-lg h-auto bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-2xl p-4 flex flex-col justify-between">
      <div className="bg-slate-700 text-oe-white rounded-2xl p-3 my-2 mr-auto max-w-[60%] tablet:max-w-[60%]">
        Hi, can you please assist me on my Idea?
      </div>
      <div className="bg-green-700 text-oe-white rounded-2xl p-3 my-2 ml-auto max-w-[60%] tablet:max-w-[60%]">
        Sure, what is your idea?
      </div>
      <div className="relative border-2 box-border rounded-xl p-2">
        <input
          type="text"
          value="Ask me anything..."
          className="w-full h-[48px] bg-transparent text-oe-white"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-2xl px-3 py-2">
          Send
        </button>
      </div>
    </div>
  );
}
