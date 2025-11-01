// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import EditorPane from '../components/CodeEditor/EditorPane';
// import Toolbar from '../components/CodeEditor/Toolbar';
// import StatusBar from '../components/CodeEditor/StatusBar';
// import AIAssistant from '../components/CodeEditor/AIAssistant';
// import CodeRunner from '../components/CodeEditor/CodeRunner';
// import * as Codes from '../api/codes';
// import useAuth from '../hooks/useAuth';
// import Loader from '../components/UI/Loader';

// // Simple Hello World templates
// const CODE_TEMPLATES = {
//   javascript: `console.log("Hello World!");`,
//   python: `print("Hello World!")`,
//   java: `public class HelloWorld {
//     public static void main(String[] args) {
//         System.out.println("Hello World!");
//     }
// }`,
//   cpp: `#include <iostream>
// using namespace std;

// int main() {
//     cout << "Hello World!" << endl;
//     return 0;
// }`,
//   c: `#include <stdio.h>

// int main() {
//     printf("Hello World!\\n");
//     return 0;
// }`,
//   html: `<!DOCTYPE html>
// <html>
// <head>
//     <title>Hello World</title>
// </head>
// <body>
//     <h1>Hello World!</h1>
// </body>
// </html>`,
//   css: `/* Hello World CSS */
// body {
//     font-family: Arial, sans-serif;
//     text-align: center;
//     margin-top: 50px;
// }

// h1 {
//     color: #007acc;
// }`,
//   typescript: `console.log("Hello World!");`,
//   php: `<?php
// echo "Hello World!";
// ?>`,
//   ruby: `puts "Hello World!"`,
//   go: `package main

// import "fmt"

// func main() {
//     fmt.Println("Hello World!")
// }`,
//   rust: `fn main() {
//     println!("Hello World!");
// }`,
//   sql: `SELECT 'Hello World!' as message;`,
//   json: `{
//   "message": "Hello World!"
// }`,
//   xml: `<?xml version="1.0"?>
// <message>Hello World!</message>`
// };

// const getDefaultCode = (language) => {
//   return CODE_TEMPLATES[language] || `// Hello World in ${language}`;
// };

// const PROGRAMMING_LANGUAGES = [
//   { value: 'javascript', label: 'JavaScript' },
//   { value: 'python', label: 'Python' },
//   { value: 'java', label: 'Java' },
//   { value: 'cpp', label: 'C++' },
//   { value: 'c', label: 'C' },
//   { value: 'html', label: 'HTML' },
//   { value: 'css', label: 'CSS' },
//   { value: 'typescript', label: 'TypeScript' },
//   { value: 'php', label: 'PHP' },
//   { value: 'ruby', label: 'Ruby' },
//   { value: 'go', label: 'Go' },
//   { value: 'rust', label: 'Rust' },
//   { value: 'sql', label: 'SQL' },
//   { value: 'json', label: 'JSON' },
//   { value: 'xml', label: 'XML' }
// ];

// export default function Editor() {
//   const { id } = useParams(); // Get snippet ID from URL params
//   const { user } = useAuth();

//   const [language, setLanguage] = useState('javascript');
//   const [code, setCode] = useState('');
//   const [title, setTitle] = useState('');
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [saveMessage, setSaveMessage] = useState('');
//   const [showOutput, setShowOutput] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [isExistingSnippet, setIsExistingSnippet] = useState(false);
//   const [snippetData, setSnippetData] = useState(null);

//   // Load snippet or default code on id param
//   useEffect(() => {
//     const initializeEditor = async () => {
//       if (id) {
//         setLoading(true);
//         try {
//           const response = await Codes.getCodeById(id);
//           const snippet = response.data.data || response.data;

//           setCode(snippet.code);
//           setTitle(snippet.title);
//           setLanguage(snippet.programmingLanguage);
//           setIsExistingSnippet(true);
//           setSnippetData(snippet);
//         } catch {
//           const defaultCode = getDefaultCode('javascript');
//           setCode(defaultCode);
//           setTitle('Hello World - javascript');
//           setLanguage('javascript');
//           setIsExistingSnippet(false);
//         } finally {
//           setLoading(false);
//           setIsInitialized(true);
//         }
//       } else {
//         const defaultCode = getDefaultCode(language);
//         setCode(defaultCode);
//         setTitle(`Hello World - ${language}`);
//         setIsExistingSnippet(false);
//         setIsInitialized(true);
//       }
//     };
//     initializeEditor();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // Change language with confirmation and snippet loading logic
//   const handleLanguageChange = (newLanguage) => {
//     if (isExistingSnippet) {
//       const confirmChange = window.confirm('Changing language will reset your snippet. Continue?');
//       if (!confirmChange) return;
//       setIsExistingSnippet(false);
//     } else if (code.trim() !== '' && code !== getDefaultCode(language)) {
//       const confirmChange = window.confirm('Changing language will replace your code. Continue?');
//       if (!confirmChange) return;
//     }

