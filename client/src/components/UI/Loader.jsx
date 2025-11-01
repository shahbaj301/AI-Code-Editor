export default function Loader({ small = false, text = 'Loading...' }) {
  return (
    <div className={`flex justify-center items-center ${small ? 'w-6 h-6' : 'flex-col'}`}>
      <div>
        <div className="rounded-full border-4 border-t-cyan-500 border-gray-300 w-10 h-10 animate-spin"></div>
        {!small && <p className="mt-2 text-cyan-400 text-sm font-medium">{text}</p>}
      </div>
    </div>
  );
}
