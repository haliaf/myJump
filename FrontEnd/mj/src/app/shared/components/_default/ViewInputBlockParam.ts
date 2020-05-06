
/**base view block init parameter */
export interface IViewInputBlockParam {
   /**class name of displayed detail entity: core entity, means class of detail view form */
   className: string;

   /**used as path to redux store => reduxstore.select(storePath) */
   storePath: string;

   changeActionType: string;
}


export class ViewInputBlockParam implements IViewInputBlockParam {
   className: string;
   storePath: string;
   changeActionType: string;

   /**params:[className:string, storePath:string]
    * className means context class name for class which is used as parent for
    * concrete component
    */
   constructor(...params: string[]) {
      if (params && params.length > 1) {
         this. className = params[0];
         this.storePath = params[1];
         this.changeActionType = params[2];
         if (params.length > 3) {
            // it's for development
            throw new Error('inited with more than 2 params:' + params[0]);
         }
      }
   }
}
