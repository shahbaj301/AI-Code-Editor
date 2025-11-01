import Editor from '@monaco-editor/react';
import { useEffect, useRef } from 'react';

export default function EditorPane({ language, code, onChange }) {
  const editorRef = useRef();

  console.log('🎛️ EditorPane props:', { language, codeLength: code?.length });

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    console.log('✅ Monaco editor mounted');
  };

  const handleEditorChange = (value) => {
    console.log('📝 Editor content changed, length:', value?.length);
    onChange && onChange(value);
  };

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      language={language === 'cpp' ? 'cpp' : language}
      value={code}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        formatOnPaste: true,
        formatOnType: true
      }}
    />
  );
}

