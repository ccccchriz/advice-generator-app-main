const generateAdivce = document.getElementById("adivce__new");
const adviceId = document.getElementById("advice__id");
const adviceText = document.getElementById("advice__text");

const image = document.getElementsByClassName("advice__image")[0];

let isFetching = false;

async function fetchAdvice() {
  return await fetch("https://api.adviceslip.com/advice", {
    cache: "no-store",
  });
}

async function updateAdvice() {
  if (isFetching) return console.log("waiting");
  isFetching = true;
  image.classList.add("advice__image--animate");
  let advice;
  let count = 0;

  while (advice == undefined || adviceId.textContent == advice.slip.id) {
    count += 1;
    if (count > 100) break;
    await fetchAdvice()
      .then((data) => data.json())
      .then((data) => (advice = data));
  }

  adviceId.textContent = advice.slip.id;
  adviceText.textContent = advice.slip.advice;

  isFetching = false;
  image.classList.remove("advice__image--animate");
}

generateAdivce.addEventListener("click", updateAdvice);
