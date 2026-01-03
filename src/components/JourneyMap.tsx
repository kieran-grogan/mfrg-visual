"use client";

import React, { useCallback } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Position,
    Background,
    Controls,
    Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import Link from 'next/link';

const initialNodes: Node[] = [
    // XCEL SECTION
    {
        id: 'xcel-start',
        data: { label: 'Intake: Unlicensed (XCEL)', sub: 'WF-XCEL-02', slug: 'wf-xcel-02-intake-unlicensed-xcel' },
        position: { x: 50, y: 100 },
        type: 'custom',
        sourcePosition: Position.Right,
    },
    {
        id: 'xcel-drip',
        data: { label: 'XCEL Drip Reminders', sub: 'WF-XCEL-03', slug: 'wf-xcel-03-xcel-drip-reminders' },
        position: { x: 300, y: 100 },
        type: 'custom',
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: 'xcel-done',
        data: { label: 'Completion & Transition', sub: 'WF-XCEL-06', slug: 'wf-xcel-06-completion-transition-npn-form' },
        position: { x: 550, y: 100 },
        type: 'custom',
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },

    // TRANSITION
    {
        id: 'opp-created',
        data: { label: 'Opportunity Created', color: 'bg-green-600' },
        position: { x: 800, y: 100 },
        type: 'milestone',
        targetPosition: Position.Left,
        sourcePosition: Position.Bottom,
    },

    // CONTRACTING SECTION
    {
        id: 'con-no-profile',
        data: { label: 'No Profile (Audit)', sub: 'WF-CON-01', slug: 'wf-con-01-new-agent-enters-stage-no-profile' },
        position: { x: 800, y: 250 },
        type: 'custom',
        targetPosition: Position.Top,
        sourcePosition: Position.Right,
    },
    {
        id: 'con-at-producer',
        data: { label: 'At Producer (Monitor)', sub: 'WF-CON-03', slug: 'wf-con-03-monitor-agent-stage-at-producer-published' },
        position: { x: 1050, y: 250 },
        type: 'custom',
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: 'con-bga',
        data: { label: 'BGA Stage', sub: 'WF-CON-06', slug: 'wf-con-06-monitor-bga-to-carrier-stage' },
        position: { x: 1300, y: 250 },
        type: 'custom',
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
    },
    {
        id: 'con-carrier',
        data: { label: 'Carrier Stage', color: 'bg-blue-600' },
        position: { x: 1550, y: 250 },
        type: 'milestone',
        targetPosition: Position.Left,
    },

    // SIDEBAR INPUTS
    {
        id: 'licensed-intake',
        data: { label: 'Licensed Intake', sub: 'WF-CON-09', slug: 'wf-con-09-licensed-intake-profile-stage' },
        position: { x: 550, y: 350 },
        type: 'custom',
        sourcePosition: Position.Right,
    }
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: 'xcel-start', target: 'xcel-drip', animated: true },
    { id: 'e2-3', source: 'xcel-drip', target: 'xcel-done', animated: true },
    { id: 'e3-4', source: 'xcel-done', target: 'opp-created', animated: true },
    { id: 'e4-5', source: 'opp-created', target: 'con-no-profile', animated: true },
    { id: 'e5-6', source: 'con-no-profile', target: 'con-at-producer', animated: true },
    { id: 'e6-7', source: 'con-at-producer', target: 'con-bga', animated: true },
    { id: 'e7-8', source: 'con-bga', target: 'con-carrier', animated: true },
    { id: 'e9-5', source: 'licensed-intake', target: 'con-no-profile', animated: true, style: { stroke: '#fbbf24' } },
];

const CustomNode = ({ data }: any) => (
    <Link href={`/workflows/${data.slug}`} className="block">
        <div className="px-4 py-3 shadow-lg rounded-xl bg-white border-2 border-slate-200 hover:border-blue-500 transition-all min-w-[180px]">
            <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-slate-300" />
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-tight mb-1">{data.sub}</div>
            <div className="text-sm font-bold text-slate-900 leading-tight">{data.label}</div>
            <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-slate-300" />
        </div>
    </Link>
);

const MilestoneNode = ({ data }: any) => (
    <div className={`px-6 py-4 shadow-xl rounded-full ${data.color || 'bg-slate-800'} text-white border-4 border-white min-w-[150px] text-center`}>
        <Handle type="target" position={Position.Left} className="opacity-0" />
        <div className="text-sm font-extrabold uppercase tracking-widest">{data.label}</div>
        <Handle type="source" position={Position.Right} className="opacity-0" />
        <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
);

const nodeTypes = {
    custom: CustomNode,
    milestone: MilestoneNode,
};

export default function JourneyMap() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className="w-full h-[600px] bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-inner relative">
            <div className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-sm pointer-events-none">
                <h2 className="text-lg font-bold text-slate-900">Interactive Journey Map</h2>
                <p className="text-xs text-slate-500">Click any workflow node to view deep logic.</p>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background color="#cbd5e1" gap={20} />
                <Controls />
            </ReactFlow>
        </div>
    );
}
