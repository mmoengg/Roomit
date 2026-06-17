import React from 'react';
import {
    Home, Folder, Star, BookOpen, Armchair, Store, Users, Headphones, Plus, Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
    return (
        <a
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${active
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
        >
            <span className={active ? 'text-blue-600' : 'text-slate-400'}>
                {icon}
            </span>
            {label}
        </a>
    );
}

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-50/50 border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
            {/* 새 프로젝트 버튼 */}
            <div className="px-3 py-5">
                <Link
                    href="/upload"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 rounded-md text-sm transition-colors "
                >
                    <Plus size={14} strokeWidth={2.5} /> 새 프로젝트
                </Link>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                <NavItem icon={<Home size={16} />} label="홈" active />
                <NavItem icon={<Folder size={16} />} label="내 프로젝트" />
                <NavItem icon={<Star size={16} />} label="즐겨찾기" />
                <NavItem icon={<BookOpen size={16} />} label="내 스타일북" />

                <div className="my-3 border-t border-slate-100 mx-2" />

                <NavItem icon={<Armchair size={16} />} label="가구 라이브러리" />
                <NavItem icon={<Store size={16} />} label="브랜드 스토어" />
                <NavItem icon={<Users size={16} />} label="커뮤니티" />
                <NavItem icon={<Headphones size={16} />} label="고객센터" />
            </nav>

            {/* 하단 AI 배너 */}
            <div className="p-3">
                <div className="bg-blue-50/70 rounded-md p-5 border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                        AI 인테리어 제안
                    </div>
                    <p className="text-[13px] text-slate-500 mb-4 leading-relaxed break-keep">
                        공간 사진을 업로드하면 AI가 인테리어 아이디어를 제안해드려요.
                    </p>
                    <button className="w-full bg-white border border-blue-200 text-blue-600 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors">
                        사용해 보기 <Sparkles size={14} className="inline ml-1 mb-0.5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
