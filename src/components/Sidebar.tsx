"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { workflows } from "@/../data/workflows";
import { useState } from "react";
import { Home, Map, Layers, HelpCircle, Settings, ChevronRight, Menu, X } from "lucide-react";
import GlobalSearch from "./Search";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Journey Map", href: "/journey", icon: Map },
        { name: "Workflows", href: "/workflows", icon: Layers },
        { name: "Custom Fields", href: "/fields", icon: Settings },
        { name: "Troubleshooting", href: "/troubleshooting", icon: HelpCircle },
        { name: "Maintenance", href: "/how-to-update", icon: Settings },
    ];

    const workflowFolders = ['XCEL Onboarding', 'Contracting', 'Root'];

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between px-6 h-16 bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
                <span className="text-lg font-bold">GHL Visual Aid</span>
                <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white transition-colors">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col h-full",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="hidden lg:flex h-16 items-center px-8 border-b border-slate-800">
                    <span className="text-xl font-bold text-white tracking-tight">GHL Visual Aid</span>
                </div>

                <div className="flex-1 overflow-y-auto py-8 space-y-10">
                    <GlobalSearch />

                    <nav className="px-5 space-y-1.5">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeSidebar}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-xl transition-all",
                                    pathname === item.href
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "hover:bg-slate-800/50 hover:text-white"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="space-y-6">
                        <h3 className="px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                            Automation Folders
                        </h3>
                        <div className="space-y-8 px-2">
                            {workflowFolders.map((folder) => (
                                <div key={folder} className="space-y-2">
                                    <div className="px-4 text-xs font-bold text-slate-400 flex items-center gap-2">
                                        <ChevronRight className="h-3 w-3 text-blue-500" />
                                        {folder}
                                    </div>
                                    <div className="pl-6 space-y-1.5 border-l border-slate-800/50 ml-5">
                                        {workflows
                                            .filter((wf) => wf.folder === folder)
                                            .map((wf) => (
                                                <Link
                                                    key={wf.id}
                                                    href={`/workflows/${wf.id}`}
                                                    onClick={closeSidebar}
                                                    className={cn(
                                                        "block px-4 py-2 text-xs rounded-lg transition-all truncate",
                                                        pathname === `/workflows/${wf.id}`
                                                            ? "bg-slate-800 text-blue-400 font-bold border border-slate-700/50"
                                                            : "text-slate-500 hover:text-white hover:bg-slate-800/30"
                                                    )}
                                                    title={wf.name}
                                                >
                                                    {wf.name}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
