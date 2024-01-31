import { Map } from './map';
import { Element } from './element';

export class Item {
  FormItemOID!: string;
  ItemResponseOID!: string;
  Response!: string;
  ID!: string;
  Order!: string;
  ItemType!: string;
  Elements!: Element[];  
  Map!: Map[];
}