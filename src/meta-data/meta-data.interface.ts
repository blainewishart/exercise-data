import {SerializableClassInterface} from '../serializable/serializable.class.interface';
import {MetaDataJsonInterface} from './meta-data.json.interface';

export interface MetaDataInterface  extends SerializableClassInterface {
  serviceName: ServiceNames;
  serviceUser: string;
  id: string;
  date: Date;
  toJSON(): MetaDataJsonInterface;
}


export enum ServiceNames {
  SuuntoApp = 'suuntoApp',
}
