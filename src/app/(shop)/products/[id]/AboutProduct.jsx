import Container from "@/components/Container";
import { formatRupiah } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

const AboutProduct = ({ products }) => {
  return (
    <section className="bg-gray-100 my-20 py-16">
      <Container className="px-4 space-y-4">
        <div className="font-semibold text-2xl">
          <h3>Complete Your Room</h3>
          <h3>With What We Designed</h3>
        </div>

        <div className="flex gap-4 overflow-x-scroll">
          {products.map(({ imageUrls, id, title, price }) => (
            <Link
              key={id}
              href={`/products/${id}`}
              className="rounded-lg bg-white px-4 pt-4 pb-6 cursor-grab hover:cursor-grab focus:cursor-grabbing"
            >
              <div
                className="h-40 w-80 rounded-lg relative"
                style={{ backgroundImage: `url(${imageUrls[0].url})` }}
              >
                <Image
                  src={imageUrls[0].url}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt={title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div>
                <h5 className="font-semibold text-lg">{title}</h5>
                <p>Rp {formatRupiah(price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutProduct;
