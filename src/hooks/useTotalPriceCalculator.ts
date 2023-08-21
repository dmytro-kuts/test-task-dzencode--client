interface Price {
  value: number;
  symbol: string;
  isDefault: boolean;
}

interface Product {
  id: number;
  price: Price[];
}

type CurrencySymbol = 'USD' | 'UAH';

type TotalPriceCalculator = (orderProducts: Product[], currencySymbol: CurrencySymbol) => string;

export const useTotalPriceCalculator = (): TotalPriceCalculator => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('en', { minimumFractionDigits: 2 });
  };

  const calculateTotalPrice: TotalPriceCalculator = (orderProducts, currencySymbol) => {
    const totalPrice = orderProducts.reduce((total, product) => {
      const productPrice = product.price.find((price) => price.symbol === currencySymbol);
      return total + (productPrice ? productPrice.value : 0);
    }, 0);
    return formatPrice(totalPrice);
  };

  return calculateTotalPrice;
};
