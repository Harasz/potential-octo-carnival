import { DataCustomer, DataItem } from '.';

export type Data = {
  id: string;
  date: string;
  customer: DataCustomer;
  items: DataItem[];
}[];
