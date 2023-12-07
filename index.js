const generateAdivce = document.getElementById("adivce__new");
const adviceId = document.getElementById("advice__id");
const adviceText = document.getElementById("advice__text");

let isFetching = false;

async function fetchAdvice() {
  return await fetch("https://api.adviceslip.com/advice");
}

async function updateAdvice() {
  if (isFetching) return console.log("waiting");
  isFetching = true;
  let advice;

  while (advice == undefined || adviceId.textContent == advice.slip.id) {
    await fetchAdvice()
      .then((data) => data.json())
      .then((data) => (advice = data));
  }

  adviceId.textContent = advice.slip.id;
  adviceText.textContent = advice.slip.advice;

  isFetching = false;
}

generateAdivce.addEventListener("click", updateAdvice);
