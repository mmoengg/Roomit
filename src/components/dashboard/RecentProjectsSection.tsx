import React from 'react';
import { ChevronRight } from 'lucide-react';

interface RecentProjectCardProps {
    title: string;
    status: string;
    date: string;
}

function RecentProjectCard({ title, status, date }: RecentProjectCardProps) {
    return (
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-md-2xl cursor-pointer hover:border-blue-400 hover: transition-all">
            <div className="w-16 h-12 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center text-slate-400 text-[10px] shrink-0 overflow-hidden">
                Thumb
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate">{title}</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">{status}</p>
            </div>
            <div className="text-[12px] text-slate-400 shrink-0 font-medium">
                {date}
            </div>
        </div>
    );
}

export default function RecentProjectsSection() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">최근 프로젝트</h2>
                <button className="text-sm text-blue-600 font-semibold flex items-center hover:underline">
                    전체 보기 <ChevronRight size={16} />
                </button>
            </div>
            <div className="space-y-4">
                <RecentProjectCard title="My Room" status="2D 편집 중" date="2024.05.20" />
                <RecentProjectCard title="New House" status="2D 편집 중" date="2024.05.18" />
                <RecentProjectCard title="Studio Interior" status="2D 편집 중" date="2024.05.15" />
            </div>
        </div>
    );
}
