export type GodData = {
  id: number;
  godName: string;
  image: string;
  description: string;
  disabled: boolean;
}[];

export type GodSelectorProps = {
  availableGods: string[]; // Typage de availableGods (ajuste selon ton besoin)
  roomCode: string;
};

export type RoomCode = {
  code: string;
};
