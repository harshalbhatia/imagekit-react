import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { imagekitProps } from "../config/constants";

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
    console.log("TR:", transformationString);
    const url = queryString.parseUrl(src);
    const tr = url.query.tr ? url.query.tr + transformationString : transformationString;
    if(!!tr) {
      url.query.tr = tr;
    }
    const finalQuery = queryString.stringify(url.query, {arrayFormat: 'comma'});
    return finalQuery ? url.url + "?" + finalQuery : url.url;
  }

  render() {
    const link = this.linkBuilder();
    const imgProps = Object.keys(this.props).reduce((object, key) => {
      if (!Object.keys(imagekitProps).includes(key)) {
        object[key] = this.props[key];
      }
      return object
    }, {})
    return <img src={link} alt={this.props.alt || ""} {...imgProps} />;
  }
}

export default Image;

Image.propTypes = {
  alt: PropTypes.string,
  path: PropTypes.string,
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
