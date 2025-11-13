import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleSearch = async (searchQuery: string) => {
    try {
      const fetchedPhotos = await getPhotos(searchQuery);
      setPhotos(fetchedPhotos);
      // console.log("fetchedPhotos:", fetchedPhotos);
      // console.log("searchQuery:", searchQuery);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("lalala");
    }
  };
  return (
    <>
      <Section>
        <Container>{<Form onSubmit={handleSearch} />}</Container>
        Home page
      </Section>
      <Toaster position="top-right" />
    </>
  );
}
