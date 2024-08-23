"use strict";
async function lightMeBro() {
    const CUSTOM_ELEMENT_NAME = "light-me-bro";
    const DATA_ATTRIBUTE = "data-lightmebro";
    const TARGET_DATA_ATTRIBUTE = "[data-lightmebro]";
    const SHADOW_DOM_CONTAINER_CLASS = "lightmebro__container";
    const SHADOW_DOM_CONTAINER_SELECTOR = ".lightmebro__container";
    const SHADOW_DOM_IMG_CLASS = "lightmebro__img";
    const SHADOW_DOM_IMG_SELECTOR = ".lightmebro__img";
    const SHADOW_DOM_IMG_PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    // Shadow DOM Stylesheet
    const styles = `
    :host {
      display: none;
    }
    :host([open]) {
      display: block;
    }
    .lightmebro__container {
      position: var(--lightmebro-container-position, fixed);
      top: var(--lightmebro-container-top, 0);
      left: var(--lightmebro-container-left, 0);
      height: var(--lightmebro-container-height, 100vh);
      width: var(--lightmebro-container-width, 100vw);
      z-index: var(--lightmebro-container-z-index, 999999);
      display: var(--lightmebro-display, flex);
      justify-content: var(--lightmebro-container-justify-content, center);
      align-items: var(--lightmebro-container-align-items, center);
      background-color: var(--lightmebro-background-color, hsl(0deg 0% 0% / 70%));
    }
    .lightmebro__img {
      max-width: var(--lightmebro-img-max-width, 100%);
      height: var(--lightmebro-height, auto);
      border-radius: var(--lightmebro-img-border-radius, 0);
      box-shadow: var(--lightmebro-img-box-shadow, none);
    }
  `;
    // Create a stylesheet object
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    const htmlTemplate = `
    <div class="${SHADOW_DOM_CONTAINER_CLASS}">
      <img class="${SHADOW_DOM_IMG_CLASS}" src="${SHADOW_DOM_IMG_PLACEHOLDER}" alt="Lightbox Image">
    </div>
  `;
    // Custom HTML Element
    class LightMeBro extends HTMLElement {
        constructor() {
            super();
            // Attach a shadow DOM to the element
            const shadow = this.attachShadow({ mode: 'open' });
            // Apply the constructible stylesheet to the shadow root
            shadow.adoptedStyleSheets = [sheet];
            // Create a template for the component's structure
            const template = document.createElement('template');
            template.innerHTML = htmlTemplate;
            // Attach the template content to the shadow DOM
            shadow.appendChild(template.content.cloneNode(true));
            // Bind the closeLightbox method
            this.closeLightbox = this.closeLightbox.bind(this);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'open') {
                this.style.display = newValue !== null ? 'block' : 'none';
            }
        }
        connectedCallback() {
            const shadow = this.shadowRoot;
            shadow?.querySelector(SHADOW_DOM_CONTAINER_SELECTOR)?.addEventListener("click", (e) => {
                if (e instanceof MouseEvent) {
                    this.closeLightbox();
                }
            });
        }
        closeLightbox() {
            this.removeAttribute("open");
        }
        set setLightboxImage(imageUrl) {
            const imgElement = this.shadowRoot?.querySelector(SHADOW_DOM_IMG_SELECTOR);
            if (imgElement && imageUrl) {
                imgElement.src = imageUrl;
                this.setAttribute("open", "true");
            }
        }
    }
    LightMeBro.observedAttributes = ['open'];
    // Define the custom element
    customElements.define(CUSTOM_ELEMENT_NAME, LightMeBro);
    // Attach the Custom Element to the DOM
    const element = document.createElement(CUSTOM_ELEMENT_NAME);
    document.querySelector('body')?.appendChild(element);
    // Event Delegator to invoke custom element
    const openLightbox = (e) => {
        const target = e.target;
        const lightElement = target.closest(TARGET_DATA_ATTRIBUTE);
        if (!lightElement)
            return;
        const imageUrl = lightElement.getAttribute(DATA_ATTRIBUTE);
        const lightbox = document.querySelector(CUSTOM_ELEMENT_NAME);
        if (!lightbox || !imageUrl)
            return;
        lightbox.setLightboxImage = imageUrl;
    };
    // All event listeners
    document.addEventListener("click", openLightbox);
}
;
document.addEventListener("DOMContentLoaded", lightMeBro);
