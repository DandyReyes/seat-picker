export type SeatStatus = 0 | 1;

export type SeatMap = Record<string, SeatStatus>;

export type Row = {
  seat: SeatMap;
};

export type Door = {
  row: Row[];
};

export interface Sections {
  door1: Door;
  door2: Door;
  door3: Door;
  door4: Door;
}
