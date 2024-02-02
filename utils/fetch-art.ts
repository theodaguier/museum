export const fetchArt = async (id: string) => {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  );
  const data = await response.json();

  return data;
};
