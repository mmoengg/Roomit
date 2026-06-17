'use client'; // 상태 관리를 위해 클라이언트 컴포넌트로 선언합니다.

import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, X, ArrowRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import Link from "next/link";

export default function UploadPage() {
    // 드래그 앤 드롭 및 파일 상태 관리를 위한 명확한 State 정의
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 1. 파일 선택 이벤트 (클릭하여 찾기)
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) processFile(file);
    };

    // 2. 드래그 이벤트 (화면에 파일 끌어오기)
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    // 3. 드롭 이벤트 (마우스 버튼 놓기)
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    // 4. 파일 처리 공통 로직 (이미지 여부 검증 및 미리보기 생성)
    const processFile = (file: File) => {
        // 실제 서비스 적용을 위해 이미지 타입만 필터링합니다.
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일(JPG, PNG)만 업로드 가능합니다.');
            return;
        }
        setSelectedFile(file);

        // 파일 읽기 (미리보기용 URL 생성)
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // 5. 선택 취소 로직
    const handleClearFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // input 초기화
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#FAFAFA] text-slate-900 font-sans">

            {/* 상단 헤더 영역 */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0">
                <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold">
                    <ChevronLeft size={20} />
                    대시보드로 돌아가기
                </Link>
                <div className="ml-auto flex items-center gap-2 text-sm font-bold">
                    <span className="text-blue-600">1. 도면 업로드</span>
                    <span className="text-slate-300">-----</span>
                    <span className="text-slate-400">2. 가구 배치</span>
                </div>
            </header>

            {/* 메인 업로드 콘텐츠 영역 */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-3xl bg-white p-10 rounded-md-3xl border border-slate-200 ">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">도면 이미지 업로드</h1>
                        <p className="text-slate-500 text-sm">
                            JPG, PNG 형식의 평면도 이미지를 업로드해 주세요.<br />
                            고해상도 이미지일수록 AI가 더 정확하게 공간을 인식합니다.
                        </p>
                    </div>

                    {/* 파일이 없는 경우: 드래그 앤 드롭 영역 표시 */}
                    {!previewUrl ? (
                        <div
                            className={`relative border-2 border-dashed rounded-md-2xl p-12 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer min-h-[360px]
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />

                            <div className="w-20 h-20 bg-white rounded-full  flex items-center justify-center text-blue-500 mb-6">
                                <UploadCloud size={40} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-2">클릭하거나 파일을 이곳으로 드래그하세요</h3>
                            <p className="text-sm text-slate-500 font-medium">최대 파일 크기: 10MB</p>
                        </div>
                    ) : (
                        // 파일이 있는 경우: 이미지 미리보기 화면 표시
                        <div className="flex flex-col items-center">
                            <div className="relative w-full aspect-video bg-slate-100 rounded-md-2xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center mb-6">
                                <img
                                    src={previewUrl}
                                    alt="도면 미리보기"
                                    className="max-w-full max-h-full object-contain"
                                />
                                {/* 우측 상단 X 버튼으로 초기화 */}
                                <button
                                    onClick={handleClearFile}
                                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur text-slate-600 hover:text-red-500 rounded-full flex items-center justify-center  transition-colors"
                                >
                                    <X size={18} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* 업로드된 파일 정보 */}
                            <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-md p-4">
                                <div className="w-10 h-10 bg-white border border-slate-200 rounded-md flex items-center justify-center text-blue-600 shrink-0">
                                    <ImageIcon size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate">{selectedFile?.name}</p>
                                    <p className="text-[12px] text-slate-500">{(selectedFile?.size ? selectedFile.size / (1024 * 1024) : 0).toFixed(2)} MB</p>
                                </div>
                                <Link href="/editor" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold flex items-center gap-2 transition-colors text-sm">
                                    다음 단계로 <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}