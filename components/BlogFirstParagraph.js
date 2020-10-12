import { Text } from "@chakra-ui/core";
import { RichText } from "prismic-reactjs";

const BlogFirstParagraph = ({ sliceZone, textLimit = 300 }) => {
  const firstTextSlice = sliceZone.find((slice) => slice.slice_type === "text");
  if (firstTextSlice) {
    const text = RichText.asText(firstTextSlice.primary.text);
    let limitedText = text.substring(0, textLimit);

    if (text.length > textLimit) {
      // Cut only up to the last word and attach '...' for readability
      limitedText = `${limitedText.substring(
        0,
        limitedText.lastIndexOf(" ")
      )}...`;
    }

    return <Text lineHeight="taller">{limitedText}</Text>;
  }

  return null;
};

export default BlogFirstParagraph;
