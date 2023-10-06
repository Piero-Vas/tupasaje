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
  floor: number;
  line: number;
  row: number;
  seat_type: string;
  seat_status: string;
}

export const BUSES_SEATS_DATA: BusesSeatsData = {
  countFirstFloor: 10,
  countSecondFloor: 0,
  firstFloor: {
    seatsFirstFloor1Line: [
      {
        id_seat: 1,
        id_bus: 3,
        seat_number: 'A1',
        floor: 1,
        line: 1,
        row: 1,
        seat_type: 'special_needs',
        seat_status: 'usable',
      },
      {
        id_seat: 2,
        id_bus: 3,
        seat_number: 'A2',
        floor: 1,
        line: 1,
        row: 2,
        seat_type: 'VIP',
        seat_status: 'usable',
      },
    ],
    seatsFirstFloor2Line: [
      {
        id_seat: 3,
        id_bus: 3,
        seat_number: 'B1',
        floor: 1,
        line: 2,
        row: 1,
        seat_type: 'standard',
        seat_status: 'usable',
      },
      {
        id_seat: 4,
        id_bus: 3,
        seat_number: 'B2',
        floor: 1,
        line: 2,
        row: 2,
        seat_type: 'standard',
        seat_status: 'usable',
      },
    ],
    seatsFirstFloor3Line: [
      {
        id_seat: 5,
        id_bus: 3,
        seat_number: 'C1',
        floor: 1,
        line: 3,
        row: 1,
        seat_type: 'VIP',
        seat_status: 'usable',
      },
      {
        id_seat: 6,
        id_bus: 3,
        seat_number: 'C2',
        floor: 1,
        line: 3,
        row: 2,
        seat_type: 'standard',
        seat_status: 'usable',
      },
    ],
    seatsFirstFloor4Line: [
      {
        id_seat: 7,
        id_bus: 3,
        seat_number: 'D1',
        floor: 1,
        line: 4,
        row: 1,
        seat_type: 'standard',
        seat_status: 'usable',
      },
      {
        id_seat: 8,
        id_bus: 3,
        seat_number: 'D2',
        floor: 1,
        line: 4,
        row: 2,
        seat_type: 'VIP',
        seat_status: 'usable',
      },
    ],
  },
  secondFloor: {
    seatsFirstFloor1Line: [
      {
        id_seat: 1,
        id_bus: 3,
        seat_number: 'A1',
        floor: 1,
        line: 1,
        row: 1,
        seat_type: 'special_needs',
        seat_status: 'usable',
      },
      {
        id_seat: 2,
        id_bus: 3,
        seat_number: 'A2',
        floor: 1,
        line: 1,
        row: 2,
        seat_type: 'VIP',
        seat_status: 'usable',
      },
    ],
    seatsFirstFloor2Line: [
      {
        id_seat: 3,
        id_bus: 3,
        seat_number: 'B1',
        floor: 1,
        line: 2,
        row: 1,
        seat_type: 'standard',
        seat_status: 'usable',
      },
      {
        id_seat: 4,
        id_bus: 3,
        seat_number: 'B2',
        floor: 1,
        line: 2,
        row: 2,
        seat_type: 'standard',
        seat_status: 'usable',
      },
    ],
    seatsFirstFloor3Line: [
      {
        id_seat: 5,
        id_bus: 3,
        seat_number: 'C1',
        floor: 1,
        line: 3,
        row: 1,
        seat_type: 'VIP',
        seat_status: 'usable',
      },
      {
        id_seat: 6,
        id_bus: 3,
        seat_number: 'C2',
        floor: 1,
        line: 3,
        row: 2,
        seat_type: 'standard',
        seat_status: 'usable',
      },
    ],
    seatsFirstFloor4Line: [
      {
        id_seat: 7,
        id_bus: 3,
        seat_number: 'D1',
        floor: 1,
        line: 4,
        row: 1,
        seat_type: 'standard',
        seat_status: 'usable',
      },
      {
        id_seat: 8,
        id_bus: 3,
        seat_number: 'D2',
        floor: 1,
        line: 4,
        row: 2,
        seat_type: 'VIP',
        seat_status: 'usable',
      },
    ],
  },
};

export const BUS_FLOORS_ICONS = [ManWomanIcon, StairsIcon];

export const BUS_FLOORS_COUNT = [
  {key: 'PISO_1', title: 'Piso 1'},
  {key: 'PISO_2', title: 'Piso 2'},
];
