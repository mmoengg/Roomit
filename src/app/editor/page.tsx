'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronLeft, Download, Undo, Redo, ZoomIn, ZoomOut,
    Sofa, BedDouble, Square, Circle, RotateCw, Trash2, Move, Image as ImageIcon
} from 'lucide-react';
import Link from "next/link";

// 1. 가구 데이터 타입 정의
type FurnitureType = 'sofa' | 'bed' | 'table' | 'roundTable';

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
    width: number;
    height: number;
    color: string;
    icon: React.ElementType;
    isRound?: boolean;
}

// 2. 사이드바 카탈로그 (초기 크기는 px 단위)
const CATALOG: CatalogItem[] = [
    { type: 'sofa', name: '3인용 소파', width: 200, height: 80, color: 'bg-blue-100 border-blue-300', icon: Sofa },
    { type: 'bed', name: '퀸 사이즈 침대', width: 150, height: 200, color: 'bg-indigo-100 border-indigo-300', icon: BedDouble },
    { type: 'table', name: '다이닝 테이블', width: 140, height: 80, color: 'bg-amber-100 border-amber-300', icon: Square },
    { type: 'roundTable', name: '원형 테이블', width: 100, height: 100, color: 'bg-orange-100 border-orange-300', icon: Circle, isRound: true },
];

