import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TemplateCardProps {
    title: string;
    subtitle: string;
}

function TemplateCard({ title, subtitle }: TemplateCardProps) {
    return (
        <div className="group cursor-pointer">
            <div className="aspect-square bg-white border border-slate-200 rounded-md-2xl mb-3 flex items-center justify-center p-3 transition-all group-hover:border-blue-400 group-hover:shadow-md">
                <div className="w-full h-full border-2 border-slate-100 rounded-md flex items-center justify-center text-slate-300 bg-slate-50/50">
                    <span className="text-xs font-semibold">도면</span>
                </div>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
            <p className="text-[13px] text-slate-500 mt-0.5">{subtitle}</p>
        </div>
    );
}

export default function TemplatesSection() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">템플릿으로 시작하기</h2>
                <button className="text-sm text-blue-600 font-semibold flex items-center hover:underline">
                    더보기 <ChevronRight size={16} />
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <TemplateCard title="원룸" subtitle="14평 이하" />
                <TemplateCard title="아파트" subtitle="20~30평대" />
                <TemplateCard title="아파트" subtitle="30~40평대" />
                <TemplateCard title="단독주택" subtitle="40평대 이상" />
            </div>
        </div>
    );
}
