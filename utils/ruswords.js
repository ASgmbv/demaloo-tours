export function daysRus(days) {
  if (days === 11 || days === 12 || days === 13 || days === 14) {
    return "дней";
  }

  let a = days % 10;
  if (a === 1) return "день";
  if (a === 2 || a === 3 || a === 4) return "дня";
  return "дней";
}

export function yearsRus(years) {
  if (years === 11 || years === 12 || years === 13 || years === 14) {
    return "лет";
  }

  let a = years % 10;
  if (a === 1) return "год";
  if (a === 2 || a === 3 || a === 4) return "года";
  return "лет";
}
