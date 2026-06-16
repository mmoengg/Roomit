import React from 'react';
import {
    Home, Folder, Star, BookOpen, Armchair, Store, Users, Headphones,
    Search, Undo, Redo, Camera, Bell, ChevronRight, Upload, MousePointer2, Share2, Sparkles, Plus
} from 'lucide-react';
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="flex h-screen w-full bg-white text-slate-900 font-sans">
            {/* 1. 왼쪽 사이드바 (LNB) */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
                {/* 로고 영역 */}
                <div className="p-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        H
                    </div>
                    <span className="text-xl font-bold tracking-tight">roomit</span>
                </div>

                {/* 새 프로젝트 버튼 */}
                <div className="px-5 pb-5">
                    <Link href="/upload" className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-colors shadow-sm shadow-blue-200">
                        <Plus size={18} strokeWidth={2.5} /> 새 프로젝트
                    </Link>
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    <NavItem icon={<Home size={20} />} label="홈" active />
                    <NavItem icon={<Folder size={20} />} label="내 프로젝트" />
                    <NavItem icon={<Star size={20} />} label="즐겨찾기" />
                    <NavItem icon={<BookOpen size={20} />} label="내 스타일북" />

                    <div className="my-5 border-t border-slate-100 mx-2" />

                    <NavItem icon={<Armchair size={20} />} label="가구 라이브러리" />
                    <NavItem icon={<Store size={20} />} label="브랜드 스토어" />
                    <NavItem icon={<Users size={20} />} label="커뮤니티" />
                    <NavItem icon={<Headphones size={20} />} label="고객센터" />
                </nav>

                {/* 하단 AI 배너 */}
                <div className="p-5">
                    <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                        <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                            AI 인테리어 제안
                        </div>
                        <p className="text-[13px] text-slate-500 mb-4 leading-relaxed break-keep">
                            공간 사진을 업로드하면 AI가 인테리어 아이디어를 제안해드려요.
                        </p>
                        <button className="w-full bg-white border border-blue-200 text-blue-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors">
                            사용해 보기 <Sparkles size={14} className="inline ml-1 mb-0.5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* 2. 메인 콘텐츠 영역 */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">

                {/* 상단 헤더 (GNB) */}
                <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-500">
                        <a href="#" className="text-slate-900">프로젝트</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">둘러보기</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">쇼룸</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">커뮤니티</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">이벤트</a>
                    </nav>

                    <div className="flex items-center gap-3 text-slate-500 ml-auto lg:ml-0">
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Search size={20} /></button>
                        <div className="h-4 w-px bg-slate-200 mx-1"></div>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Undo size={20} /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Redo size={20} /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Camera size={20} /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Bell size={20} /></button>

                        <div className="flex items-center gap-2 ml-3 cursor-pointer hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-colors">
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white text-xs overflow-hidden">
                                <img src="https://placehold.co/100x100/1e293b/ffffff?text=User" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">My Room</span>
                        </div>
                    </div>
                </header>

                {/* 대시보드 본문 */}
                <main className="flex-1 overflow-auto bg-[#FAFAFA] p-6 lg:p-10">
                    <div className="max-w-[1200px] mx-auto space-y-12">

                        {/* 히어로 섹션 */}
                        <section className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <h1 className="text-[42px] leading-[1.3] font-bold text-slate-900 tracking-tight">
                                    내 공간을 <br />
                                    나만의 <span className="text-blue-600">스타일</span>로
                                </h1>
                                <p className="text-slate-500 text-[17px] leading-relaxed break-keep">
                                    도면을 업로드하고 가구를 배치해보세요.<br />
                                    나만의 인테리어를 쉽게 완성할 수 있어요.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-4">
                                    <Link href="/upload" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm">
                                        <Upload size={18} strokeWidth={2.5} /> 도면 업로드하고 시작하기
                                    </Link>
                                    <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-4 rounded-xl font-semibold transition-colors shadow-sm">
                                        샘플 도면으로 시작하기
                                    </button>
                                </div>
                            </div>

                            {/* 도면 일러스트 목업 영역 */}
                            <div className="flex-1 relative w-full aspect-[4/3] bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-8">
                                <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                                    <span className="font-medium mb-2 text-slate-500">도면 미리보기 영역</span>
                                    <span className="text-sm">실제 도면 이미지가 렌더링됩니다.</span>
                                </div>
                                {/* 툴팁 포인트 (스타일 장식) */}
                                <div className="absolute top-10 right-10 bg-white px-4 py-2.5 rounded-xl shadow-md border border-slate-100 text-sm font-bold flex items-center gap-2 text-slate-700">
                                    <MousePointer2 size={16} className="text-blue-600" /> 가구 배치
                                </div>
                            </div>
                        </section>

                        {/* 3단계 프로세스 섹션 */}
                        <section>
                            <h2 className="text-xl font-bold mb-6 text-slate-900">3단계로 완성하는 인테리어</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StepCard
                                    step="1"
                                    title="도면 업로드"
                                    desc="도면 이미지 파일을 업로드하세요."
                                    icon={<div className="w-12 h-12 rounded-full bg-white border border-blue-100 shadow-sm flex items-center justify-center text-blue-600"><Upload size={20} /></div>}
                                />
                                <StepCard
                                    step="2"
                                    title="가구 배치 & 스타일링"
                                    desc="다양한 가구와 소품으로 공간을 꾸며보세요."
                                    icon={<div className="w-24 h-16 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-400"><Armchair size={24} /></div>}
                                />
                                <StepCard
                                    step="3"
                                    title="저장 & 공유"
                                    desc="완성한 인테리어를 저장하고 다양하게 공유해보세요."
                                    icon={<div className="flex gap-2"><div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600"><Upload size={18} className="rotate-180" /></div><div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600"><Share2 size={18} /></div></div>}
                                />
                            </div>
                        </section>

                        {/* 템플릿 & 최근 프로젝트 섹션 */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10">

                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">템플릿으로 시작하기</h2>
                                    <button className="text-sm text-blue-600 font-semibold flex items-center hover:underline">더보기 <ChevronRight size={16} /></button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                    <TemplateCard title="원룸" subtitle="14평 이하" />
                                    <TemplateCard title="아파트" subtitle="20~30평대" />
                                    <TemplateCard title="아파트" subtitle="30~40평대" />
                                    <TemplateCard title="단독주택" subtitle="40평대 이상" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">최근 프로젝트</h2>
                                    <button className="text-sm text-blue-600 font-semibold flex items-center hover:underline">전체 보기 <ChevronRight size={16} /></button>
                                </div>
                                <div className="space-y-4">
                                    <RecentProjectCard title="My Room" status="2D 편집 중" date="2024.05.20" />
                                    <RecentProjectCard title="New House" status="2D 편집 중" date="2024.05.18" />
                                    <RecentProjectCard title="Studio Interior" status="2D 편집 중" date="2024.05.15" />
                                </div>
                            </div>

                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

// ---------------------------------------------------------
// Helper Components (문법 및 구조 복원 완료)
// ---------------------------------------------------------

/* * 1. 수정된 NavItem
 * className에 템플릿 리터럴 백틱(`)을 정상적으로 적용하여 에러를 해결했습니다.
 */
function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <a
            href="#"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] transition-colors ${
                active
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
      <span className={active ? "text-blue-600" : "text-slate-400"}>
        {icon}
      </span>
            {label}
        </a>
    );
}

