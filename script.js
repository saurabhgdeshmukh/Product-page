"use strict";

const imgBtn = Array.from(document.querySelectorAll(".img-btn"));
const img = document.querySelector(".img-main");
const mainImgBtns = Array.from(document.querySelectorAll(".img-main__btn"));

const overlayCon = document.querySelector(".overlay-container");
const overlayImg = document.querySelector(".item-overlay__img");
const overlayImgBtn = Array.from(
  document.querySelectorAll(".overlay-img__btn")
);
const overlayBtnImgs = Array.from(
  document.querySelectorAll(".overlay-img__btn-img")
);
const overlayCloseBtn = document.querySelector(".item-overlay__btn ");
const overlayBtns = Array.from(document.querySelectorAll(".overlay-btn"));

const priceBtns = Array.from(document.querySelectorAll(".price-btn__img"));
const totalItems = document.querySelector(".price-btn__txt");

const bodyOverlay = document.querySelector(".body-wrapper");
const body = document.querySelector("body");

let nextImg = 0,
  noOfItems = 0,
  clicked,
  trasitionTimer;

const minQuery = window.matchMedia("(min-width: 850px)"),
  maxQuery = window.matchMedia("(max-width: 850px)");

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((completedata) => {
    const price = parseFloat(
      completedata.product.price.replace("$", "").replace(",", "")
    ); // Remove $ and commas, then convert to float
    const compareAtPrice = parseFloat(
      completedata.product.compare_at_price.replace("$", "").replace(",", "")
    ); // Remove $ and commas, then convert to float

    const discount = Math.round(
      ((compareAtPrice - price) / compareAtPrice) * 100
    );
    let data1 = "";
    let data2 = "";
    data1 += `<h2 class="price-sub__heading">${completedata.product.vendor}</h2>
        <h1 class="price-main__heading">${completedata.product.title}</h1>
        <div class="line"></div>
        <div class="price-box">
          <div class="price-box__main">
            <span class="price-box__main-new">${completedata.product.price}</span>
            <span class="price-box__main-discount">${discount} %off</span>
          </div>
          <span class="price-box__old">${completedata.product.compare_at_price}</span>
        </div>
        
       
       `;

    document.getElementById("price").innerHTML = data1;
    data2 += `<div class="price-txt">
          ${completedata.product.description} 
        </div>`;
    document.getElementById("description").innerHTML = data2;
  })
  .catch((error) => {
    console.error(error);
  });

document.querySelectorAll(".color-box").forEach((box) => {
  box.addEventListener("click", function () {
    document.querySelectorAll(".color-box").forEach((box) => {
      box.style.border = "none";
    });
    this.style.border = "2px solid black";
  });
});

document.querySelectorAll(".color-box").forEach((box) => {
  box.addEventListener("click", function () {
    document.querySelectorAll(".color-box").forEach((box) => {
      box.classList.remove("selected-border");
    });
    this.classList.add("selected-border");
    document.querySelector(".color-box.selected")?.classList.remove("selected");
    this.classList.add("selected");
  });
});

function transitionDelay() {
  body.classList.add("preload");
  clearTimeout(trasitionTimer);
  trasitionTimer = setTimeout(() => {
    body.classList.remove("preload");
  }, 1000);
}

function imgBtns(btns, img, imgName) {
  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (e.target.classList.contains(`${imgName}__btnlft-img`)) {
        if (nextImg <= 0) nextImg = 3;
        else nextImg--;

        img.src = `images/image-product-${nextImg + 1}.jpg`;
      }

      if (e.target.classList.contains(`${imgName}__btnrgt-img`)) {
        if (nextImg >= 3) nextImg = 0;
        else nextImg++;

        img.src = `images/image-product-${nextImg + 1}.jpg`;
      }
    });
  });
}

imgBtns(overlayBtns, overlayImg, "item-overlay");
imgBtns(mainImgBtns, img, "img-main");

priceBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    clicked = false;
    if (e.target.classList.contains("price-btn__add-img")) {
      if (noOfItems >= 10) return;
      noOfItems++;
      productPrice(noOfItems);
    } else if (e.target.classList.contains("price-btn__remove-img")) {
      if (noOfItems <= 0) return;
      noOfItems--;
      productPrice(noOfItems);
    }
  });
});

img.addEventListener("click", function () {
  if (minQuery.matches) {
    overlayCon.style.display = "block";
    overlayImg.src = img.src;
  }
});

overlayCloseBtn.addEventListener("click", function () {
  if (minQuery.matches) {
    overlayCon.style.display = "none";
  }
});

overlayImgBtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    overlayImg.src = `images/image-product-${i + 1}.jpg`;
    nextImg = e.target.dataset.img;
  });
});
imgBtn.forEach((btn, i) => {
  btn.addEventListener("click", function () {
    img.src = `images/image-product-${i + 1}.jpg`;
  });
});

window.addEventListener("load", function () {
  transitionDelay();
});
