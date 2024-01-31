import imgHome from "../../public/images/home/home.jpg";

const Loading = () => {
  return (
    <div>
      <CutoutTextLoader
        background="white"
        // NOTE: Using GIFs for the background looks super cool :)
        imgUrl={imgHome.src}
      />
    </div>
  );
};

export default Loading;

const CutoutTextLoader = ({ height, background, imgUrl }) => {
  return (
    <div className="h-screen">
      <div
        className="fixed inset-0 z-50"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        style={{ background }}
        className="fixed inset-0 animate-pulse z-50"
      />
      <span
        className="font-black fixed inset-0 z-50 text-center bg-clip-text text-transparent pointer-events-none flex justify-center items-center"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: height,
        }}
      >
        Loading...
      </span>
    </div>
  );
};
