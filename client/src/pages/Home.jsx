// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { listCodes } from '../api/codes';
// import useAuth from '../hooks/useAuth';
// import Loader from '../components/UI/Loader';

// export default function Home() {
//   const { user } = useAuth();
//   const [recentCodes, setRecentCodes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalCodes: 0,
//     aiQueriesUsed: 0,
//     totalLinesOfCode: 0
//   });

//   useEffect(() => {
//     const fetchRecentCodes = async () => {
//       try {
//         const response = await listCodes({ limit: 5 });
//         setRecentCodes(response.data.data.codes);
//       } catch (error) {
//         console.error('Failed to fetch recent codes:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       setStats({
//         totalCodes: user.stats?.totalCodes || 0,
//         aiQueriesUsed: user.stats?.aiQueriesUsed || 0,
//         totalLinesOfCode: user.stats?.totalLinesOfCode || 0
//       });
//       fetchRecentCodes();
//     }
//   }, [user]);

//   if (loading) return <Loader />;

//   return (
//     <div className="home-page">
//       <div className="welcome-section">
//         <h1>Welcome back, {user?.profile?.firstName || user?.username}! 👋</h1>
//         <p className="subtitle">Ready to write some intelligent code?</p>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-number">{stats.totalCodes}</div>
//           <div className="stat-label">Code Snippets</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">{stats.totalLinesOfCode.toLocaleString()}</div>
//           <div className="stat-label">Lines of Code</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">{stats.aiQueriesUsed}</div>
//           <div className="stat-label">AI Queries</div>
//         </div>
//       </div>

//       <div className="dashboard-grid">
//         <div className="quick-actions">
//           <h3>Quick Actions</h3>
//           <div className="action-buttons">
//             <Link to="/editor" className="action-btn">
//               <span className="action-icon">✨</span>
//               <div>
//                 <strong>New Code</strong>
//                 <p>Start coding with AI assistance</p>
//               </div>
//             </Link>
//             <Link to="/codes" className="action-btn">
//               <span className="action-icon">📂</span>
//               <div>
//                 <strong>My Snippets</strong>
//                 <p>Browse your saved code</p>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="recent-codes">
//           <h3>Recent Code Snippets</h3>
//           {recentCodes.length > 0 ? (
//             <div className="codes-list">
//               {recentCodes.map(code => (
//                 <Link to={`/codes/${code._id}`} key={code._id} className="code-item">
//                   <div className="code-info">
//                     <h4>{code.title}</h4>
//                     <p className="code-meta">
//                       {code.language} • {new Date(code.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="code-language">{code.language}</div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <p>No code snippets yet. <Link to="/editor">Create your first one!</Link></p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listCodes } from '../api/codes';
import useAuth from '../hooks/useAuth';
import Loader from '../components/UI/Loader';

export default function Home() {
  const { user } = useAuth();
  const [recentCodes, setRecentCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCodes: 0,
    aiQueriesUsed: 0,
    totalLinesOfCode: 0
  });

  useEffect(() => {
    const fetchRecentCodes = async () => {
      try {
        const response = await listCodes({ limit: 5 });
        setRecentCodes(response.data.data.codes);
      } catch (error) {
        console.error('Failed to fetch recent codes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setStats({
        totalCodes: user.stats?.totalCodes || 0,
        aiQueriesUsed: user.stats?.aiQueriesUsed || 0,
        totalLinesOfCode: user.stats?.totalLinesOfCode || 0
      });
      fetchRecentCodes();
    }
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.profile?.firstName || user?.username}! 👋</h1>
        <p className="text-gray-400 text-lg mt-2">Ready to write some intelligent code?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-4xl font-extrabold text-cyan-400">{stats.totalCodes}</div>
          <div className="text-gray-400 mt-2">Code Snippets</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-4xl font-extrabold text-cyan-400">{stats.totalLinesOfCode.toLocaleString()}</div>
          <div className="text-gray-400 mt-2">Lines of Code</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-4xl font-extrabold text-cyan-400">{stats.aiQueriesUsed}</div>
          <div className="text-gray-400 mt-2">AI Queries</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-col space-y-4">
            <Link
              to="/editor"
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold rounded p-4 flex items-center gap-4 transition-colors duration-200"
            >
              <span className="text-2xl">✨</span>
              <div>
                <strong>New Code</strong>
                <p className="text-gray-700">Start coding with AI assistance</p>
              </div>
            </Link>
            <Link
              to="/codes"
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold rounded p-4 flex items-center gap-4 transition-colors duration-200"
            >
              <span className="text-2xl">📂</span>
              <div>
                <strong>My Snippets</strong>
                <p className="text-gray-700">Browse your saved code</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Code Snippets</h3>
          {recentCodes.length > 0 ? (
            <div className="space-y-4">
              {recentCodes.map(code => (
                <Link
                  to={`/codes/${code._id}`}
                  key={code._id}
                  className="block p-4 rounded hover:bg-gray-700 transition-colors duration-200"
                >
                  <div>
                    <h4 className="font-semibold text-cyan-400">{code.title}</h4>
                    <p className="text-gray-400">
                      {code.language} • {new Date(code.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{code.language}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">
              <p>No code snippets yet. <Link to="/editor" className="text-cyan-400 hover:underline">Create your first one!</Link></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

