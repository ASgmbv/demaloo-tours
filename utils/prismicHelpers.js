import Prismic from "prismic-javascript";

// Client method to query documents from the Prismic repo
export const Client = (req = null) =>
  Prismic.client(
    process.env.PRISMIC_API_ACCESS,
    createClientOptions(req, process.env.PRISMIC_TOKEN)
  );

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

export default Client;
