import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

function CaptionImage({
  alt,
  src,
  caption,
  children,
  width = 400,
  height = 400,
  full,
}) {
  return (
    <figure className="not-prose">
      <Image
        src={`${process.env.CLOUDFRONT_URL}${src}`}
        alt={alt}
        width={full ? 1024 : width}
        height={full ? 1024 : height}
        className="rounded-md object-cover"
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
  width: PropTypes.number,
  height: PropTypes.number,
  full: PropTypes.bool,
};

CaptionImage.defaultProps = {
  caption: "",
  children: null,
  width: 400,
  height: 400,
  full: false,
};

export default CaptionImage;
