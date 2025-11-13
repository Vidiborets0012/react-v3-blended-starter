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

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

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
            <PhotosGallery photos={photos} onSelect={() => {}} />
          )}
        </Container>
      </Section>
      <Toaster position="top-right" />
    </>
  );
}
