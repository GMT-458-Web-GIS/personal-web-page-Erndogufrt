document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.getElementById("backButton");

  backButton.addEventListener("click", () => {
    const ref = document.referrer;

    if (ref && ref !== location.href) {
      window.location.href = ref;
    } else {
      window.location.href = "index.html";
    }
  });
});
