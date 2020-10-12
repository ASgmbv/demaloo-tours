const PrismicScript = () => {
  const [, repoName] = process.env.PRISMIC_API_ACCESS.match(
    /https?:\/\/([^.]+)?\.(cdn\.)?.+/
  );

  return (
    <script
      async
      defer
      src={`"https://static.cdn.prismic.io/prismic.min.js?repo=${repoName}&new=true"`}
    />
  );
};

export default PrismicScript;
