// import { useEffect, useState } from 'react';
// import { listCodes, deleteCode } from '../api/codes';
// import { Link } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import Loader from '../components/UI/Loader';

// export default function SavedCodes() {
//   const [codes, setCodes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user } = useAuth();

//   const fetchCodes = async () => {
//     try {
//       setLoading(true);
//       const response = await listCodes();
//       setCodes(response.data.data.codes || []);
//     } catch (err) {
//       console.error('Error fetching codes:', err);
//       setError('Failed to fetch saved codes');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchCodes();
//     }
//   }, [user]);

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this code?')) return;
    
//     try {
//       await deleteCode(id);
//       setCodes(codes.filter(c => c._id !== id));
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Failed to delete code');
//     }
//   };

//   if (loading) return <Loader text="Loading your code snippets..." />;

//   return (
//     <div className="codes-page">
//       <div className="codes-header">
//         <h1>📂 My Code Snippets</h1>
//         <Link to="/editor" className="btn btn-primary">
//           ✨ New Code
//         </Link>
//       </div>

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       {codes.length === 0 ? (
//         <div className="empty-state">
//           <div className="empty-icon">📝</div>
//           <h3>No code snippets yet</h3>
//           <p>Start coding and save your first snippet!</p>
//           <Link to="/editor" className="btn btn-primary">
//             Create First Snippet
//           </Link>
//         </div>
//       ) : (
//         <div className="codes-grid">
//           {codes.map(code => (
//             <div key={code._id} className="code-card">
//               <div className="code-card-header">
//                 <h3>{code.title}</h3>
//                 <div className="code-actions">
//                   {/* THIS IS THE KEY CHANGE - Link to editor with snippet id */}
//                   <Link to={`/editor/${code._id}`} className="btn-icon edit-btn" title="Open this snippet">
//                     📝
//                   </Link>
//                   <button 
//                     onClick={() => handleDelete(code._id)}
//                     className="btn-icon delete-btn"
//                     title="Delete snippet"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
              
//               <div className="code-meta">
//                 <span className="language-tag">{code.programmingLanguage}</span>
//                 <span className="date">{new Date(code.createdAt).toLocaleDateString()}</span>
//                 <span className="lines">{code.metadata?.linesOfCode || 0} lines</span>
//               </div>
              
//               {code.description && (
//                 <p className="code-description">{code.description}</p>
//               )}
              
//               {/* Make the entire preview clickable */}
//               <Link to={`/editor/${code._id}`} className="code-preview-link">
//                 <div className="code-preview">
//                   <pre><code>{code.code.slice(0, 150)}...</code></pre>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { listCodes, deleteCode } from '../api/codes';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/UI/Loader';

export default function SavedCodes() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchCodes = async () => {
    try {
      setLoading(true);
      const response = await listCodes();
      setCodes(response.data.data.codes || []);
    } catch (err) {
      console.error('Error fetching codes:', err);
      setError('Failed to fetch saved codes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCodes();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this code?')) return;
    try {
      await deleteCode(id);
      setCodes(codes.filter(c => c._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete code');
    }
  };

  if (loading) return <Loader text="Loading your code snippets..." />;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Code Snippets</h1>
        <Link
          to="/editor"
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold rounded px-4 py-2 transition-colors duration-200"
        >
          New Code
        </Link>
      </div>

      {error && (
        <div className="bg-red-600 text-red-100 p-3 rounded mb-4 text-center">{error}</div>
      )}

      {codes.length === 0 ? (
        <div className="text-center text-gray-400">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold mb-2">No code snippets yet</h3>
          <p className="mb-6">Start coding and save your first snippet!</p>
          <Link
            to="/editor"
            className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold rounded px-4 py-2 transition-colors duration-200"
          >
            Create First Snippet
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codes.map(code => (
            <div key={code._id} className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-cyan-400">{code.title}</h3>
                <div className="flex gap-2">
                  <Link
                    to={`/editor/${code._id}`}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    title="Open this snippet"
                  >
                    📝
                  </Link>
                  <button
                    onClick={() => handleDelete(code._id)}
                    className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    title="Delete snippet"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-gray-400 text-sm mb-2">
                <span>{code.programmingLanguage}</span>
                <span>{new Date(code.createdAt).toLocaleDateString()}</span>
                <span>{code.metadata?.linesOfCode || 0} lines</span>
              </div>

              {code.description && <p className="text-gray-300 mb-2">{code.description}</p>}

              <Link
                to={`/editor/${code._id}`}
                className="block bg-gray-700 rounded p-3 hover:bg-gray-600 transition-colors duration-200"
              >
                <pre className="whitespace-pre-wrap truncate max-h-24 overflow-hidden">{code.code.slice(0, 150)}...</pre>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

