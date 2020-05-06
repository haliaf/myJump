export interface IChangesetDetails<T> {
    oid: T;
    isPatch: boolean;
    isDelete: boolean;
}
