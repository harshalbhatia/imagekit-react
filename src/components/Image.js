import React from "react";
import PropTypes from "prop-types";
class Image extends React.Component {
  transformationBuilder() {
    return this.props.transformations
      .map(transformationObject =>
        Object.keys(transformationObject)
          .map(key => `${key}-${transformationObject[key]}`)
          .join(",")
      )
      .join(":");
  }

  linkBuilder() {
    const src = this.props.src || this.props.urlEndpoint + this.props.path;
    const transformationString = this.transformationBuilder();
    // TODO: Properly merge query params
    return transformationString ? src + "?tr=" + transformationString : src;
  }

  render() {
    let link = this.linkBuilder();
    return <img src={link} alt="" />;
  }
}

export default Image;

Image.propTypes = {
  alt: PropTypes.string,
  transformations: PropTypes.arrayOf(PropTypes.object),
  httpMethod: PropTypes.oneOf("http", "https"),
  src: PropTypes.string,
  // Atleast one of urlEndpoint and src should be present
  urlEndpoint: (props, propName, componentName) => {
    if (!props.src && !props.urlEndpoint) {
      return new Error(
        `Atleast one of props 'urlEndpoint' or 'src' should be specified in '${componentName}'.`
      );
    }
  },
  // Both urlEndpoint and src should not be present
  src: (props, propName, componentName) => {
    if (props.src && props.urlEndpoint) {
      return new Error(
        `Both the props 'urlEndpoint' or 'src' should not be specified in '${componentName}'.`
      );
    }
  }
};

Image.defaultProps = {
  httpMethod: "https",
  transformations: []
};
