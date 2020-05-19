export interface ICoordinateDto {
  Longitude: any;
  Latitude: any;
}


export class CoordinateHelper {

 public static createLocalStorageICoordinateDto(coordinate: any): ICoordinateDto {
    const cordArr = coordinate.split(',');
    const mapDto: ICoordinateDto  = {
      Longitude: cordArr[0].slice(1),
      Latitude: cordArr[1].slice(0, -1)
    };
    return mapDto;
  }

}
