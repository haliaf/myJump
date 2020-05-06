import { ITitledItem } from '../../components/controls/multiselect/multiselect.component';
import { Guid } from './Guid';

export interface IIdTitleItem extends ITitledItem {
   id?: Guid | string;
   title?: string;
}