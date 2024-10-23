export interface TrapContainer {
    trapItem: TrapItem[];
    onSelectTrap: (icon: {
        id: number;
        label: string;
        images: string[];
        description: string;
    }) => void;
}

export type TrapItem = {
    id: number;
    label: string;
    images: string[];
    description: string;
};
