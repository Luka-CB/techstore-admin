import React from "react";
import Helmet from "react-helmet";

const Head = ({
  title,
  description = "This is a admin panel for techstore website",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Head;
