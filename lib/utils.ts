export function getCurrentDate(separator = "") {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${date < 10 ? "0" + date : date}${separator}${
    month < 10 ? "0" + month : month
  }${separator}${year}`;
}

export function formatMoney(money: number) {
  const currency = function (number: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(number);
  };
  return currency(money);
}