export default function EditorPage() {
    const [items, setItems] = useState<Furniture[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    // 배경 도면 이미지 상태
    const [bgImage, setBgImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    // 드래그 이벤트
    const handlePointerDown = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        setSelectedId(id);
        setIsDragging(true);

        const target = e.currentTarget as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !selectedId || !canvasRef.current) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - canvasRect.left - dragOffset.current.x;
        const newY = e.clientY - canvasRect.top - dragOffset.current.y;

        setItems(items.map(item =>
            item.id === selectedId ? { ...item, x: newX, y: newY } : item
        ));
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        const target = e.currentTarget as HTMLDivElement;
        if (target.hasPointerCapture(e.pointerId)) {
            target.releasePointerCapture(e.pointerId);
        }
    };

    // 가구 회전 & 삭제
    const handleRotate = () => {
        if (!selectedId) return;
        setItems(items.map(item =>
            item.id === selectedId ? { ...item, rotation: (item.rotation + 90) % 360 } : item
        ));
    };

    const handleDelete = () => {
        if (!selectedId) return;
        setItems(items.filter(item => item.id !== selectedId));
        setSelectedId(null);
    };

    const handleCanvasClick = () => {
        setSelectedId(null);
    };

    // [신규] 배경 도면 업로드 핸들러
    const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setBgImage(url);
        }
    };

    // [신규] 가구 크기 변경 핸들러 (패널에서 수정 시 호출)
    const handleSizeChange = (id: string, field: 'width' | 'height', value: string) => {
        const numValue = parseInt(value, 10);
        // 입력값이 유효하지 않으면 무시 (너무 작거나 숫자가 아닌 경우 방지)
        if (isNaN(numValue)) return;

        // 화면상의 px = 실제 mm / 10 으로 단순 계산
        const pxValue = numValue / 10;

        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: pxValue } : item
        ));
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#FAFAFA] text-slate-900 font-sans overflow-hidden">

            {/* 1. 상단 툴바 */}
            <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-10 relative shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/upload" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold">
                        <ChevronLeft size={18} /> 이전
                    </Link>
                    <div className="h-4 w-px bg-slate-200 mx-1"></div>
                    <span className="font-bold text-slate-800 text-[15px]">도면 배치 에디터</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="실행 취소"><Undo size={18} /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="다시 실행"><Redo size={18} /></button>
                    <div className="h-4 w-px bg-slate-200 mx-1"></div>

                    {/* 도면 업로드 버튼 */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleBgUpload}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors text-sm font-semibold border border-blue-200"
                        title="배경 도면 불러오기"
                    >
                        <ImageIcon size={16} /> 도면 불러오기
                    </button>

                    <div className="h-4 w-px bg-slate-200 mx-1"></div>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="축소"><ZoomOut size={18} /></button>
                    <span className="text-sm font-medium w-12 text-center">100%</span>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="확대"><ZoomIn size={18} /></button>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
                    <Download size={16} /> 저장하기
                </button>
            </header>

            {/* 2. 메인 워크스페이스 */}
            <div className="flex-1 flex overflow-hidden">

                {/* 왼쪽 가구 라이브러리 (LNB) */}
                <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm">
                    <div className="p-4 border-b border-slate-100">
                        <h2 className="font-bold text-slate-800">가구 라이브러리</h2>
                        <p className="text-xs text-slate-500 mt-1">클릭하여 도면에 추가하세요</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 content-start">
                        {CATALOG.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleAddItem(item)}
                                    className="bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-slate-600 hover:text-blue-600"
                                >
                                    <Icon size={24} strokeWidth={1.5} />
                                    <span className="text-[11px] font-semibold text-center">{item.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </aside>

                {/* 중앙 캔버스 영역 */}
                <main className="flex-1 relative bg-slate-100 overflow-hidden" onPointerDown={handleCanvasClick}>

                    {/* 모눈종이 및 배경 이미지 영역 */}
                    <div
                        ref={canvasRef}
                        className="absolute inset-4 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                        style={{
                            backgroundImage: bgImage ? `url(${bgImage})` : 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                            backgroundSize: bgImage ? 'contain' : '20px 20px',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {/* 배경이 없을 때만 안내 텍스트 표시 */}
                        {!bgImage && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none select-none">
                                <Move size={48} className="mb-4 opacity-50" />
                                <p className="font-bold text-lg">상단의 [도면 불러오기] 버튼을 눌러 배경을 설정하세요.</p>
                                <p className="text-sm">왼쪽에서 가구를 클릭해 배치해볼 수 있습니다.</p>
                            </div>
                        )}

                        {/* 배치된 가구들 렌더링 */}
                        {items.map((item) => {
                            const isSelected = item.id === selectedId;
                            const CatalogInfo = CATALOG.find(c => c.type === item.type);

                            return (
                                <div
                                    key={item.id}
                                    onPointerDown={(e) => handlePointerDown(e, item.id)}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    className={`absolute border-2 shadow-sm flex items-center justify-center cursor-move select-none touch-none
                    ${item.color} 
                    ${CatalogInfo?.isRound ? 'rounded-full' : 'rounded-lg'}
                    ${isSelected ? 'border-blue-500 shadow-md ring-4 ring-blue-500/20 z-20' : 'border-opacity-50 z-10'}
                  `}
                                    style={{
                                        width: `${item.width}px`,
                                        height: `${item.height}px`,
                                        left: `${item.x}px`,
                                        top: `${item.y}px`,
                                        transform: `rotate(${item.rotation}deg)`,
                                        transition: isDragging ? 'none' : 'transform 0.2s',
                                    }}
                                >
                  <span className="text-xs font-bold text-slate-700/70 whitespace-nowrap px-1 overflow-hidden truncate pointer-events-none">
                    {item.name}
                  </span>

                                    {isSelected && (
                                        <div
                                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1.5 rounded-lg flex items-center gap-1 shadow-xl pointer-events-auto"
                                            style={{ transform: `translateX(-50%) rotate(-${item.rotation}deg)` }}
                                        >
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleRotate(); }}
                                                className="p-1.5 hover:bg-slate-700 rounded-md transition-colors"
                                                title="회전 (90도)"
                                            >
                                                <RotateCw size={14} />
                                            </button>
                                            <div className="w-px h-4 bg-slate-600 mx-0.5"></div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                                                className="p-1.5 hover:bg-red-500 text-slate-300 hover:text-white rounded-md transition-colors"
                                                title="삭제"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </main>

                {/* 오른쪽 속성 패널 */}
                {selectedId && (
                    <aside className="w-64 bg-white border-l border-slate-200 p-5 flex flex-col z-10 shadow-sm animate-in slide-in-from-right-4 duration-200">
                        <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">속성 편집</h3>
                        {items.filter(i => i.id === selectedId).map(item => (
                            <div key="props" className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 mb-1 block">가구 이름</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={item.name}
                                        className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 outline-none cursor-not-allowed"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 mb-1 block">가로 (mm)</label>
                                        <input
                                            type="number"
                                            value={Math.round(item.width * 10)}
                                            onChange={(e) => handleSizeChange(item.id, 'width', e.target.value)}
                                            className="w-full bg-white border border-slate-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 mb-1 block">세로 (mm)</label>
                                        <input
                                            type="number"
                                            value={Math.round(item.height * 10)}
                                            onChange={(e) => handleSizeChange(item.id, 'height', e.target.value)}
                                            className="w-full bg-white border border-slate-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                                    * 수치를 변경하면 캔버스 상의 가구 크기가 즉시 조절됩니다.
                                </p>
                            </div>
                        ))}
                    </aside>
                )}
            </div>
        </div>
    );
}