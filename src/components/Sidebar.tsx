"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { workflows } from "@/../data/workflows";
import { Home, Map, Layers, HelpCircle, Settings, ChevronRight } from "lucide-react";
import GlobalSearch from "./Search";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Journey Map", href: "/journey", icon: Map },
        { name: "Workflows", href: "/workflows", icon: Layers },
        { name: "Custom Fields", href: "/fields", icon: Settings },
        { name: "Troubleshooting", href: "/troubleshooting", icon: HelpCircle },
        { name: "Maintenance", href: "/how-to-update", icon: Settings },
    ];

    const workflowFolders = ['XCEL Onboarding', 'Contracting', 'Root'];

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 text-slate-300 border-r border-slate-800">
            <div className="flex h-16 items-center px-6 border-b border-slate-800">
                <span className="text-xl font-bold text-white tracking-tight">GHL Visual Aid</span>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-8">
                <GlobalSearch />

                <nav className="px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                pathname === item.href
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="space-y-4">
                    <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Workflow Folders
                    </h3>
                    <div className="space-y-6">
                        {workflowFolders.map((folder) => (
                            <div key={folder} className="space-y-1">
                                <div className="px-3 text-xs font-medium text-slate-400 py-1 flex items-center gap-2">
                                    <ChevronRight className="h-3 w-3" />
                                    {folder}
                                </div>
                                <div className="pl-6 space-y-1 border-l border-slate-800 ml-4">
                                    {workflows
                                        .filter((wf) => wf.folder === folder)
                                        .map((wf) => (
                                            <Link
                                                key={wf.id}
                                                href={`/workflows/${wf.id}`}
                                                className={cn(
                                                    "block px-3 py-1.5 text-xs rounded-md transition-colors truncate",
                                                    pathname === `/workflows/${wf.id}`
                                                        ? "bg-slate-800 text-blue-400 font-semibold"
                                                        : "hover:text-white"
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
    );
}
