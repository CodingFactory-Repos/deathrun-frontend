export interface TrapContainer {
    trapItem: TrapItem[];
    onHoverTrap: (icon: TrapItem | null) => void;
}

export type TrapItem = {
    id: number;
    label: string;
    description?: string;
    cost: number;
    trapData: TrapData[];
};

type TrapData = {
    image: string;
    trapType: string;
};

export type TrapDrop = {
    id: number;
    trapData: { image: string; trapType: string };
};

export type TrapDescriptionProps = {
    trapItem: TrapItem;
};
