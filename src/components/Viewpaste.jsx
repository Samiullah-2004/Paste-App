import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Viewpaste = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const { id } = useParams(); 
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (id) {
            const currentPaste = allPastes.find((p) => p.id === id);
            if (currentPaste) {
                setTitle(currentPaste.title);
                setContent(currentPaste.content);
            }
        }
    }, [id, allPastes]); 

    return (
        <div className="min-h-screen w-full flex justify-center items-center p-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">

            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-3xl flex flex-col rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl gap-y-6">

                <div className="flex flex-col gap-y-1">
                    <h1 className="text-white text-2xl font-bold tracking-tight">👁️ View Paste</h1>
                    <p className="text-white/40 text-sm">Read-only view of this paste</p>
                </div>

                <div className="flex flex-row w-full justify-between items-center gap-x-4">
                    <input
                        type="text"
                        value={title}
                        disabled
                        className="w-[70%] bg-white/5 text-white/70 border border-white/10 rounded-2xl px-4 py-3 outline-none font-medium cursor-not-allowed"
                    />
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(content);
                            toast.success("Copied to Clipboard! 📋");
                        }}
                        className="w-[30%] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                    >
                        Copy Content
                    </button>
                </div>

                <div className="w-full">
                    <textarea
                        value={content}
                        disabled
                        rows={16}
                        className="w-full bg-white/5 text-white/70 border border-white/10 rounded-2xl px-4 py-4 outline-none font-mono text-sm resize-none leading-relaxed min-h-[400px] cursor-not-allowed"
                    ></textarea>
                </div>

            </div>
        </div>
    )
}

export default Viewpaste;