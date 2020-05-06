import { ChangesetObject } from './ChangesetObject';
import { Guid } from './Guid';
import { IAutocompleteAdditParam } from './IAutocompleteAdditParam';

// tslint:disable-next-line: no-namespace
export module ObjectHelper {



   export function isEmpty(obj) {
      for (const key in obj) {
         if (obj.hasOwnProperty(key)) {
            return false;
         }
      }
      return true;
   }

   export function nullIfEmpty<T>(src: T): T {
      if (!src || isEmpty(src)) {
         return null;
      }
      return src;
   }

   export function LookupNullOrEmpty<T>(src: T): T {
      if (isObjEmpty(src)) {
         return null;
      }
      return src;
   }

   export function isObjEmpty(obj: any) {
      return !obj || isEmpty(obj) || obj.oid === '00000000-0000-0000-0000-000000000000';
   }

   export function _emptyOidObject(obj: any) {
      return !obj || obj.oid === undefined || obj.oid === null;
   }

   export function diffPlainSimpleProperty(src: string, origin: string): string {
      return (src !== origin) ? src : null;
   }

   /** it's object with .oid prop as key */
   export function diffPlainOidProperty<T>(src: any, origin: any): ChangesetObject<T> {
      if (this._emptyOidObject(src) && this._emptyOidObject(origin)) {
         return null;
      }
      if (!this._emptyOidObject(src) && !this._emptyOidObject(origin)
         && (src.oid instanceof Guid && src.oid.equals(origin.oid) || src.oid === origin.oid)) {
         return null;
      }
      if (this._emptyOidObject(src) && !this._emptyOidObject(origin)) {
         return new ChangesetObject<T>(origin.oid, false, src, origin);
         // for delete in odata we need to send direct request
         // DELETE [Organization URI]/api/data/v9.0/accounts(00000000-0000-0000-0000-000000000001)/description HTTP/1.1
      }
      return new ChangesetObject<T>(src.oid, true, src, origin);
   }

   function _isUndefined(src: any) {
      return src === undefined || src === null;
   }

   export function diffPlainProperty<T>(src: any, origin: any): ChangesetObject<T> {

      const type = typeof src;
      if (!_isUndefined(src) && type !== 'string' && type !== 'number' && type !== 'boolean') {
         throw new Error('bad type for method');
      }

      if (_isUndefined(src) && _isUndefined(origin)) {
         return null;
      }
      if (!_isUndefined(src) && !_isUndefined(origin) && src === origin) {
         return null;
      }
      if (_isUndefined(src) && !_isUndefined(origin)) {
         return new ChangesetObject<T>(origin, false, src, origin);
      }
      return new ChangesetObject<T>(src, true, src, origin);
   }

   export function deepCopy(obj) {
      let copy;

      // Handle the 3 simple types, and null or undefined
      if (null == obj || 'object' !== typeof obj) {
         return obj;
      }

      if (obj instanceof Guid) {
         copy = new Guid(obj);
         return copy;
      }

      // Handle Date
      if (obj instanceof Date) {
         copy = new Date();
         copy.setTime(obj.getTime());
         return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
         copy = [];
         for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.deepCopy(obj[i]);
         }
         return copy;
      }

