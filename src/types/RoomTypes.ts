export interface RoomInformations {
    code: string;
    creator: string;
    players: {
        id: string;
    }[];
    gods: {
        id: string;
        god: number;
        spendingLimit: number;
    }[];
    started: boolean;
    floor: number;
    bank: number;
    score?: number;
    props: { x: number; y: number }[];
    traps: { x: number; y: number }[];
}

export type RoomInformationsProps = {
    roomInformations: RoomInformations;
    godId: number;
    onHoverTrap: (icon: GameInfoHover | null) => void;
};

export type GameInfoHover = {
    description: string;
    label: string;
    image: string;
};
