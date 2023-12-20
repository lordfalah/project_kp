import Container from "@/components/Container";
import Image from "next/image";

const Clients = () => {
  const clientImg = [
    { name: "adobe", source: "logo-adobe.svg" },
    { name: "ikea", source: "logo-ikea.svg" },
    { name: "herman miller", source: "logo-hermanmiller.svg" },
    { name: "miele", source: "logo-miele.svg" },
  ];

  return (
    <section className="py-16" id="clients">
      <Container>
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-14">
          {clientImg.map((data, idx) => (
            <Image
              key={`${data.name}-${idx}`}
              src={`/images/clients/${data.source}`}
              alt={data.source}
              width={150}
              height={150}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Clients;