      // Handle Object
      if (obj instanceof Object) {
         copy = {};
         for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
               copy[attr] = this.deepCopy(obj[attr]);
            }
         }
         return copy;
      }

      throw new Error('Unable to copy obj! Its type isn\'t supported.');
   }

   export function isEqualArraysAdditParams(a1: Array<IAutocompleteAdditParam>, a2: Array<IAutocompleteAdditParam>): boolean {
      if (a1 == null && a2 != null || a2 == null && a1 != null) {
         return false;
      }
      if ((a1 == null || a1.length === 0) && (a2 == null || a2.length === 0)) {
         return true;
      }
      if (a1.length !== a2.length) {
         return false;
      }

      for (let i = 0; i < a1.length; i++) {
         if (!a2.find((q: IAutocompleteAdditParam) => q.key === a1[i].key && q.value === a1[i].value)) {
            return false;
         }
      }

      return true;
   }

   // public getDiff(origin, current): any {
   //     let delta = diff(origin, current);
   //     // fix some artifacts of diff operation
   //     this._fixDiff(delta, origin);
   //     return delta;
   // }
   // private _fixDiff(delta: any, origin: any) {
   //     if (null == delta || 'object' !== typeof delta) {
   //         return delta;
   //     }
   //     if (delta instanceof Guid || delta instanceof Date || delta instanceof Array) {
   //         return;
   //     }
   //     if (delta instanceof Object) {
   //         for (const attr in delta) {
   //         }
   //     }
   // }

   export function deepFind(obj: any, path: string): any {
      // console.log(path);
      // console.log(obj);
      const paths = path.split('.');
      let current = obj;
      let i;

      for (i = 0; i < paths.length; ++i) {
         if (current[paths[i]] === undefined || current[paths[i]] === null) {
            return undefined;
         } else {
            current = current[paths[i]];
         }
      }
      return current;
   }

   /** return false if value wasnt changed */
   export function deepSet(obj: any, path: string, setValue: any): boolean {
      // console.log(path);
      // console.log(obj);
      const paths = path.indexOf('.') > 1 ? path.split('.') : [path];
      let current = obj;
      let i;

      for (i = 0; i < paths.length; ++i) {

         if (i !== paths.length - 1) {
            if (!current.hasOwnProperty(paths[i])) {
               console.error('path not found:' + path, obj);
               return false;
            } else {
               current = current[paths[i]];
            }
         } else {
            console.log('set value from to', setValue, current[paths[i]]);
            if (current[paths[i]] === setValue) {
               return false;
            }
            current[paths[i]] = setValue;
            return true;
         }
      }
      return false;
   }

   export function deepSetWithRecreatePath(obj: any, path: string, setValue: any): any {
      // console.warn('deepSetWithRecreatePath:', obj, path, setValue);
      const paths = path.indexOf('.') > 1 ? path.split('.') : [path];
      let current = obj;
      let i;

      for (i = 0; i < paths.length; ++i) {
         if (!current.hasOwnProperty(paths[i])) {
            // console.log('path not found:' + path, obj);
            return;
         } else {
            if (i === paths.length - 1) {
               // console.log('set value from to', setValue, current[paths[i]]);
               current[paths[i]] = setValue;
               return;
            }
            current[paths[i]] = { ...current[paths[i]] };
            current = current[paths[i]];
         }
      }
      return;
   }


   /** example of usage: const nameof = this.nameofFactory<OwnerEntity>(); nameof('prop');
    * invokes compile time error if prop name incorrect! */
   export const nameofFactory = <T>() => (name: keyof T) => name;

   export function generatePropPath(...params: Array<string>): string {
      return params.join('.');
   }

   export const extractOid = (src: any, propName: string): string => {
      return src && src[propName] && src[propName].oid ? src && src[propName] && src[propName].oid : null;
   };
}


export class CustomObjectHelper {

   /**type get by getSngType()=> entity_entity2_entity3 returns 'entity3' */
   static getKeyOfType(type: string): string {
      return type.split('_').reverse()[0];
   }

   // isEqual(object: any, attrName: string, attrValue: any, attrKeyName: string = 'oid'): boolean {
   //    if (object[attrName] === attrValue || (object[attrName]
   //       && attrValue
   //       && (attrValue.oid && attrValue.oid.equals(object[attrName][attrKeyName])
   //          || (object[attrName][attrKeyName]
   //             && (object[attrName][attrKeyName] instanceof Guid)
   //             && object[attrName][attrKeyName].equals(attrValue[attrKeyName]))
   //          || (object[attrName][attrKeyName]
   //             && !(object[attrName][attrKeyName] instanceof Guid)
   //             && object[attrName][attrKeyName] === attrValue[attrKeyName])
   //       ))) {
   //       // console.log('unchanged');
   //       return true;
   //    }
   //    return false;
   // }


}
