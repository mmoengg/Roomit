import React from 'react';
import { Upload, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="flex flex-col flex-1 bg-slate-50 lg:flex-row items-center gap-12 p-6 lg:p-10">
            <div className="flex-1 space-y-6 max-w-[1200px]">
                <h1 className="text-[42px] leading-[1.3] font-bold text-slate-900 tracking-tight">
                    내 공간을 <br />
                    나만의 <span className="text-blue-600">스타일</span>로
                </h1>
                <p className="text-slate-500 leading-relaxed break-keep">
                    도면을 업로드하고 가구를 배치해보세요.<br />
                    나만의 인테리어를 쉽게 완성할 수 있어요.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                    <Link
                        href="/upload"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-7 py-3 rounded-md  flex items-center gap-2 transition-colors "
                    >
                        <Upload size={16} strokeWidth={2.5} /> 도면 업로드하고 시작하기
                    </Link>
                    {/* <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-4 rounded-md font-semibold transition-colors ">
                        샘플 도면으로 시작하기
                    </button> */}
                </div>
            </div>
        </section>
    );
}
