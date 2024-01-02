// ---------- Constants ---------------------------------------------
const apiUrl = "https://tideapi.supersite.cloud/checkurl";
const input_link = document.getElementById("ilink");
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].*$/;
const response = document.getElementsByClassName("response")[0];
// ------------------------------------------------------------------

// ---------- FUNCTIONS  ---------------------------------------------
function reset_css() {
  response.classList.add("hidden");
  response.classList.remove("notify");
  response.classList.remove("danger");
  response.classList.remove("warning");
}

const verificarLinkSpan = document.getElementById("verificarLinkSpan");
verificarLinkSpan.addEventListener("click", function () {
  verificarLink();
});

function verificarLink() {
  const link = input_link.value;
  if (urlRegex.test(link)) {
    reset_css();
    verificarConfiabilidade(link);
  } else {
    console.log("URL inválida");
  }
}

function verificarConfiabilidade(link) {
  const requestData = {
    url: link,
    format: "json",
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((res) => {
      let icon = "";
      let info = "";
      if (res.results != undefined) {
        if (res.results.valid == true) {
          icon = `<img class="material-symbols-outlined" src="fig/danger-ico.svg" alt="danger">`;
          info = `${icon}<p>O link <i>${res.results.url}</i> não é seguro!</p>`;
          response.classList.add("danger");
        } else if (res.results.in_database == false) {
          icon = `<img class="material-symbols-outlined" src="fig/report-ico.svg" alt="report">`;
          info = `${icon}<p>O link <i>${res.results.url}</i><br> não está na base de dados!</p>`;
          response.classList.add("warning");
        } else {
          icon = `<img class="material-symbols-outlined" src="fig/check-ico.svg" alt="check">`;
          info = `${icon}<p>O link <i>${res.results.url}</i> é seguro!</p>`;
        }
      } else {
        info = `Link Inválido ou não encontrado!`;
      }
      response.innerHTML = info;
      response.classList.add("notify");
      response.classList.remove("hidden");
    })
    .catch((err) => {
      console.log("Erro na requisição:", err);
    });
}

//  ---------- EVENTS ---------------------------------------------

input_link.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    verificarLink();
  }
});

response.addEventListener("click", function () {
  reset_css();
});
