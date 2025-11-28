export interface Person {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface Asset {
  id: number;
  person_id: number;
  name: string;
  description?: string;
  value: number;
  acquired_date: string;
  created_at: string;
  person_name?: string;
}

export interface CreatePersonInput {
  name: string;
  email: string;
  phone?: string;
}

export interface CreateAssetInput {
  person_id: number;
  name: string;
  description?: string;
  value: number;
  acquired_date: string;
}
