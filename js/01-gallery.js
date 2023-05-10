import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(`.gallery`);
const elementsGallery = createElementGallery(galleryItems);

galleryContainer.insertAdjacentHTML(`beforeend`, elementsGallery);
galleryContainer.addEventListener(`click`, onGalleryContainerClick);
let instance;

function createElementGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li >
    `;
    })
    .join("");
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const currentImgUrl = evt.target.dataset.source;

  instance = basicLightbox.create(`<img src="${currentImgUrl}"/>`, {
    onShow: (instance) => {
      window.addEventListener("keydown", onEscKeyPress);
    },
    onClose: (instance) => {
      window.removeEventListener("keydown", onEscKeyPress);
    },
  });
  instance.show();
}

function onEscKeyPress(evt) {
  if (evt.code !== "Escape") return;
  instance.close();
}
