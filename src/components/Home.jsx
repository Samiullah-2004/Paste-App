import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteslice';
import { useEffect } from 'react';

const Home = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    
    const pasteId = searchParams.get("pasteId"); 
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const currentPaste = allPastes.find((p) => p.id === pasteId);
            if (currentPaste) {
                setTitle(currentPaste.title);
                setContent(currentPaste.content);
            }
        } else {
            setTitle("");
            setContent("");
        }
    }, [pasteId, allPastes]); 

    function sendContent() {
        const data = {
            title: title,
            content: content,
            id: pasteId || Date.now().toString(36), 
            createdAt: new Date().toISOString(), 
        }
        if (pasteId) {
            dispatch(updateToPastes(data))
        } else {
            dispatch(addToPastes(data))
        }
        setTitle("");
        setContent("");
        setSearchParams({});
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center p-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">

            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-3xl flex flex-col rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl gap-y-6">

                <div className="flex flex-col gap-y-1">
                    <h1 className="text-white text-2xl font-bold tracking-tight">
                        {pasteId ? "✏️ Edit Paste" : "📋 New Paste"}
                    </h1>
                    <p className="text-white/40 text-sm">
                        {pasteId ? "Update your existing paste below" : "Write something and save it instantly"}
                    </p>
                </div>

                <div className='flex flex-row w-full justify-between items-center gap-x-4'>
                    <input 
                        type="text" 
                        placeholder='Paste title...' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-[70%] bg-white/10 text-white placeholder-white/30 border border-white/15 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/40 font-medium transition-all duration-200"
                    />
                    <button 
                        onClick={sendContent}
                        className="w-[30%] bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-blue-400/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                    >
                        {pasteId ? "Update Paste" : "Create Paste"}
                    </button>
                </div>

                <div className="w-full">
                    <textarea 
                        placeholder='Start writing your content here...'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={16}
                        className="w-full bg-white/5 text-white/90 placeholder-white/25 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 font-mono text-sm resize-none leading-relaxed min-h-[400px] transition-all duration-200"
                    ></textarea>
                </div>

            </div>
        </div>
    )
}

export default Home;