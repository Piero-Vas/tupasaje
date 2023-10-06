export interface BusesListResponse {
  result: string;
  data: {
    buses: Bus[];
    total: number;
  };
}

export interface Bus {
  id_bus: number;
  id_company: number;
  name: string;
  brand: string;
  model: string;
  license_plate: string;
  certificate: string;
  floors: number;
  base_office: number;
  images: any;
  seats_configuration: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
