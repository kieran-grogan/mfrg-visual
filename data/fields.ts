export interface FieldMetadata {
    name: string;
    type: 'Confirmed' | 'Observed/Implied';
    description: string;
}

export const fields: FieldMetadata[] = [
    {
        name: 'Onboarding | XCEL Started',
        type: 'Confirmed',
        description: 'Updated when agent logs into XCEL.',
    },
    {
        name: 'Onboarding | XCEL Paid',
        type: 'Confirmed',
        description: 'Updated when XCEL purchase/access is confirmed.',
    },
    {
        name: 'Onboarding | Licensed',
        type: 'Confirmed',
        description: 'Updated upon XCEL completion and NPN form submission.',
    },
    {
        name: 'Upline Highest Stage',
        type: 'Confirmed',
        description: 'Used to track the progress of the agent through contracting stages.',
    },
    {
        name: 'XCEL Last Touch',
        type: 'Confirmed',
        description: 'Tracks the last date of interaction with XCEL workflows.',
    },
    {
        name: 'Onboarding | NPN',
        type: 'Observed/Implied',
        description: 'Seen in "NPN Not Empty" logic; primary key for SureLC lookups.',
    },
    {
        name: 'Upline NPN',
        type: 'Observed/Implied',
        description: 'Referenced in "Stage Check Upline via Upline NPN".',
    },
    {
        name: 'Comp level',
        type: 'Observed/Implied',
        description: 'Written by "Add Comp Level" steps.',
    },
    {
        name: 'Upline Info',
        type: 'Observed/Implied',
        description: 'Written by "Add Upline Info" steps.',
    },
];
