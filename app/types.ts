export type SeatStatus = "empty" | "occupied";

export type SeatMap = Record<string, SeatStatus>;

export type Row = {
  seat: SeatMap;
};

export type Rows = {
  row: Row[];
};

export interface Sections {
  door1: Rows;
  door2: Rows;
  door3: Rows;
  door4: Rows;
}
