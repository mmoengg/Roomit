import React from 'react';
import { Search, Undo, Redo, Camera, Bell } from 'lucide-react';

export default function Header() {
    return (
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
            <div className=" flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-white text-sm font-bold text-lg">
                    R
                </div>
                <span className="text-xl font-bold tracking-tight">roomit</span>
            </div>
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-500">
                {/* <a href="#" className="text-slate-900">프로젝트</a> */}
                {/* <a href="#" className="hover:text-slate-900 transition-colors">둘러보기</a> */}
                {/* <a href="#" className="hover:text-slate-900 transition-colors">쇼룸</a> */}
                {/* <a href="#" className="hover:text-slate-900 transition-colors">커뮤니티</a> */}
                {/* <a href="#" className="hover:text-slate-900 transition-colors">이벤트</a> */}
            </nav>

            <div className="flex items-center gap-3 text-slate-500 ml-auto lg:ml-0">
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Search size={18} /></button>
                {/* <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Undo size={18} /></button> */}
                {/* <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Redo size={18} /></button> */}
                {/* <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Camera size={18} /></button> */}
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Bell size={18} /></button>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>

                <div className="flex items-center gap-2  cursor-pointer hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-colors">
                    <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white text-xs overflow-hidden">
                        박
                    </div>
                    <span className="text-sm font-semibold text-slate-700">박지훈</span>
                </div>
            </div>
        </header>
    );
}
