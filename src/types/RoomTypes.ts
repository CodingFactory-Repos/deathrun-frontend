export interface RoomInformations {
    code: string;
    creator: string;
    players: string[];
    gods: string[];
    props: { x: number; y: number }[];
    traps: { x: number; y: number }[];
}
