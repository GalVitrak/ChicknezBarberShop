class ImageModel {
  public id?: string;
  public imageNum: number;
  public imagePath: string;

  public constructor(imageNum: number, imagePath: string) {
    this.imageNum = imageNum;
    this.imagePath = imagePath;
  }
}

export default ImageModel;