//     setLanguage(newLanguage);
//     setCode(getDefaultCode(newLanguage));
//     setTitle(`Hello World - ${newLanguage}`);
//   };

//   // Save snippet, login required
//   const handleSave = async () => {
//     if (!user) {
//       setSaveMessage('Please login to save code');
//       return;
//     }

//     if (!code.trim()) {
//       setSaveMessage('Please write some code to save');
//       return;
//     }

//     setSaving(true);
//     setSaveMessage('');

//     try {
//       const saveData = {
//         title: title || `Hello World - ${language}`,
//         code,
//         programmingLanguage: language,
//         description: isExistingSnippet ? (snippetData?.description || `Updated ${language} code`) : `Hello World example in ${language}`,
//         category: 'snippet'
//       };

//       if (isExistingSnippet && id) {
//         await Codes.updateCode(id, saveData);
//         setSaveMessage('✅ Code updated successfully!');
//       } else {
//         const response = await Codes.createCode(saveData);
//         setSaveMessage('✅ Code saved successfully!');
//         setIsExistingSnippet(true);
//         const newId = response.data.data?._id || response.data._id;
//         if (newId) {
//           window.history.replaceState(null, '', `/editor/${newId}`);
//         }
//       }
//       setTimeout(() => setSaveMessage(''), 3000);
//     } catch {
//       setSaveMessage('❌ Failed to save code');
//       setTimeout(() => setSaveMessage(''), 3000);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading || !isInitialized) {
//     return <Loader text={loading ? 'Loading code snippet...' : 'Initializing editor...'} />;
//   }

//   return (
//     <div className="editor-page">
//       <div className="editor-header">
//         <div className="editor-controls">
//           <input
//             type="text"
//             placeholder="Enter title for your code..."
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="title-input"
//           />

//           <select value={language} onChange={(e) => handleLanguageChange(e.target.value)} className="language-selector">
//             {PROGRAMMING_LANGUAGES.map((lang) => (
//               <option key={lang.value} value={lang.value}>{lang.label}</option>
//             ))}
//           </select>

//           <button className="toggle-output-btn" onClick={() => setShowOutput(!showOutput)}>
//             {showOutput ? '📝 Hide Output' : '▶️ Show Output'}
//           </button>

//           {isExistingSnippet && <span className="snippet-status">📝 Editing Saved Snippet</span>}
//         </div>

//         <Toolbar onSave={handleSave} saving={saving} saveMessage={saveMessage} />
//       </div>

//       <div className={`editor-layout ${showOutput ? 'show-output' : ''}`}>
//         {!showOutput && (
//           <div className="editor-section">
//             <div className="editor-wrapper">
//               <EditorPane language={language} code={code} onChange={(val) => setCode(val || '')} />
//               <StatusBar language={language} lines={code.split('\n').length} characters={code.length} />
//             </div>
//             <AIAssistant code={code} language={language} />
//           </div>
//         )}

//         {showOutput && (
//           <div className="output-section">
//             <CodeRunner code={code} language={language} onClose={() => setShowOutput(false)} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditorPane from '../components/CodeEditor/EditorPane';
import Toolbar from '../components/CodeEditor/Toolbar';
import StatusBar from '../components/CodeEditor/StatusBar';
import AIAssistant from '../components/CodeEditor/AIAssistant';
import CodeRunner from '../components/CodeEditor/CodeRunner';
import * as Codes from '../api/codes';
import useAuth from '../hooks/useAuth';
import Loader from '../components/UI/Loader';

const CODE_TEMPLATES = {
  javascript: `console.log("Hello World!");`,
  python: `print("Hello World!")`,
  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello World!\\n");
    return 0;
}`,
  html: `<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
  css: `/* Hello World CSS */
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
}

h1 {
    color: #007acc;
}`,
  typescript: `console.log("Hello World!");`,
  php: `<?php
echo "Hello World!";
?>`,
  ruby: `puts "Hello World!"`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}`,
  rust: `fn main() {
    println!("Hello World!");
}`,
  sql: `SELECT 'Hello World!' as message;`,
  json: `{
  "message": "Hello World!"
}`,
  xml: `<?xml version="1.0"?>
<message>Hello World!</message>`
};

const getDefaultCode = (language) => {
  return CODE_TEMPLATES[language] || `// Hello World in ${language}`;
};

