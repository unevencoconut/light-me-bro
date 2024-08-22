"use strict";
const lightMeBro = async () => {
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
    const placeholderImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    const htmlTemplate = `
    <div class="lightmebro__container">
      <img class="lightmebro__img" src="${placeholderImage}" alt="Lightbox Image">
    </div>
  `;
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
            shadow?.querySelector('.lightmebro__container')?.addEventListener("click", (e) => {
                if (e instanceof MouseEvent) {
                    this.closeLightbox();
                }
            });
        }
        closeLightbox() {
            this.removeAttribute("open");
        }
        set setLightboxImage(imageUrl) {
            const imgElement = this.shadowRoot?.querySelector('.lightmebro__img');
            if (imgElement && imageUrl) {
                imgElement.src = imageUrl;
                this.setAttribute("open", "true");
            }
        }
    }
    LightMeBro.observedAttributes = ['open'];
    // Define the custom element
    customElements.define("light-me-bro", LightMeBro);
    // Attach the Custom Element to the DOM
    const element = document.createElement("light-me-bro");
    document.querySelector('body')?.appendChild(element);
    // Add Event Delegator to invoke custom element
    document.addEventListener("click", (e) => {
        const target = e.target;
        const lightElement = target.closest('[data-lightmebro]');
        if (!lightElement)
            return;
        const imageUrl = lightElement.getAttribute("data-lightmebro");
        const lightbox = document.querySelector("light-me-bro");
        if (!lightbox || !imageUrl)
            return;
        lightbox.setLightboxImage = imageUrl;
    });
};
document.addEventListener("DOMContentLoaded", lightMeBro);
