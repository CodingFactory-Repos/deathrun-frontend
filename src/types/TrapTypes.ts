import { GameInfoHover, RoomInformations } from "./RoomTypes.ts";

export interface TrapContainer {
    trapItem: TrapItem[];
    onHoverTrap: (icon: TrapItem | null) => void;
    roomInformations: RoomInformations | null;
    godId: number;
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
    trapItem: TrapItem | GameInfoHover;
};
