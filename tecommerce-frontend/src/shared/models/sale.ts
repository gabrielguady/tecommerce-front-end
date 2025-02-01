import {ModelBase} from './model-base';

export class Sale extends ModelBase {
  id_product: number;
  nrf: number;
  id_client: number;
  id_employee: number;
}
