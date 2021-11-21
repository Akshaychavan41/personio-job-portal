export const getUrlSearchParam = (key, href) => {
  const url = new URL(href || window.location.href);
  const searchParams = new URLSearchParams(url.search);
  return searchParams.get(key);
};

export function calculateAge(birthDate) {
  birthDate = new Date(birthDate);
  let otherDate = new Date();

  var years = otherDate.getFullYear() - birthDate.getFullYear();

  if (
    otherDate.getMonth() < birthDate.getMonth() ||
    (otherDate.getMonth() == birthDate.getMonth() &&
      otherDate.getDate() < birthDate.getDate())
  ) {
    years--;
  }

  return years;
}
