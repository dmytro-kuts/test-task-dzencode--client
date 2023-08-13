export const useTotalPriceCalculator = () => {
  const formatPrice = (price) => {
    return price.toLocaleString('en', { minimumFractionDigits: 2 });
  };

  const calculateTotalPrice = (orderProducts, currencySymbol) => {
    const totalPrice = orderProducts.reduce((total, product) => {
      const productPrice = product.price.find((price) => price.symbol === currencySymbol);
      return total + productPrice.value;
    }, 0);
    return formatPrice(totalPrice);
  };

  return calculateTotalPrice;
};
