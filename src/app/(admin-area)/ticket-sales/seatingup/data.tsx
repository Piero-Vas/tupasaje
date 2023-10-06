import {ManWomanIcon} from '@/components/icon/ManWomanIcon';
import {StairsIcon} from '@/components/icon/StairsIcon';

export interface BusesSeatsData {
  countFirstFloor: number;
  countSecondFloor: number;
  firstFloor: Floor;
  secondFloor: Floor;
}

export interface Floor {
  seatsFirstFloor1Line: FloorColumn[];
  seatsFirstFloor2Line: FloorColumn[];
  seatsFirstFloor3Line: FloorColumn[];
  seatsFirstFloor4Line: FloorColumn[];
}

export interface FloorColumn {
  id_seat: number;
  id_bus: number;
  seat_number: string;
  id_base_seat: number;
  price: string;
  seat_type: string;
  seat_status: string;
  isWindow: boolean;
  ticket: any;
}

export const BUS_FLOORS_ICONS = [ManWomanIcon, StairsIcon];

export const BUS_FLOORS_COUNT = [
  {key: 'PISO_1', title: 'Piso 1'},
  {key: 'PISO_2', title: 'Piso 2'},
];
