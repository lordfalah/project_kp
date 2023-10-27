import Container from "@/components/Container";
import { formatRupiah } from "@/utils/format";

// const settings = customSlickSett(
//   { slidesToShow: 4, slidesToScroll: 4 },
//   {
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//     dots: true,
//   },
//   {
//     slidesToShow: 2.5,
//     slidesToScroll: 2.5,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//     dots: true,
//   },

//   {
//     slidesToShow: 2,
//     slidesToScroll: 2,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//     dots: true,
//   },

//   {
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//     dots: true,
//   },

//   {
//     slidesToShow: 1.5,
//     slidesToScroll: 1.5,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//     dots: true,
//   }
// );

const relatedProducts = [
  {
    id: 2,
    idc: "1",
    title: "Cangkir Mauttie",
    price: 89300,
    imageUrl:
      "https://luxspace-html.netlify.app/images/content/image-arrived-1.png",
  },
  {
    id: 6,
    idc: "1",
    title: "Saman Kakka",
    price: 14500399,
    imageUrl: "https://luxspace-html.netlify.app/images/content/chair-2.png",
  },
  {
    id: 7,
    idc: "1",
    title: "Lino Dino",
    price: 22000000,
    imageUrl: "https://luxspace-html.netlify.app/images/content/chair-3.png",
  },
  {
    id: 9,
    idc: "1",
    title: "Syail Ammeno",
    price: 6399999,
    imageUrl: "https://luxspace-html.netlify.app/images/content/chair-4.png",
  },
];

const AboutProduct = ({ data, setSelectImg }) => {
  const onLongPress = () => {
    return null;
  };

  const onClick = (id, imageUrl) => {
    setSelectImg(imageUrl);
    const html = document.querySelector("html");
    html.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
    navigate(`/products/${id}`);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 100,
  };
  const longPressEvent = (id, imageUrl) => {
    return useLongPress(
      onLongPress,
      () => onClick(id, imageUrl),
      defaultOptions
    );
  };

  return (
    <section className="bg-gray-100 my-20 py-16">
      <Container className="px-4 space-y-4">
        <div className="font-semibold text-2xl">
          <h3>Complete Your Room</h3>
          <h3>With What We Designed</h3>
        </div>

        <div className="flex gap-4 overflow-x-scroll">
          {relatedProducts.map(({ imageUrl, id, title, price }) => (
            <div
              key={id}
              className="rounded-lg bg-white px-4 pt-4 pb-6 cursor-grab hover:cursor-grab focus:cursor-grabbing"
            >
              <div
                className="h-40 w-80 origin-center bg-cover bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
              <div>
                <h5 className="font-semibold text-lg">{title}</h5>
                <p>Rp {formatRupiah(price)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutProduct;
