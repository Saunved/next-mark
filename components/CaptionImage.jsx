import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

function CaptionImage({ alt, src, caption, children }) {
  return (
    <figure className="not-prose">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-md"
      />
      <figcaption>{caption || children}</figcaption>
    </figure>
  );
}

CaptionImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  caption: PropTypes.string,
  children: PropTypes.element,
};

CaptionImage.defaultProps = {
  caption: "",
  children: null,
};

export default CaptionImage;
