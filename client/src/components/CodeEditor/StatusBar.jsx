export default function StatusBar({ language, lines, characters }) {
  return (
    <div className="bg-dark-800/50 border-t border-dark-700/50 px-4 py-2 backdrop-blur-sm">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              language === 'javascript' ? 'bg-yellow-400' :
              language === 'python' ? 'bg-blue-400' :
              language === 'java' ? 'bg-orange-400' :
              language === 'cpp' ? 'bg-purple-400' :
              language === 'html' ? 'bg-red-400' :
              language === 'css' ? 'bg-pink-400' :
              'bg-accent-400'
            }`}></div>
            <span className="text-slate-300 font-medium">{language.toUpperCase()}</span>
          </div>
          
          <div className="text-slate-400">
            <span className="text-slate-300 font-medium">{lines}</span> lines
          </div>
          
          <div className="text-slate-400">
            <span className="text-slate-300 font-medium">{characters}</span> chars
          </div>
        </div>
        
        <div className="text-slate-400 text-xs">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
