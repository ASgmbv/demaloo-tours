export const linkResolver = (doc) => {
  if (doc.type === "blog_post") {
    return `/blog/${doc.uid}`;
  }
  return "/";
};

// Additional helper function for Next/Link components
export const hrefResolver = (doc) => {
  if (doc.type === "blog_post") {
    return "/blog/[uid]";
  }
  return "/";
};
