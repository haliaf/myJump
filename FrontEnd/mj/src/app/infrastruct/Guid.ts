export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';
const GUID_FORMAT: RegExp = /\{?([a-z0-9]{8}(?:-[a-z0-9]{4}){3}-[a-z0-9]{12})\}?/i;

/**
 * A unique identifier.
 */
export class Guid {

   private _id: string;

   /**
    * Returns an empty GUID.
    */
   static empty(): Guid {
      return new Guid(GUID_EMPTY);
   }

   /**
    * Creates a new GUID.
    */
   static newGuid(): Guid {
      return new Guid(`${Guid.s4()}${Guid.s4()}-${Guid.s4()}-${Guid.s4()}-${Guid.s4()}-${Guid.s4()}${Guid.s4()}${Guid.s4()}`);
   }

   static isCorrect(val: string): boolean {
      const regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
      return regexGuid.test(val);
   }

   static parse(val: any): Guid {
      return val ? new Guid(val) : null;
   }

   private static s4(): string {
      return Math
         .floor((1 + Math.random()) * 0x10000)
         .toString(16)
         .substring(1);
   }

   /**
    * Creates a new GUID from a string or clones existing guid.
    */
   constructor(id: string | Guid) {

      if (id instanceof Guid) {
         this._id = id.valueOf();
         return;
      }

      if (GUID_FORMAT.test(id)) {
         this._id = GUID_FORMAT.exec(id.toLowerCase())[1];
         return;
      }

      throw new Error(`Invalid GUID ${id}`);
   }

   /**
    * Compares if two GUID's are equal.
    */
   equals(value: string | Guid): boolean {
      try {
         return this._id === (new Guid(value)).valueOf();
      } catch (err) {
         return false;
      }
   }

   /**
    * Converts the GUID to a formatted string.
    *
    * Formats:
    *   n = 00000000000000000000000000000000
    *   d = 00000000-0000-0000-0000-000000000000 (default)
    *   b = {00000000-0000-0000-0000-000000000000}
    */
   toString(format: string = 'd'): string {
      switch (format.toLowerCase()) {
         case 'n':
            return this._id.replace('-', '');
         case 'b':
            return `{${this._id}}`;
         default:
            return this._id;
      }
   }

   /**
    * Returns the underlying value.
    */
   valueOf(): string {
      return this._id;
   }
}

