import { Procedure } from './procedure';
import { Manager } from './manager';
import { HttpStatusCode } from '@angular/common/http';
export interface Order {
  id: number;
  applicant_name: string;
  applicant_dni: string;
  applicant_email: string;
  address: string;
  delivery_date: string;
  total: number
  client_type: string;
  company_id: number
  procedure_id: number;
  order_status_id: number;
  created_at: string;
  updated_at: string;
  approved_payment: number;
  active: number;
  payment_method_id: number;
  extra_data?: string;
  latitude?: string;
  longitude?: string;
  delivery_address?: string;
  delivery_latitude?: string;
  delivery_longitude?: string;
  reference_number: number;
  procedure: Procedure;
  managers: Manager[];
  status?: Status;
  delivery_courier?: string;
  processor?: string;
  delivery_courier_image?: string;
  processor_image?: string;
}

export interface Status {
  id: number;
  manager_type: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
