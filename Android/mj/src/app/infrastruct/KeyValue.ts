export class KeyValueDefault {
   key: number;
   value: string;

   constructor(key: number, value: string) {
      this.key = key;
      this.value = value;
   }
}

export class KeyValue<T1, T2> {
   key: T1;
   value: T2;

   constructor(key: T1, value: T2) {
      this.key = key;
      this.value = value;
   }
}
