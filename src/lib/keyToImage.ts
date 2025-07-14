const URL = "https://better.ecarry.uk";

export const keyToImage = (key: string | undefined | null) => {
  if (!key) {
    return "";
  }

  return `${URL}/${key}`;
};
