export interface CalculatorValues {
  cost: number;
  shipping: number;
  advertising: number;
  fee: number;
  margin: number;
}

export interface CalculatorResult {
  sellingPrice: number;
  expectedProfit: number;
  netProfit: number;
}