import { IChangesetDetails } from './IChangesetDetails';

export class ChangesetObject<T> implements IChangesetDetails<T> {
  oid: T;

  /** oid from src */
  isPatch = false;

  /** oid from origin */
  isDelete = false;

  origin: any;
  src: any;

  constructor(oid: any, isPatch: boolean, src: any, origin: any) {
    this.oid = oid;
    this.isDelete = !isPatch;
    this.isPatch = isPatch;

    this.src = src;
    this.origin = origin;
  }
}