/* * 2. 수정된 StepCard
 * 유실되었던 컴포넌트 구조를 완벽하게 복구했습니다.
 */
function StepCard({ step, title, desc, icon }: { step: string, title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
                    {step}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{title}</h3>
            </div>
            <p className="text-slate-500 text-[14px] leading-relaxed break-keep">
                {desc}
            </p>
            {/* 그래픽/일러스트가 들어갈 하단 영역 */}
            <div className="mt-3 h-28 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                {icon}
            </div>
        </div>
    );
}

/* * 3. 템플릿 카드
 */
function TemplateCard({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="group cursor-pointer">
            <div className="aspect-square bg-white border border-slate-200 rounded-2xl mb-3 flex items-center justify-center p-3 transition-all group-hover:border-blue-400 group-hover:shadow-md">
                <div className="w-full h-full border-2 border-slate-100 rounded-lg flex items-center justify-center text-slate-300 bg-slate-50/50">
                    <span className="text-xs font-semibold">도면</span>
                </div>
            </div>
            <h4 className="font-bold text-slate-900 text-[15px]">{title}</h4>
            <p className="text-[13px] text-slate-500 mt-0.5">{subtitle}</p>
        </div>
    );
}

/* * 4. 최근 프로젝트 리스트 카드
 */
function RecentProjectCard({ title, status, date }: { title: string, status: string, date: string }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:shadow-sm transition-all">
            <div className="w-16 h-12 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-[10px] shrink-0 overflow-hidden">
                Thumb
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-[15px] truncate">{title}</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">{status}</p>
            </div>
            <div className="text-[12px] text-slate-400 shrink-0 font-medium">
                {date}
            </div>
        </div>
    );
}