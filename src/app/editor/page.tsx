'use client';

import React, { useState, useRef } from 'react';
import {
    ChevronLeft, Undo, Redo, ZoomIn, ZoomOut,
    RotateCw, Trash2, Move, Image as ImageIcon,
    MousePointer2, Grid3x3, DoorOpen, Armchair, Type, Ruler, Settings,
    Search, Filter, Heart, Upload, Share2, Save, Bell
} from 'lucide-react';

// 1. 데이터 타입 정의
type FurnitureType = 'sofa' | 'bed' | 'table' | 'roundTable' | 'lamp' | 'rug';

interface Furniture {
    id: string;
    type: FurnitureType;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    color: string;
}

interface CatalogItem {
    type: FurnitureType;
    name: string;
    price: string;
    width: number; // 기본 가로 (px 기준, 실제는 mm 변환)
    height: number; // 기본 세로
    color: string;
    imgUrl: string;
    isRound?: boolean;
}

// 2. 가구 카탈로그 데이터 (레퍼런스 이미지 반영)
const CATALOG: CatalogItem[] = [
    { type: 'sofa', name: '모던 3인 소파', price: '890,000', width: 200, height: 80, color: 'bg-slate-200 border-slate-300', imgUrl: 'https://placehold.co/200x150/f1f5f9/94a3b8?text=Sofa' },
    { type: 'roundTable', name: '원형 거실 테이블', price: '230,000', width: 100, height: 100, color: 'bg-orange-100 border-orange-200', imgUrl: 'https://placehold.co/200x150/ffedd5/fdba74?text=Round+Table', isRound: true },
    { type: 'table', name: '우드 암체어', price: '350,000', width: 80, height: 80, color: 'bg-amber-100 border-amber-300', imgUrl: 'https://placehold.co/200x150/fef3c7/fcd34d?text=Armchair' },
    { type: 'table', name: 'TV 라운드 수납장', price: '620,000', width: 160, height: 40, color: 'bg-stone-200 border-stone-300', imgUrl: 'https://placehold.co/200x150/e7e5e4/a8a29e?text=Cabinet' },
    { type: 'lamp', name: '플로어 램프', price: '120,000', width: 40, height: 40, color: 'bg-yellow-100 border-yellow-300', imgUrl: 'https://placehold.co/200x150/fef9c3/fde047?text=Lamp', isRound: true },
    { type: 'rug', name: '러그 (베이지)', price: '150,000', width: 180, height: 140, color: 'bg-orange-50/50 border-orange-100', imgUrl: 'https://placehold.co/200x150/fff7ed/fed7aa?text=Rug' },
];

