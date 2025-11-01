import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  SparklesIcon, 
  RocketLaunchIcon,
  LightBulbIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const phrases = ['amazing apps', 'smart algorithms', 'beautiful websites', 'AI solutions'];
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/', icon: <CodeBracketIcon className="w-6 h-6" /> },
  // Add more links/icons as needed
];

export default function LandingPage() {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        if (typedText === currentPhrase) setTimeout(() => setIsDeleting(true), 1800);
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? 70 : 110);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const symbolOffsets = [40, -30, 60, -50];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden p-6 text-gray-100 scroll-smooth">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="bg-gradient-to-tr from-cyan-400 to-blue-500 opacity-30 rounded-full absolute w-72 h-72 -left-24 -top-28 filter blur-4xl"/>
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 opacity-30 rounded-full absolute w-72 h-72 -right-20 -bottom-28 filter blur-4xl"/>
        {['<>','{ }','[ ]','( )'].map((sym, idx) => (
          <div key={idx}
            className="text-6xl font-extrabold select-none mix-blend-screen"
            style={{
              color: ['#22d3ee', '#a78bfa', '#ec4899', '#67e8f9'][idx],
              top: `${[12, 28, 62, 82][idx]}%`,
              left: `${[15, 78, 22, 58][idx]}%`,
              transform: `translateY(${symbolOffsets[idx] + scrollY * (0.02 + idx * 0.008)}px) scale(${1 + Math.sin((scrollY + idx * 110) / 220) * 0.05})`,
              transition: 'transform 0.3s ease-in-out',
              filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.12))'
            }}
            aria-hidden="true"
          >{sym}</div>
        ))}
      </div>
      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="hero-section flex flex-col items-center text-center space-y-8 pb-24 px-4 sm:px-6 lg:px-0">
          <div className="logo-container mt-12">
            <div className="bg-gradient-to-tr from-cyan-400 to-blue-500 p-5 rounded-full shadow-2xl ring-4 ring-cyan-400/40 hover:scale-105 transition-transform duration-300 ease-in-out inline-block">
              <CodeBracketIcon className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Code with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-text">
              Intelligence
            </span>
          </h1>
          <div className="text-2xl sm:text-3xl text-gray-300 h-10 sm:h-12">
            <span>Let&apos;s build </span>
            <span className="font-mono text-cyan-400 animate-typing-caret">
              {typedText}
            </span>
          </div>
          <p className="max-w-xl text-lg sm:text-xl text-gray-400 leading-relaxed mx-auto">
            Experience the future of coding with our{' '}
            <span className="font-semibold text-cyan-300">AI-powered editor</span>. <br />
            Write, analyze, optimize, and deploy code like never before.
          </p>
          <div className="cta-container mt-6">
            <button 
              className="group relative inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-600 hover:to-cyan-600 text-gray-900 font-semibold py-4 px-10 rounded-full shadow-lg transition duration-400 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500"
              onClick={() => setShowRegister(true)}
            >
              <span className="mr-4">Let&apos;s code something</span>
              <ArrowRightIcon className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
              <span className="absolute inset-0 rounded-full shadow-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
            </button>
          </div>
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16 w-full px-6 sm:px-0 max-w-5xl">
            {[
              { title: 'AI-Powered', desc: 'Smart code analysis, explanations, and optimizations', Icon: SparklesIcon },
              { title: 'Instant Results', desc: 'Run and test your code in real-time', Icon: RocketLaunchIcon },
              { title: 'Learn & Grow', desc: 'Improve your coding skills with AI insights', Icon: LightBulbIcon }
            ].map((feat, idx) => (
              <div key={idx} className="feature-card bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-md hover:shadow-cyan-500/70 transform hover:scale-105 transition-all duration-300 cursor-default text-center">
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center text-cyan-400">
                  <feat.Icon className="w-14 h-14 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{feat.title}</h3>
                <p className="text-cyan-300 text-md">{feat.desc}</p>
              </div>
            ))}
          </div>
          {/* Secondary Actions */}
          <div className="mt-16 text-center">
            <button 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-lg font-medium underline underline-offset-4"
              onClick={() => setShowLogin(true)}
            >
              Already have an account? <span className="font-semibold">Sign in</span>
            </button>
          </div>
          {/* Stats / Social Proof */}
          <div className="mt-16 pb-8 w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
              <div>
                <div className="text-cyan-400 text-4xl font-extrabold drop-shadow-lg">15+</div>
                <div className="text-gray-400 text-sm tracking-wide mt-1 uppercase">Languages</div>
              </div>
              <div>
                <div className="text-purple-600 text-4xl font-extrabold drop-shadow-lg">AI-Powered</div>
                <div className="text-gray-400 text-sm tracking-wide mt-1 uppercase">Analysis</div>
              </div>
              <div>
                <div className="text-pink-500 text-4xl font-extrabold drop-shadow-lg">Real-time</div>
                <div className="text-gray-400 text-sm tracking-wide mt-1 uppercase">Execution</div>
              </div>
              <div>
                <div className="text-cyan-400 text-4xl font-extrabold drop-shadow-lg">Cloud</div>
                <div className="text-gray-400 text-sm tracking-wide mt-1 uppercase">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator - bounce animation */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
        {scrollY < 80 && (
          <div className="animate-bounce">
            <div className="w-8 h-14 border-2 border-cyan-400 rounded-full flex items-start justify-center relative bg-gray-900/80 shadow-lg">
              <div className="w-3 h-3 bg-cyan-400 rounded-full absolute top-4 left-1/2 transform -translate-x-1/2 shadow" />
            </div>
          </div>
        )}
      </div>
      {/* Responsive footer with soft gradients */}
      <footer 
        className="fixed bottom-0 left-0 w-full z-40 backdrop-blur-lg bg-gradient-to-tr from-gray-800/80 to-gray-900/90 border-t border-cyan-500/40 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 transition-transform duration-400 ease-in-out"
        style={{
          transform: scrollY > 70 ? "translateY(0)" : "translateY(100%)",
          boxShadow: scrollY > 70 ? "0 -3px 30px rgb(10 203 255 / 0.35)" : "none",
        }}
      >
        <div className="flex items-center gap-3 text-cyan-400 font-semibold tracking-wider text-sm sm:text-base">
          CodeIntelligence &copy; {new Date().getFullYear()} All Rights Reserved
        </div>
        <div className="flex items-center gap-5">
          {socialLinks.map(({url, icon}, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-blue-400 transition-colors duration-250">
              {icon}
            </a>
          ))}
        </div>
      </footer>
      {/* MODAL: Login */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 fade-in">
          <div className="relative w-full max-w-md">
            <LoginForm 
              onRequestRegister={() => { setShowLogin(false); setShowRegister(true); }}
              onClose={() => setShowLogin(false)}
            />
            <button 
              className="absolute top-3 right-6 text-cyan-400 text-2xl font-bold hover:text-pink-400"
              onClick={() => setShowLogin(false)}
              aria-label="Close login"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* MODAL: Register */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 fade-in">
          <div className="relative w-full max-w-md">
            <RegisterForm 
              onRequestLogin={() => { setShowRegister(false); setShowLogin(true); }}
              onClose={() => setShowRegister(false)}
            />
            <button 
              className="absolute top-3 right-6 text-cyan-400 text-2xl font-bold hover:text-pink-400"
              onClick={() => setShowRegister(false)}
              aria-label="Close register"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}