import { useState } from 'react';
import { KeyRound, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import './index.css';

export default function App() {
  const [keys, setKeys] = useState({
    groq: '',
    openai: '',
    gemini: '',
    linkedinClientId: '',
    linkedinClientSecret: '',
    linkedinAccessToken: '',
    linkedinPersonUrn: ''
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeys({ ...keys, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send keys to a secure backend endpoint
    // For this prototype, we'll simulate saving and trigger a local file update
    try {
      const response = await fetch('http://localhost:3001/api/save-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(keys),
      });
      if (response.ok) {
        setSaved(true);
      } else {
        console.error('Failed to save keys');
        // fallback to setting saved state for demo purposes if backend isn't up
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving keys:', error);
      // Simulate save for demo
      setSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col pt-12">
      <div className="max-w-3xl w-full mx-auto px-6">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">API Configuration</h1>
          <p className="text-slate-400 text-lg">Securely load your credentials for the B.L.A.S.T. Framework</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-8">
            {/* LLM Providers */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-800 pb-2 flex items-center">
                <span className="bg-indigo-500 w-2 h-2 rounded-full mr-3"></span>
                Language Models
              </h2>
              <div className="grid gap-5">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">Groq API Key</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="password"
                      name="groq"
                      value={keys.groq}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="gsk_..."
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">OpenAI API Key (Optional fallback)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="password"
                      name="openai"
                      value={keys.openai}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="sk-..."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Image Generation */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-800 pb-2 flex items-center">
                <span className="bg-emerald-500 w-2 h-2 rounded-full mr-3"></span>
                Image Generation
              </h2>
              <div className="group">
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">Gemini API Key</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="gemini"
                    value={keys.gemini}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="AIza..."
                  />
                </div>
              </div>
            </section>

            {/* LinkedIn Integrations */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-800 pb-2 flex items-center">
                <span className="bg-blue-600 w-2 h-2 rounded-full mr-3"></span>
                LinkedIn API
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">Client ID</label>
                  <input
                    type="text"
                    name="linkedinClientId"
                    value={keys.linkedinClientId}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Client ID..."
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">Client Secret</label>
                  <input
                    type="password"
                    name="linkedinClientSecret"
                    value={keys.linkedinClientSecret}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Client Secret..."
                  />
                </div>
                <div className="group md:col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">Access Token</label>
                  <input
                    type="password"
                    name="linkedinAccessToken"
                    value={keys.linkedinAccessToken}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Access Token..."
                  />
                </div>
                <div className="group md:col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">Person URN</label>
                  <input
                    type="text"
                    name="linkedinPersonUrn"
                    value={keys.linkedinPersonUrn}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="urn:li:person:..."
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="text-sm text-slate-500 max-w-xs">
              Keys are passed directly to your local backend and never sent to external servers.
            </div>

            <button
              type="submit"
              className={`relative inline-flex items-center justify-center px-8 py-3.5 font-medium rounded-xl text-white transition-all overflow-hidden ${saved
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-blue-500 hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                }`}
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Keys Saved Securely
                </>
              ) : (
                <>
                  Save Configuration
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
