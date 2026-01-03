"use client";

import { useState } from "react";
import Link from "next/link";
import { workflows } from "@/../data/workflows";
import { Search, Filter, ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function WorkflowsIndex() {
    const [search, setSearch] = useState("");
    const [activeFolder, setActiveFolder] = useState<string | null>(null);

    const folders = ["XCEL Onboarding", "Contracting", "Root"];

    const filteredWorkflows = workflows.filter((wf) => {
        const matchesSearch =
            wf.name.toLowerCase().includes(search.toLowerCase()) ||
            wf.primaryPurpose.toLowerCase().includes(search.toLowerCase());
        const matchesFolder = activeFolder ? wf.folder === activeFolder : true;
        return matchesSearch && matchesFolder;
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Workflows Index</h1>
                <p className="mt-2 text-slate-600">Search and filter all automations in the system.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or purpose..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveFolder(null)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                            activeFolder === null
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        )}
                    >
                        All
                    </button>
                    {folders.map((folder) => (
                        <button
                            key={folder}
                            onClick={() => setActiveFolder(folder)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                activeFolder === folder
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            )}
                        >
                            {folder}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWorkflows.map((wf) => (
                    <Link
                        key={wf.id}
                        href={`/workflows/${wf.id}`}
                        className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
                                wf.folder === "XCEL Onboarding" ? "bg-amber-100 text-amber-700" :
                                    wf.folder === "Contracting" ? "bg-blue-100 text-blue-700" :
                                        "bg-slate-100 text-slate-600"
                            )}>
                                {wf.folder}
                            </span>
                            <span className={cn(
                                "text-xs font-medium px-2 py-0.5 rounded",
                                wf.status === "Published" ? "bg-green-100 text-green-700" :
                                    wf.status === "Draft" ? "bg-slate-100 text-slate-700" :
                                        "bg-red-100 text-red-700"
                            )}>
                                {wf.status}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {wf.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                            {wf.primaryPurpose}
                        </p>
                        <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                    </Link>
                ))}
            </div>

            {filteredWorkflows.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500">No workflows found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
