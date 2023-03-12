export const useCart = () =>
  useState(() => [
    {
      id: 1,
      title: "Koszulka",
      price: 100,
      price_pln: 100,
      quantity: 1,
      image: "https://picsum.photos/200",
    },
    {
      id: 2,
      title: "Koszulka",
      price: 100,
      price_pln: 100,
      quantity: 1,
      image: "https://picsum.photos/200",
    },
  ]);
