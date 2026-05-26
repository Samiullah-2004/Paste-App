import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'; 
import { removePastes } from '../redux/pasteslice'; 
import toast from 'react-hot-toast';

const Pastes = () => {
  const data = useSelector((state) => state.paste.pastes);
  const [searchpaste, setsearchppaste] = useState("");
  const dispatch = useDispatch(); 

  const filterData = data.filter(
    (paste) => paste.title.toLowerCase().includes(searchpaste.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">

      <div className="fixed top-20 left-20 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto flex flex-col gap-y-6">

        <div className="flex flex-col gap-y-1 pt-2">
          <h1 className="text-white text-2xl font-bold tracking-tight">📋 All Pastes</h1>
          <p className="text-white/40 text-sm">{filterData.length} paste{filterData.length !== 1 ? 's' : ''} found</p>
        </div>

        <input
          type="text"
          placeholder="Search pastes..."
          value={searchpaste}
          onChange={(e) => setsearchppaste(e.target.value)}
          className="w-full bg-white/10 text-white placeholder-white/30 border border-white/15 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/40 font-medium transition-all duration-200"
        />

        {filterData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-y-3">
            <span className="text-5xl">🗒️</span>
            <p className="text-white/40 text-sm">No pastes found</p>
          </div>
        )}

        {filterData.map((paste) => (
          <div
            key={paste.id}
            className="w-full flex flex-col gap-y-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl transition-all duration-200 hover:bg-white/8 hover:border-white/20"
          >
            <div className="flex flex-col gap-y-1">
              <h2 className="text-white font-semibold text-lg tracking-tight truncate">
                {paste.title || "Untitled"}
              </h2>
              <p className="text-white/30 text-xs">
                {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>

            <p className="text-white/50 text-sm font-mono leading-relaxed line-clamp-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              {paste.content || "No content"}
            </p>

            <div className="flex flex-row flex-wrap gap-2">
              <Link to={`/?pasteId=${paste.id}`}>
                <button className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                   Edit
                </button>
              </Link>

              <Link to={`/pastes/${paste.id}`}>
                <button className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                   View
                </button>
              </Link>

              <button
                onClick={() => dispatch(removePastes(paste.id))}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 hover:border-red-400/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                 Delete
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to Clipboard! 📋");
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                 Copy
              </button>

              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/pastes/${paste.id}`;
                  navigator.clipboard.writeText(shareUrl);
                  toast.success("Paste Link Copied! 🔗");
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                 Share
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Pastes;