export default function EditorPage() {
    const [items, setItems] = useState<Furniture[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    // 가구 추가
    const handleAddItem = (catalogItem: CatalogItem) => {
        const newItem: Furniture = {
            id: Math.random().toString(36).substring(2, 9),
            type: catalogItem.type,
            name: catalogItem.name,
            x: 300,
            y: 200,
            width: catalogItem.width,
            height: catalogItem.height,
            rotation: 0,
            color: catalogItem.color,
        };
        setItems([...items, newItem]);
        setSelectedId(newItem.id);
    };

    // 캔버스 마우스 이벤트 로직
    const handlePointerDown = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        setSelectedId(id);
        setIsDragging(true);
        const target = e.currentTarget as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !selectedId || !canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - canvasRect.left - dragOffset.current.x;
        const newY = e.clientY - canvasRect.top - dragOffset.current.y;
        setItems(items.map(item => item.id === selectedId ? { ...item, x: newX, y: newY } : item));
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        const target = e.currentTarget as HTMLDivElement;
        if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
    };

    const handleRotate = () => {
        if (!selectedId) return;
        setItems(items.map(item => item.id === selectedId ? { ...item, rotation: (item.rotation + 90) % 360 } : item));
    };

    const handleDelete = () => {
        if (!selectedId) return;
        setItems(items.filter(item => item.id !== selectedId));
        setSelectedId(null);
    };

    const handleCanvasClick = () => setSelectedId(null);

    const handleSizeChange = (id: string, field: 'width' | 'height', value: string) => {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;
        const pxValue = numValue / 10;
        setItems(items.map(item => item.id === id ? { ...item, [field]: pxValue } : item));
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white text-slate-900 font-sans overflow-hidden">

            {/* 1. Global Header */}
            <header className="h-14 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20 bg-white">
                <div className="flex items-center gap-8">
                    <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-blue-600">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">H</div>
                        roomit
                    </a>
                    <nav className="hidden lg:flex items-center gap-6 text-[14px] font-semibold text-slate-500">
                        <a href="#" className="text-slate-900">프로젝트</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">둘러보기</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">쇼룸</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">커뮤니티</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3 text-slate-500">
                    <button className="p-1.5 hover:bg-slate-100 rounded transition-colors"><Undo size={18} /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded transition-colors"><Redo size={18} /></button>
                    <div className="h-4 w-px bg-slate-200 mx-2"></div>
                    <button className="p-1.5 hover:bg-slate-100 rounded transition-colors"><ImageIcon size={18} /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded transition-colors"><Share2 size={18} /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded transition-colors"><Save size={18} /></button>
                    <div className="flex items-center gap-2 ml-4 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
                        <img src="https://placehold.co/100x100/1e293b/ffffff?text=U" className="w-7 h-7 rounded-full" alt="User" />
                        <span className="text-sm font-semibold text-slate-700">My Room</span>
                    </div>
                </div>
            </header>

            {/* 2. Main Workspace */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Sidebar (LNB) */}
                <aside className="w-[220px] bg-white border-r border-slate-200 flex flex-col z-10 shrink-0">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-sm">프로젝트</span>
                            <button className="text-blue-600 text-[12px] font-bold hover:underline">+ 새 프로젝트</button>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                            <img src="https://placehold.co/60x40/cbd5e1/f8fafc?text=Thumb" className="w-12 h-8 rounded object-cover border border-slate-200" alt="thumb" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold truncate">My Room</p>
                                <p className="text-[11px] text-slate-500">2024.05.20 수정</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 px-3 space-y-1 mt-2">
                        <LnbItem icon={<Grid3x3 size={18} />} label="대시보드" />
                        <LnbItem icon={<Armchair size={18} />} label="3D 인테리어" active />
                        <LnbItem icon={<Grid3x3 size={18} />} label="2D 평면도" />
                        <LnbItem icon={<ImageIcon size={18} />} label="제품 목록" />
                        <LnbItem icon={<Image size={18} />} label="마이 갤러리" />
                        <LnbItem icon={<Settings size={18} />} label="설정" />
                    </nav>

                    <div className="p-4">
                        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-center">
                            <h4 className="font-bold text-[13px] mb-1">도움이 필요하신가요?</h4>
                            <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">사용 가이드와 튜토리얼을 통해 쉽게 시작해보세요.</p>
                            <button className="w-full bg-white border border-slate-300 text-[12px] font-bold py-2 rounded-lg hover:bg-slate-100">가이드 보기</button>
                        </div>
                    </div>
                </aside>

                {/* Center Area (Canvas & Steps) */}
                <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">

                    {/* Top Steps & View Toggle */}
                    <div className="bg-white border-b border-slate-200 px-8 py-4 shrink-0 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm font-semibold">
                            <div className="flex items-center gap-2 text-slate-400">
                                <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center"><Grid3x3 size={12} /></div>
                                1 공간 만들기
                            </div>
                            <div className="w-8 h-px bg-slate-300"></div>
                            <div className="flex items-center gap-2 text-blue-600">
                                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">2</div>
                                2 인테리어 꾸미기
                            </div>
                            <div className="w-8 h-px bg-slate-300"></div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center">3</div>
                                렌더링
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button className="px-4 py-1.5 text-[13px] font-bold text-slate-500 rounded-md">3D 뷰</button>
                                <button className="px-4 py-1.5 text-[13px] font-bold bg-white text-blue-600 shadow-sm rounded-md">2D 뷰</button>
                            </div>
                            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                                <button className="px-3 py-1.5 text-[13px] font-bold bg-blue-50 text-blue-600 border-r border-slate-200">m</button>
                                <button className="px-3 py-1.5 text-[13px] font-bold bg-white text-slate-500">ft</button>
                            </div>
                        </div>
                    </div>

                    {/* Canvas Wrapper */}
                    <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8" onPointerDown={handleCanvasClick}>

                        {/* Floating Left Toolbar */}
                        <div className="absolute left-6 top-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col py-2 z-20">
                            <ToolBtn icon={<MousePointer2 size={20} />} label="선택" active />
                            <ToolBtn icon={<Grid3x3 size={20} />} label="벽" />
                            <ToolBtn icon={<DoorOpen size={20} />} label="문/창" />
                            <ToolBtn icon={<Armchair size={20} />} label="가구" />
                            <ToolBtn icon={<Type size={20} />} label="텍스트" />
                            <ToolBtn icon={<Ruler size={20} />} label="치수" />
                            <div className="w-8 h-px bg-slate-100 mx-auto my-2"></div>
                            <ToolBtn icon={<Trash2 size={20} />} label="삭제" />
                            <ToolBtn icon={<Undo size={20} />} label="되돌리기" />
                        </div>

                        {/* Actual Grid Canvas */}
                        <div
                            ref={canvasRef}
                            className="w-full max-w-3xl aspect-[4/3] bg-white rounded-sm shadow-md border border-slate-300 relative overflow-hidden mx-auto"
                            style={{
                                backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* 도면 예시 박스 (임시 가이드) */}
                            <div className="absolute inset-20 border-8 border-slate-600 bg-orange-50/30 rounded flex items-center justify-center pointer-events-none opacity-50">
                                <span className="bg-white px-2 py-1 text-xs font-bold text-slate-500">도면 영역 예시</span>
                            </div>

                            {/* 렌더링된 가구들 */}
                            {items.map((item) => {
                                const isSelected = item.id === selectedId;
                                const CatalogInfo = CATALOG.find(c => c.type === item.type);

                                return (
                                    <div
                                        key={item.id}
                                        onPointerDown={(e) => handlePointerDown(e, item.id)}
                                        onPointerMove={handlePointerMove}
                                        onPointerUp={handlePointerUp}
                                        className={`absolute shadow-sm flex items-center justify-center cursor-move select-none touch-none
                      ${item.color} border-2
                      ${CatalogInfo?.isRound ? 'rounded-full' : 'rounded-sm'}
                      ${isSelected ? 'border-blue-500 shadow-lg ring-4 ring-blue-500/20 z-20' : 'border-opacity-100 z-10'}
                    `}
                                        style={{
                                            width: `${item.width}px`, height: `${item.height}px`,
                                            left: `${item.x}px`, top: `${item.y}px`,
                                            transform: `rotate(${item.rotation}deg)`,
                                            transition: isDragging ? 'none' : 'transform 0.2s',
                                        }}
                                    >
                                        <span className="text-[10px] font-bold text-slate-700/70 whitespace-nowrap px-1 pointer-events-none truncate">{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Floating Right Toolbar (Zoom) */}
                        <div className="absolute right-6 bottom-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden z-20">
                            <button className="p-3 hover:bg-slate-50 border-b border-slate-100"><ZoomIn size={18} className="text-slate-600" /></button>
                            <button className="p-3 hover:bg-slate-50 border-b border-slate-100"><ZoomOut size={18} className="text-slate-600" /></button>
                            <button className="p-3 hover:bg-slate-50"><Settings size={18} className="text-slate-600" /></button>
                        </div>
                    </div>

                    {/* Bottom Banner (Photos & AI) */}
                    <div className="h-[180px] bg-white border-t border-slate-200 shrink-0 p-4 flex gap-4 overflow-x-auto">
                        <div className="flex flex-col min-w-[400px]">
                            <span className="text-[13px] font-bold text-slate-700 mb-2">업로드한 사진</span>
                            <div className="flex gap-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-24 h-24 bg-slate-100 rounded-lg border border-slate-200 flex-shrink-0"></div>
                                ))}
                                <button className="w-24 h-24 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                                    <Upload size={20} className="mb-1" />
                                    <span className="text-[11px] font-semibold">사진 추가</span>
                                </button>
                            </div>
                        </div>
                        {/* AI Banner Mock */}
                        <div className="min-w-[300px] bg-blue-50/50 rounded-xl border border-blue-100 p-4 flex items-center justify-between">
                            <div>
                                <div className="text-blue-600 font-bold text-sm mb-1 flex items-center gap-1">
                                    <Grid3x3 size={14} /> AI 인테리어 제안
                                </div>
                                <p className="text-[12px] text-slate-500">우리집에 어울리는 인테리어 스타일을<br/>AI가 추천해드려요.</p>
                            </div>
                            <button className="bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50">제안 받기</button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar (Catalog OR Properties) */}
                <aside className="w-[320px] bg-white border-l border-slate-200 flex flex-col z-10 shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.03)]">
                    {selectedId ? (
                        // [패널 모드 A] 속성 편집 (가구가 선택되었을 때)
                        <div className="p-6 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-200">
                            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                <h3 className="font-bold text-lg text-slate-800">가구 속성 편집</h3>
                                <button onClick={() => setSelectedId(null)} className="text-sm text-slate-400 hover:text-slate-600">닫기</button>
                            </div>

                            {items.filter(i => i.id === selectedId).map(item => (
                                <div key={item.id} className="space-y-5">
                                    <div>
                                        <label className="text-[13px] font-bold text-slate-600 mb-1.5 block">가구 이름</label>
                                        <input type="text" readOnly value={item.name} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[13px] font-bold text-slate-600 mb-1.5 block">가로 (mm)</label>
                                            <input
                                                type="number" value={Math.round(item.width * 10)}
                                                onChange={(e) => handleSizeChange(item.id, 'width', e.target.value)}
                                                className="w-full bg-white border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-bold text-slate-600 mb-1.5 block">세로 (mm)</label>
                                            <input
                                                type="number" value={Math.round(item.height * 10)}
                                                onChange={(e) => handleSizeChange(item.id, 'height', e.target.value)}
                                                className="w-full bg-white border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                                        <button onClick={handleRotate} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-bold transition-colors">
                                            <RotateCw size={16} /> 회전하기
                                        </button>
                                        <button onClick={handleDelete} className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-lg text-sm font-bold transition-colors">
                                            <Trash2 size={16} /> 삭제하기
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // [패널 모드 B] 가구 카탈로그 (기본 상태)
                        <div className="flex flex-col h-full animate-in fade-in duration-200">
                            <div className="p-5 border-b border-slate-100">
                                <h2 className="font-bold text-lg mb-4 text-slate-900">가구</h2>
                                <div className="flex gap-2 mb-4">
                                    <div className="flex-1 relative">
                                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" placeholder="가구 검색" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-400" />
                                    </div>
                                    <button className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 shrink-0"><Filter size={16} /></button>
                                </div>
                                {/* 탭 메뉴 */}
                                <div className="flex gap-4 text-[13px] font-bold text-slate-400 border-b border-slate-100 overflow-x-auto pb-[-1px]">
                                    <span className="text-blue-600 border-b-2 border-blue-600 pb-2 px-1 whitespace-nowrap cursor-pointer">전체</span>
                                    <span className="pb-2 px-1 hover:text-slate-600 whitespace-nowrap cursor-pointer">소파</span>
                                    <span className="pb-2 px-1 hover:text-slate-600 whitespace-nowrap cursor-pointer">테이블</span>
                                    <span className="pb-2 px-1 hover:text-slate-600 whitespace-nowrap cursor-pointer">의자</span>
                                    <span className="pb-2 px-1 hover:text-slate-600 whitespace-nowrap cursor-pointer">수납장</span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 content-start bg-white">
                                {CATALOG.map((item, idx) => (
                                    <div key={idx} className="group cursor-pointer" onClick={() => handleAddItem(item)}>
                                        <div className="relative aspect-[4/3] bg-slate-50 border border-slate-100 rounded-xl mb-2 overflow-hidden group-hover:border-blue-400 transition-colors">
                                            <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                            <button className="absolute top-2 right-2 text-slate-300 hover:text-red-400"><Heart size={16} /></button>
                                        </div>
                                        <p className="text-[12px] font-bold text-slate-700 truncate">{item.name}</p>
                                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5">₩ {item.price}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-slate-100 shrink-0 bg-white">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                    <Upload size={16} /> 내 가구 업로드
                                </button>
                            </div>
                        </div>
                    )}
                </aside>

            </div>
        </div>
    );
}

// --- 헬퍼 컴포넌트 ---
function LnbItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] cursor-pointer transition-colors ${
            active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 font-semibold hover:bg-slate-50'
        }`}>
            <span className={active ? "text-blue-600" : "text-slate-400"}>{icon}</span>
            {label}
        </div>
    );
}

function ToolBtn({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`w-14 flex flex-col items-center justify-center gap-1.5 py-3 hover:bg-slate-50 transition-colors ${
            active ? 'text-blue-600' : 'text-slate-500'
        }`}>
            {icon}
            <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </button>
    );
}

// 아이콘 임시용
function Image(props: any) {
    return <ImageIcon {...props} />;
}