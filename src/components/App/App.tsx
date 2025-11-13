import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSelectPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const fetchedPhotos = await getPhotos(searchQuery);
      setPhotos(fetchedPhotos);
      // console.log("fetchedPhotos:", fetchedPhotos);
      // console.log("searchQuery:", searchQuery);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Section>
        <Container>
          {isError && <Text>Something went wrong</Text>}
          {isLoading && <Loader />}
          <Form onSubmit={handleSearch} />
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={handleSelectPhoto} />
          )}
          {selectedPhoto && (
            <Modal
              onClose={() => {
                handleSelectPhoto(null);
              }}
            >
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
        </Container>
      </Section>
      <Toaster position="top-right" />
    </>
  );
}
