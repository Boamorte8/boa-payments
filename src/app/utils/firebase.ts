export const doPostRequest = (url: string, body: string) =>
  fetch(url, { method: 'POST', body });
