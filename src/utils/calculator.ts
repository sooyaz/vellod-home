import {
  CalculatorResult,
  CalculatorValues,
} from "@/types/calculator";

export function calculateSellingPrice(
  values: CalculatorValues
): CalculatorResult {
  const totalCost =
    values.cost +
    values.shipping +
    values.advertising;

  // 수수료를 고려한 판매가
  const sellingPrice =
    totalCost /
    (1 -
      values.fee / 100 -
      values.margin / 100);

  const expectedProfit =
    sellingPrice - totalCost;

  const feeAmount =
    sellingPrice * (values.fee / 100);

  const netProfit =
    sellingPrice -
    totalCost -
    feeAmount;

  return {
    sellingPrice,

    expectedProfit,

    netProfit,
  };
}