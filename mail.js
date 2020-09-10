const modalMail = document.querySelector(".modal-mail");
const modalMailTitle = document.querySelector(".modal-mail__title");
const modalMailText = document.querySelector(".modal-mail__text");
const form = document.querySelectorAll("form");
const resetForm = () => {
  for (let i = 0; i < form.length; i++) {
    form[i].reset();
  }
};

// Отправка данных на сервер
function send(event, php) {
  console.log("Отправка запроса");
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  var req = new XMLHttpRequest();
  req.open("POST", php, true);
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      let json = JSON.parse(this.response);
      console.log(json);

      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result === "success") {
        //Если сообщение отправлено
        alert("Сообщение отправлено");
        modalMail.style.display = "flex";
        modalWindow.classList.remove("modal-window__wrapper_visible");
        resetForm();
        const timerSend = setTimeout(() => {
          modalMail.style.display = "none";
        }, 3000);
      } else {
        // Если произошла ошибка
        alert("Ошибка. Сообщение не отправлено");
        modalMailTitle.textContent = "Ошибка!";
        modalMailText.textContent = "Сообщение не отправлено! Ошибка";
        modalMail.style.display = "flex";
        const timerSend = setTimeout(() => {
          modalMail.style.display = "none";
        }, 3000);
      }
      // Если не удалось связаться с php файлом
    } else {
      alert("server error: " + req.status);
      modalWindow.classList.remove("modal-window__wrapper_visible");
      document.body.style.overflow = "scroll";
      resetForm();
    }
  };

  // Если не удалось отправить запрос. Стоит блок на хостинге
  req.onerror = function () {
    alert("Ошибка отправки запроса");
  };
  req.send(new FormData(event.target));
}
