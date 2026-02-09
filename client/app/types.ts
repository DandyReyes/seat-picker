export type SeatStatus = 0 | 1;

export type SeatKey = `${DoorId}:${number}:${number}`;

export type SeatMap = Record<SeatKey, SeatStatus>;

export type DoorId = "door1" | "door2" | "door3" | "door4";

export type RowLayout = {
  readonly seatCount: number;
};

export type DoorLayout = {
  readonly rows: RowLayout[];
};

export type SectionsLayout = Record<DoorId, DoorLayout>;

export type BackendSeatMap = Record<number, SeatStatus>;

export type BackendRow = {
  seat: BackendSeatMap;
};

export type SelectedSeat = {
  door: string;
  row: number;
  seat: number;
  status: SeatStatus;
};


export type BackendDoor = {
  row: BackendRow[];
};

export type Sections = Record<DoorId, BackendDoor>;
