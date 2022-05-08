//convert IDMS SCr to conventional SCr
export const convScr = (num) => {
  const correctedScr = num * 1.065 + 0.067;
  const formattedScr = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(correctedScr);
  //convert string output back into number type
  return Number(formattedScr);
};