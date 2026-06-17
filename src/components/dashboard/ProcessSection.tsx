import React from 'react';
import { Upload, Armchair, Share2 } from 'lucide-react';

interface StepCardProps {
    step: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
}

function StepCard({ step, title, desc, icon }: StepCardProps) {
    return (
        <div className="bg-white p-6 rounded-md-2xl border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
                    {step}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{title}</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed break-keep">
                {desc}
            </p>
            {/* 그래픽/일러스트가 들어갈 하단 영역 */}
            <div className="mt-3 h-28 bg-slate-50 rounded-md flex items-center justify-center border border-slate-100">
                {icon}
            </div>
        </div>
    );
}

export default function ProcessSection() {
    return (
        <section className="p-6 lg:p-10 max-w-[1200px]">
            <h2 className="text-xl font-bold mb-6 text-slate-900">3단계로 완성하는 인테리어</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StepCard
                    step="1"
                    title="도면 업로드"
                    desc="도면 이미지 파일을 업로드하세요."
                    icon={
                        <div className="w-12 h-12 rounded-full bg-white border border-blue-100  flex items-center justify-center text-blue-600">
                            <Upload size={20} />
                        </div>
                    }
                />
                <StepCard
                    step="2"
                    title="가구 배치 & 스타일링"
                    desc="다양한 가구와 소품으로 공간을 꾸며보세요."
                    icon={
                        <div className="w-24 h-16 bg-white border border-slate-200 rounded-md  flex items-center justify-center text-slate-400">
                            <Armchair size={24} />
                        </div>
                    }
                />
                <StepCard
                    step="3"
                    title="저장 & 공유"
                    desc="완성한 인테리어를 저장하고 다양하게 공유해보세요."
                    icon={
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200  flex items-center justify-center text-slate-600">
                                <Upload size={18} className="rotate-180" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200  flex items-center justify-center text-slate-600">
                                <Share2 size={18} />
                            </div>
                        </div>
                    }
                />
            </div>
        </section>
    );
}
