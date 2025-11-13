import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";

export default function App() {
  const handleSearch = (searchQuery: string) => {
    console.log("searchQuery:", searchQuery);
  };
  return (
    <>
      <Section>
        <Container>{<Form onSubmit={handleSearch} />}</Container>
        Home page
      </Section>
    </>
  );
}
