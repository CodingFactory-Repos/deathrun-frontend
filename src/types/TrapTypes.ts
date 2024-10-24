export interface TrapContainer {
    trapItem: TrapItem[];
    onHoverTrap: (icon: TrapItem | null) => void;
}

export type TrapItem = {
    id: number;
    label: string;
    images: string[];
    description?: string;
};

export type TrapDescriptionProps = {
    trapItem: TrapItem;
};
