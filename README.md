# ImageKit for React

Simple package to use the [ImageKit](https://imagekit.io) service inside of React apps.

## Installation

```
npm install --save imagekit-react
```

## Usage

Currently, there are two major ways to use the image delivery component of ImageKit in React.

### Via urlEndpoint

You pass the following data, using which the complete URL is constructed.

1. `urlEndpoint`: Easily obtained from your ImageKit dashboard.
1. `path`: The path to the image you'd like to fetch.
1. `transformations`: The transformations you would like to apply on a given image.
1. `alt`: Alt text of the image.

```js
<Image
    urlEndpoint="https://ik.imagekit.io/demo/"
    path="medium_cafe_B1iTdD0C.jpg"
    transformations={transformations}
/>
```

### Via src URL

If you've saved the complete URL of images in your DBs, then using just a URL and applying transformations on that might be a better option for you.


```js
<Image
    transformations={transformations}
    src="https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg"
/>
```

## Transformations

Transformations in `imagekit-react` are just arrays of objects. Each of these objects specifies the transformations you need.

#### To see the complete list of available transformations. [Refer to the Imagekit documentation](https://docs.imagekit.io/#image-transformations)

### Applying Transforms


```js
const transformations = [{
    w: 90,
    h: 120
  }];
```

The above snippet will apply transformations of width=90 and height=120 on the image.

Some transforms are destructive and you might want to control the order in which the transforms are applied. In which case there are...

#### Chained Transforms

Chained transforms make it easy to specify the order in which the transforms are applied.
For example if both resizing and rotation transforms are present. Then changing the order of the transforms changes the output image.

So a simple way to chain transforms in `imagekit-react` is to enter another element in the array of objects. The first object is always executed first and so on.

```js
const transformations = [
  {
    rt: 90
  },
  {
    w: 100,
    ar: "16-9"
  }
];
```

In the above case, rotation will be performed first and resizing according to width and aspect ratio will be performed afterwards.

### Unsupported Features
[ImageKit](https://imagekit.io/) supports a lot more features. But many (some involving private keys, etc.) cannot be implemented on a client side library like `imagekit-react`.
* Signed URLs
* Uploads
* Admin API