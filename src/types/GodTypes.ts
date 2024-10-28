export type GodData = {
    id: number;
    godName: string;
    image: string;
    description: string;
    disabled: boolean;
    catchphrase: string;
}[];

export type GodSelectorProps = {
    availableGods: number[];
    roomCode: string;
};

export type RoomCode = {
    code: string;
};