const PROGRAMMING_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' }
];

export default function Editor() {
  const { id } = useParams();
  const { user } = useAuth();

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isExistingSnippet, setIsExistingSnippet] = useState(false);
  const [snippetData, setSnippetData] = useState(null);

  // Load snippet or default code on id param
  useEffect(() => {
    const initializeEditor = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await Codes.getCodeById(id);
          const snippet = response.data.data || response.data;

          setCode(snippet.code);
          setTitle(snippet.title);
          setLanguage(snippet.programmingLanguage);
          setIsExistingSnippet(true);
          setSnippetData(snippet);
        } catch {
          const defaultCode = getDefaultCode('javascript');
          setCode(defaultCode);
          setTitle('Hello World - javascript');
          setLanguage('javascript');
          setIsExistingSnippet(false);
        } finally {
          setLoading(false);
          setIsInitialized(true);
        }
      } else {
        const defaultCode = getDefaultCode(language);
        setCode(defaultCode);
        setTitle(`Hello World - ${language}`);
        setIsExistingSnippet(false);
        setIsInitialized(true);
      }
    };
    initializeEditor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Change language with confirmation and snippet loading logic
  const handleLanguageChange = (newLanguage) => {
    if (isExistingSnippet) {
      const confirmChange = window.confirm('Changing language will reset your snippet. Continue?');
      if (!confirmChange) return;
      setIsExistingSnippet(false);
    } else if (code.trim() !== '' && code !== getDefaultCode(language)) {
      const confirmChange = window.confirm('Changing language will replace your code. Continue?');
      if (!confirmChange) return;
    }

    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
    setTitle(`Hello World - ${newLanguage}`);
  };

  // Save snippet, login required
  const handleSave = async () => {
    if (!user) {
      setSaveMessage('Please login to save code');
      return;
    }

    if (!code.trim()) {
      setSaveMessage('Please write some code to save');
      return;
    }

    setSaving(true);
    setSaveMessage('');

    try {
      const saveData = {
        title: title || `Hello World - ${language}`,
        code,
        programmingLanguage: language,
        description: isExistingSnippet ? (snippetData?.description || `Updated ${language} code`) : `Hello World example in ${language}`,
        category: 'snippet'
      };

      if (isExistingSnippet && id) {
        await Codes.updateCode(id, saveData);
        setSaveMessage('✅ Code updated successfully!');
      } else {
        const response = await Codes.createCode(saveData);
        setSaveMessage('✅ Code saved successfully!');
        setIsExistingSnippet(true);
        const newId = response.data.data?._id || response.data._id;
        if (newId) {
          window.history.replaceState(null, '', `/editor/${newId}`);
        }
      }
      setTimeout(() => setSaveMessage(''), 3000);
    } catch {
      setSaveMessage('❌ Failed to save code');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !isInitialized) {
    return <Loader text={loading ? 'Loading code snippet...' : 'Initializing editor...'} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-3 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Enter title for your code..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full md:w-auto"
          />

          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full md:w-auto"
          >
            {PROGRAMMING_LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-200"
            onClick={() => setShowOutput(!showOutput)}
          >
            {showOutput ? '📝 Hide Output' : '▶️ Show Output'}
          </button>

          {isExistingSnippet && (
            <span className="text-gray-400 ml-2 font-medium">📝 Editing Saved Snippet</span>
          )}
        </div>

        <Toolbar onSave={handleSave} saving={saving} saveMessage={saveMessage} />
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-4">
        <div className={`flex flex-col flex-grow ${showOutput ? 'md:w-3/5' : 'w-full'}`}>
          {!showOutput ? (
            <div className="flex flex-col flex-grow overflow-hidden rounded-lg shadow-lg bg-gray-800 p-4">
              <EditorPane language={language} code={code} onChange={(val) => setCode(val || '')} />
              <StatusBar language={language} lines={code.split('\n').length} characters={code.length} />
            </div>
          ) : (
            <div className="flex flex-col flex-grow rounded-lg shadow-lg bg-gray-800 p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-300">🔥 Code Output</h3>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  onClick={() => setShowOutput(false)}
                >
                  ✕ Close
                </button>
              </div>
              <CodeRunner code={code} language={language} onClose={() => setShowOutput(false)} />
            </div>
          )}
        </div>

        <div className="w-full md:w-2/5 rounded-lg shadow-lg bg-gray-800 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-cyan-400 font-semibold text-xl">🤖 AI Assistant</h3>
            <span className="text-gray-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              Ready
            </span>
          </div>
          <AIAssistant code={code} language={language} />
        </div>
      </div>
    </div>
  );
}
