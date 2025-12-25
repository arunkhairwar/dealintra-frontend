document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".inquire-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      document.getElementById("contact").scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  //   ===================== Handle View project Buttons ========================
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      window.open("https://malkiati.com/", "_blank");
    });
  });
});
