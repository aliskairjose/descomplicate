import { CompensatoryExpenseType } from './compenatory-expense-type';
import { Institution } from './institution';
import { Requirement } from './requirement';
export interface Procedure {
  id: number;
  name: string;
  estimated_time: number;
  cost: number;
  institution_id: number;
  created_at: string;
  updated_at: string;
  requeriments: Requirement[];
  manager_types: []
  institution: Institution;
  compensatories: CompensatoryExpenseType[]
}