"use client";

import { useState, useEffect } from "react";
import { workflows } from "@/../data/workflows";
import { Search as SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GlobalSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const filtered = workflows.filter((wf) =>
            wf.name.toLowerCase().includes(query.toLowerCase()) ||
            wf.primaryPurpose.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        setResults(filtered);
    }, [query]);

    return (
        <div className="relative px-3 mb-6">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                    type="text"
                    className="w-full bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Search workflows..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>

            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 mx-3 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden">
                    {results.map((wf) => (
                        <Link
                            key={wf.id}
                            href={`/workflows/${wf.id}`}
                            onClick={() => setQuery("")}
                            className="block p-3 hover:bg-slate-700 border-b border-slate-700 last:border-none transition-colors"
                        >
                            <div className="text-sm font-bold text-white truncate">{wf.name}</div>
                            <div className="text-xs text-slate-400 truncate">{wf.folder}</div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
