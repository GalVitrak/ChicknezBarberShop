import { functions } from "../../firebase-config";
import { httpsCallable } from "firebase/functions";
import ImageModel from "../Models/ImageModel";

class GalleryService {
  public async getImages(): Promise<ImageModel[]> {
    const getImages = httpsCallable(functions, "getImages");
    const response = await getImages();
    const images: ImageModel[] = response.data as ImageModel[];
    return images;
  }
}

const galleryService = new GalleryService();

export default galleryService;
