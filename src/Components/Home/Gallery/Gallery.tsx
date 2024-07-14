import { useEffect, useState } from "react";
import "./Gallery.css";
import { Image } from "antd";
import galleryService from "../../../Services/GallryService";
import ImageModel from "../../../Models/ImageModel";
import { Loading } from "../../Layout/Loading/Loading";

function Gallery(): JSX.Element {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    setLoadingImages(true);
    setImages(await galleryService.getImages());
    setLoadingImages(false);
  };

  return (
    <div className="Gallery">
      <div className="galleryContext">
        <Image.PreviewGroup
          preview={{
            toolbarRender() {
              return <div></div>;
            },
          }}
        >
          {loadingImages || images.length < 0 ? (
            <div>
              <Loading />
            </div>
          ) : (
            images.map((image) => (
              <Image
                className="image"
                key={image.id}
                width={250}
                src={image.imagePath}
                alt={image.imageNum.toString()}
              />
            ))
          )}
        </Image.PreviewGroup>
      </div>
    </div>
  );
}

export default Gallery;
