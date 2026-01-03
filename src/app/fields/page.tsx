import { fields } from "@/../data/fields";
import { workflows } from "@/../data/workflows";
import { Search, Shield, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function FieldsPage() {
    const confirmedFields = fields.filter(f => f.type === 'Confirmed');
    const observedFields = fields.filter(f => f.type === 'Observed/Implied');

    const getUsage = (fieldName: string) => {
        return workflows.filter(wf =>
            wf.readsFields.includes(fieldName) || wf.writesFields.includes(fieldName)
        );
    };

    return (
        <div className="space-y-12 pb-20">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Custom Field Directory</h1>
                <p className="mt-2 text-slate-600">A map of all data points used throughout the GHL XCEL & Contracting automations.</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Confirmed Fields
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {confirmedFields.map((field) => (
                        <FieldCard key={field.name} field={field} usage={getUsage(field.name)} />
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Observed / Implied Fields
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {observedFields.map((field) => (
                        <FieldCard key={field.name} field={field} usage={getUsage(field.name)} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function FieldCard({ field, usage }: { field: any, usage: any[] }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 font-mono">{field.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{field.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {usage.length > 0 ? (
                        usage.map(wf => (
                            <Link
                                key={wf.id}
                                href={`/workflows/${wf.id}`}
                                className="inline-flex items-center px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
                                title={`Used in: ${wf.name}`}
                            >
                                {wf.name.split(' ').slice(0, 3).join(' ')}...
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        ))
                    ) : (
                        <span className="text-xs text-slate-400 italic">No direct usage found in builder screenshots</span>
                    )}
                </div>
            </div>
        </div>
    );
}
