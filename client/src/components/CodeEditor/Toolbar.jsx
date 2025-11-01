export default function Toolbar({ onAnalyze, onSave }) {
  return (
    <div className="toolbar">
      <button onClick={onSave}>💾 Save</button>
      <button onClick={onAnalyze}>🧠 Analyze</button>
    </div>
  );
}
