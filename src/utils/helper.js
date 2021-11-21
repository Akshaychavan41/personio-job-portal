export const getUrlSearchParam = (key, href) => {
  const url = new URL(href || window.location.href);
  const searchParams = new URLSearchParams(url.search);
  return searchParams.get(key);
};
