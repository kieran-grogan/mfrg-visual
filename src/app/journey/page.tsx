import JourneyMap from "@/components/JourneyMap";

export default function JourneyPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">System Journey Map</h1>
                <p className="mt-2 text-slate-600">Visualize how agents progress through the XCEL and Contracting automation stages.</p>
            </div>

            <JourneyMap />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                    <h3 className="font-bold text-amber-900">1. XCEL Onboarding</h3>
                    <p className="text-sm text-amber-800 mt-2">Agents are nudged via drip reminders to finish pre-licensing and submit their NPN.</p>
                </div>
                <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                    <h3 className="font-bold text-green-900">2. Initial Audit</h3>
                    <p className="text-sm text-green-800 mt-2">Once an NPN is received, the system verifies the producer profile in SureLC.</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <h3 className="font-bold text-blue-900">3. Contracting Flow</h3>
                    <p className="text-sm text-blue-800 mt-2">The agent is monitored as they move from "At Producer" to "BGA" and finally "Carrier" stages.</p>
                </div>
            </div>
        </div>
    );
}
