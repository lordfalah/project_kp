const formatRupiah = (money) => {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(money)
    .toString();
};

export function sortText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
}

const customSlickSett = (desktop, xl, lg, md, sm, xs) => {
  const settings = {
    ...desktop,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          ...xl,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          ...lg,
        },
      },

      {
        breakpoint: 768,
        settings: {
          ...md,
        },
      },

      {
        breakpoint: 640,
        settings: {
          ...sm,
        },
      },

      {
        breakpoint: 480,
        settings: {
          ...xs,
        },
      },
    ],
  };

  return settings;
};

export { formatRupiah, customSlickSett };
