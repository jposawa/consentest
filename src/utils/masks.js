export const justNumbers = (rawValue) => (
  rawValue.replace(/\D/g, "")
);

export const decimalNumbers = (rawValue) => {
  const numbers = justNumbers(rawValue);

  return numbers.replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1.");
}