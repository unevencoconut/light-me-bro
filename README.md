# Light Me, Bro.
A very simple web component based strategy to the Lightbox.  
The script is small enough that you should be able to edit it if needed.  
[Live Demo Found Here](https://www.marksilva.dev/light-me-bro/)

## Installation

All ready-to-use files are located in the `/dist` directory.  
Use either the main.js file or the minified main.min.js file.  

```html
<script src="dist/main.js"></script>
<!-- or -->
<script src="dist/main.min.js"></script>
```

## Usage

Add the `data-lightmebro` attribute to any element that you want to attach a Lightbox to.  
The value of the data-lightmebro attribute is the path to the image you'd like to place in the Lightbox.  

Here is the typical "click the thumbnail image to put it in a Lightbox".  
```html
<div data-lightmebro="/path/to/full-size-image.jpg">
  <img src="/path/to/thumbnail.jpg">
</div>
```

That's it, nothing too complex.  
The Lightbox component uses [encapsultated styling](https://www.pluralsight.com/resources/blog/guides/css-encapsulation-in-angular#:~:text=CSS%20Encapsulation%20allows%20for%20scoping,side%20effects%20to%20other%20elements.).  
Typical CSS declarations will not work due to this.  
If you'd like to override the default styling, target the light-me-bro element and the CSS Varaibles associated to the custom element that you want to change.  

example:
```CSS
light-me-bro {
  --lightmebro-background-color: #FFFAAA;
}
```

Here are all the defaults:
```CSS
light-me-bro {
  /* For the Container */
  --lightmebro-container-position: fixed;
  --lightmebro-container-top: 0;
  --lightmebro-container-left: 0;
  --lightmebro-container-height: 100vh;
  --lightmebro-container-width: 100vw;
  --lightmebro-container-z-index: 999999;
  --lightmebro-display: flex;
  --lightmebro-container-justify-content: center;
  --lightmebro-container-align-items: center;
  --lightmebro-background-color: hsl(0deg 0% 0% / 70%);

  /* For the Image */
  --lightmebro-img-max-width: 100%;
  --lightmebro-img-height: auto;
  --lightmebro-img-border-radius: 0;
  --lightmebro-img-box-shadow: none;
}
```

Ive left styling of your elements up to you.  
Meaning, things like cursors on hovers I've omitted.  
It's all function over form here.  

## Details
This uses the [Web Component Spec](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).  
The [CSS Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).  
The [Constructable Stylesheets API](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet).  

## Gotchas
- On Anchor Elements with fragments such as `<a href="#">`. I did not utilize the `preventDefault` method to stop upward scrolling on click. This seems to be a common enough practice that I'm assuming this is already being done elsewhere in your codebase. I may change this in the future.