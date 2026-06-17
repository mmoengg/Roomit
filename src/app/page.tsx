import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import HeroSection from '@/components/dashboard/HeroSection';
import ProcessSection from '@/components/dashboard/ProcessSection';
import TemplatesSection from '@/components/dashboard/TemplatesSection';
import RecentProjectsSection from '@/components/dashboard/RecentProjectsSection';

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-screen w-full bg-white text-slate-900 font-sans">
            <Header />
            <div className="flex flex-1  min-w-0 overflow-hidden bg-white">
                <Sidebar />
                <main className="flex flex-1 overflow-auto">
                    <div className="flex flex-1 flex-col w-full">
                        <HeroSection />
                        <ProcessSection />
                        <section className="p-6 pt-0 lg:p-10 lg:pt-0 max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2">
                                <TemplatesSection />
                            </div>
                            <div>
                                <RecentProjectsSection />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}