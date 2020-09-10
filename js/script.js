// burger

function openMenu(burgerItem, menuWrapper, menuInner, menuLinkBtn) {
  const burger = document.querySelector(burgerItem);
  const menu = document.querySelector(menuWrapper);
  const menuList = document.querySelector(menuInner);
  const menuLink = document.querySelector(menuLinkBtn);

  burger.addEventListener("click", (event) => {
    if (event.target) {
      event.preventDefault();
    }
    const target = event.target;

    if (target.closest(".burger")) {
      burger.classList.toggle("burger-active");
    }
    if (target.closest(".burger-active")) {
      menu.style.height = "100vh";
      menuList.style.transform = "translateY(0)";
    } else {
      menu.style.height = "";
      menuList.style.transform = "";
    }
  });
  menu.addEventListener("click", (event) => {
    if (
      !event.target.closest(".burger-active") ||
      event.target.closest(menuLink)
    ) {
      burger.classList.remove("burger-active");
      menu.style.height = "";
      menuList.style.transform = "";
    }
  });
}

openMenu(".burger", ".menu", ".menu__list", ".menu__link");

// tabs

function getSwiper() {
  var mySwiper = new Swiper(".car-park-item_visible", {
    init: true,
    speed: 400,
    spaceBetween: 100,
    navigation: {
      nextEl: ".car-park__item-next",
      prevEl: ".car-park__item-prev"
    },
    pagination: {
      el: ".slider-pagination",
      bulletClass: "slider-pagination__bullet",
      bulletActiveClass: "slider-pagination__bullet-active",
      clickable: true
    }
  });
}
getSwiper();

const tabs = document.querySelectorAll(".car-park__tab");
const tabsContent = document.querySelectorAll(".swiper-container-card");

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (event) => {
    tabs.forEach((item) => {
      item.classList.remove("car-park__tab_active");
    });
    event.preventDefault();
    const target = event.target;
    if (!target.classList.contains("car-park__tab_active")) {
      target.classList.add("car-park__tab_active");

      tabsContent.forEach((item) => {
        item.classList.remove("car-park-item_visible");
        if (item.dataset.id === target.dataset.id) {
          item.classList.add("car-park-item_visible");
          getSwiper();
        }
      });
    }
  });
}

// show card

const showAllCard = document.querySelector(".price-content__show-all");
const cardPrice = document.querySelectorAll(".price-item");
const priceContent = document.querySelector(".price__content");

showAllCard.addEventListener("click", (event) => {
  event.preventDefault();

  if (!showAllCard.classList.contains("card-show")) {
    cardPrice.forEach((item) => {
      item.classList.add("price-item-show");
      priceContent.style.gridRowGap = "30px";
      showAllCard.classList.add("card-show");
      showAllCard.textContent = "Скрыть";
    });
  } else {
    cardPrice.forEach((item) => {
      item.classList.remove("price-item-show");
      priceContent.style.gridRowGap = "";
      showAllCard.classList.remove("card-show");
      showAllCard.textContent = "Все цены";
    });
  }
});

// блок отзывов

const addReviewsMore = document.querySelector(".reviews__more"); // кнопка "все отзывы"
const reviewsItems = document.querySelectorAll(".reviews-item"); // все блоки с отзывами

// автоматическое скрытие отзывов при размере экрана 800px

function changeSizeWindow() {
  clientWidth = document.documentElement.clientWidth;
  if (clientWidth < 800) {
    for (let i = 1; i < reviewsItems.length; i++) {
      reviewsItems[i].classList.add("reviews-item-hidden");
      reviewsItems[i].classList.remove("reviews-item-visible");
    }
  }
}

changeSizeWindow();

window.addEventListener("resize", changeSizeWindow, false);
window.removeEventListener("resize", changeSizeWindow, false);

// появление всех отзывов при нажатии на кнопку
addReviewsMore.addEventListener("click", (event) => {
  event.preventDefault();
  reviewsItems.forEach((item) => {
    if (item.classList.contains("reviews-item-hidden")) {
      item.classList.remove("reviews-item-hidden");
      addReviewsMore.textContent = "Скрыть";
      addReviewsMore.style.textAlight = "center";
    } else if (
      !item.classList.contains("reviews-item-hidden") &&
      !item.classList.contains("reviews-item-visible")
    ) {
      item.classList.add("reviews-item-hidden");
      addReviewsMore.textContent = "Все отзывы";
    }
  });
});

const textBlock = document.querySelectorAll(".reviews-item__text-block");
const text = document.querySelectorAll(".reviews-item__text");
const btn = document.querySelectorAll(".reviews-item__text-more");

// уменьшение текста в итеме отзыва
text.forEach((item, i) => {
  const sliceText = item.textContent.slice(0, 350);

  text[i].style.bottom = `calc(-${text[i].clientHeight}px *1.2)`;
  text[i].style.position = "absolute";
  textBlock[i].insertAdjacentHTML(
    "afterbegin",
    `<p class="reviews-item__text-cut">${sliceText}</p>`
  );

  if (item.textContent.length < 350) {
    btn[i].style.display = "none";
    item.style.margin = "0";
  } else {
    const cutText = document.querySelectorAll(".reviews-item__text-cut");
    cutText[i].textContent = cutText[i].textContent + "...";
  }
});
//появление и скрытие полного текста в отзыве
btn.forEach((item, i) => {
  const cutText = document.querySelectorAll(".reviews-item__text-cut");
  if (item.style.display !== "none") {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      if (!item.classList.contains("show")) {
        item.classList.add("show");
        item.textContent = "Скрыть";
        cutText[i].style.position = "absolute";
        cutText[i].style.top = `-${cutText[i].clientHeight}px`;
        cutText[i].style.transition = "all 0.3s ease-in-out";
        text[i].style.bottom = "0";
        text[i].style.position = "relative";
        text[i].style.transition = "all 0.3s ease-in-out";
      } else {
        item.classList.remove("show");
        item.textContent = "Читать полностью";
        cutText[i].style.position = "relative";
        cutText[i].style.top = "0";
        text[i].style.bottom = `-${text[i].clientHeight}px`;
        text[i].style.position = "absolute";
      }
    });
  }
});

// отключение overlay у карты
const overlay = document.querySelector(".overlay");
const map = document.querySelector(".map");

overlay.addEventListener("click", (event) => {
  if (overlay.style.pointerEvents !== "none")
    overlay.style.pointerEvents = "none";
});

map.addEventListener("mouseleave", () => {
  overlay.style.pointerEvents = "";
});
map.addEventListener("touchmove", () => {
  overlay.style.pointerEvents = "";
});

// маска для номера телефона в формах

//форма на странице
new Cleave(".feedback-form__input-phone", {
  phone: true,
  phoneRegionCode: "ru"
});

//форма в модальном окне
new Cleave(".feedback-form__input-phone-modal", {
  phone: true,
  phoneRegionCode: "ru"
});

// кнопка наверх

const btnToTop = document.querySelector(".toTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 480) {
    btnToTop.style.display = "inline-block";
  } else {
    btnToTop.style.display = "none";
  }
});

// функция получения ссылок-якорей
function moveToTop(linkClass) {
  const anchors = document.querySelectorAll(linkClass);

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const dataID = anchor.dataset.target;

      document.querySelector(dataID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
}

moveToTop(".toTop");
moveToTop(".menu__link");
