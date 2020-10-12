export const linkResolver = (doc) => {
  if (doc.type === "blog_post") {
    return `/blog/${doc.id}`;
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
