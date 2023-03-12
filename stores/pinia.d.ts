import "pinia";

declare module "pinia" {
  export interface PiniaCustomProperties {
    setCurrentCurrency: (currency) => void;
    getCurrency: () => void;
    initialize: () => void;
  }
}
