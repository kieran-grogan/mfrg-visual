import Link from "next/link";
import { notFound } from "next/navigation";
import { workflows } from "@/../data/workflows";
import { ChevronLeft, Info, Zap, Settings, RefreshCcw, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
    return workflows.map((wf) => ({
        id: wf.id,
    }));
}

export default async function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const workflow = workflows.find((wf) => wf.id === id);

    if (!workflow) {
        notFound();
    }

    // Dynamically import the MDX content using a more robust path
    const Content = dynamic(() => import(`../../../content/workflows/${id}.mdx`), {
        loading: () => <div className="animate-pulse flex space-y-4 flex-col">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>,
    });

    return (
        <div className="space-y-10 pb-20">
            <Link
                href="/workflows"
                className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors group"
            >
                <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Workflows
            </Link>

            <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {workflow.folder}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${workflow.status === 'Published' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                        {workflow.status}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {workflow.name}
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-3xl">
                    {workflow.primaryPurpose}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 space-y-12">
                    <section className="bg-[var(--card-bg)] p-10 rounded-[2rem] border border-[var(--card-border)] shadow-xl shadow-slate-900/10 transition-colors">
                        <div className="prose prose-slate max-w-none prose-headings:scroll-mt-20">
                            <Content />
                        </div>
                    </section>

                    {workflow.screenshots.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <Settings className="h-6 w-6 text-slate-400" />
                                Visual Builder Map
                            </h2>
                            <div className="grid grid-cols-1 gap-8">
                                {workflow.screenshots.map((s, idx) => (
                                    <div key={idx} className="bg-slate-100 p-4 rounded-3xl border border-slate-200 overflow-hidden group">
                                        <img
                                            src={`/assets/workflows/${s}`}
                                            alt={`${workflow.name} screenshot ${idx + 1}`}
                                            className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-700 group-hover:scale-[1.01]"
                                        />
                                        <div className="mt-4 text-xs text-slate-500 text-center font-medium">
                                            Canvas View: Phase {idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="lg:col-span-4 sticky top-8 space-y-8">
                    <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-800 space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                                <Zap className="h-5 w-5 text-blue-400 fill-blue-400" />
                                Technical Specs
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">Entrance Triggers</label>
                                    <div className="space-y-2">
                                        {workflow.triggers.map((t, idx) => (
                                            <div key={idx} className="text-sm bg-slate-800/50 text-slate-300 px-4 py-2.5 rounded-xl border border-slate-700/50 font-medium">
                                                {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {workflow.readsFields.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">Conditions (Reads)</label>
                                        <div className="space-y-2">
                                            {workflow.readsFields.map((f, idx) => (
                                                <div key={idx} className="text-sm bg-blue-500/10 text-blue-300 px-4 py-2.5 rounded-xl border border-blue-500/20 font-mono">
                                                    {f}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {workflow.writesFields.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">Updates (Writes)</label>
                                        <div className="space-y-2">
                                            {workflow.writesFields.map((f, idx) => (
                                                <div key={idx} className="text-sm bg-emerald-500/10 text-emerald-300 px-4 py-2.5 rounded-xl border border-emerald-500/20 font-mono">
                                                    {f}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {(workflow.enrollsWorkflows.length > 0 || workflow.removesWorkflows.length > 0) && (
                            <div className="pt-6 border-t border-slate-800">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-4">Automation Chain</label>
                                <div className="space-y-3">
                                    {workflow.enrollsWorkflows.map((wid, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-xs text-blue-400 bg-blue-400/5 p-3 rounded-xl border border-blue-400/10">
                                            <RefreshCcw className="h-4 w-4" />
                                            <div className="flex flex-col">
                                                <span className="text-slate-500 font-bold uppercase text-[8px]">Enrolls</span>
                                                <span className="font-semibold truncate max-w-[150px]">{wid}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {workflow.removesWorkflows.map((wid, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-xs text-rose-400 bg-rose-400/5 p-3 rounded-xl border border-rose-400/10">
                                            <RefreshCcw className="h-4 w-4" />
                                            <div className="flex flex-col">
                                                <span className="text-slate-500 font-bold uppercase text-[8px]">Removes</span>
                                                <span className="font-semibold truncate max-w-[150px]">{wid}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
