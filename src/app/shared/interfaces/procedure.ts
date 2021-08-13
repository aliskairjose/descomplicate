export interface Procedure {
  id: number;
  name: string;
  estimated_time: number;
  cost: number;
  institution_id: number;
  created_at: string;
  updated_at: string;
  requeriments: [],
  manager_types: []
}