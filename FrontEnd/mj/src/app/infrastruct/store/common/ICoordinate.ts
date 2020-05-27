export interface ICoordinateDto {
  longitude: any;
  latitude: any;
}


export class CoordinateHelper {

 public static createLocalStorageICoordinateDto(coordinate: any): ICoordinateDto {
    const cordArr = coordinate.split(',');
    const mapDto: ICoordinateDto  = {
      latitude : cordArr[0].slice(1),
      longitude: cordArr[1].slice(0, -1)
    };
    return mapDto;
  }

}
