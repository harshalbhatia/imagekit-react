import React from "react";
import PropTypes from "prop-types";
class Image extends React.Component {
  transformationBuilder() {
    const tr = this.props.transformations;
    // for each element in the array
    let transformationString = "";
    console.log("tr", tr, typeof tr);
    tr.map(t => {
      console.log("t", t);
      transformationString +=
        ":" +
        Object.keys(t)
          .map(k => `${k}-${t[k]}`)
          .join(",");
    });
    console.log("tr", transformationString);
    return transformationString ? "?tr=" + transformationString : "";
  }

  linkBuilder() {
    const urlEndpoint = this.props.urlEndpoint;
    const transformationString = this.transformationBuilder();
    return `${urlEndpoint}${this.props.path}${transformationString}`;
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
  urlEndpoint: (props, propName, componentName) => {
    if (!props.src && !props.urlEndpoint) {
      return new Error(`One of props 'urlEndpoint' or 'src' was not specified in '${componentName}'.`);
    }
  }
};

Image.defaultProps = {
  httpMethod: "https",
  transformations: []
};
