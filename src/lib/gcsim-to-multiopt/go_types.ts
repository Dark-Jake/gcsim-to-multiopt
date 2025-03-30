export interface CustomTarget {
    weight: number;
    path: string[];
    hitMode: string
    reaction?: string;
    infusionAura?: string;
    bonusStats: Record<string, number>
    description: string
}

export interface CustomMultiTarget {
    name: string;
    description?: string;
    targets: CustomTarget[];
}