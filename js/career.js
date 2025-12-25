document.addEventListener("DOMContentLoaded", () => {
  const applyButtons = document.querySelectorAll(".apply-btn");
  const careerSection = document.querySelector(".career-section");
  const applySection = document.querySelector(".career-apply-section");

  emailjs.init("SzN2SDhV8kXWtw4K4");
  // Hide form section initially
  applySection.style.display = "none";
  bindEmailForm("apply-form");

  applyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".career-card");

      const title = btn.dataset.title;
      const experience = btn.dataset.experience;
      const skills = btn.dataset.skills;
      const location = btn.dataset.location;

      const descriptionList = card.querySelectorAll("ul li");
      const descriptionItems = [...descriptionList]
        .map((li) => `<li>${li.innerText}</li>`)
        .join("");

      // Fill Apply Section Values
      applySection.querySelector(
        ".job-title h2"
      ).innerHTML = `${title} at Dealintra <span>↗</span>`;

      applySection.querySelector(".job-tags").innerHTML = `
        <span>Experience: ${experience}</span>
        <span>Location: ${location}</span>
        <span>Joining: Immediate</span>
      `;

      applySection.querySelector(".job-description").innerHTML = `
        <p><strong>Key Skills:</strong> ${skills}</p>
        <p><strong>Description:</strong></p>
        <ul>${descriptionItems}</ul>
      `;

      // Show Form Section and Hide Cards
      //   careerSection.style.display = "none";
      applySection.style.display = "block";

      // Scroll to form smoothly
      applySection.scrollIntoView({ behavior: "smooth" });
    });
  });
});

function showToastMessage({ message, bgColor, duration }) {
  Toastify({
    text: message,
    duration: duration ?? 2000,
    gravity: "top",
    position: "center",
    style: {
      background: bgColor,
      color: "#fff",
      fontSize: "14px",
      fontWeight: "600",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      padding: "12px 20px",
    },
  }).showToast();
}

function bindEmailForm(formId) {
  const serviceId = "service_2m1ysl9";
  const templateId = "template_lo6wkb9";
  const form = document.getElementById(formId);

  const submitBtn = form.querySelector('button[type="submit"]');
  // const btnText = submitBtn.querySelector(".btn-text");
  let isSubmitting = false;

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      await emailjs.sendForm(serviceId, templateId, form);
      showToastMessage({
        message: "Form Submitted successfully",
        bgColor: "green",
        duration: 3000,
      });

      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);

      showToastMessage({
        message: "Failed to Submit. Try again",
        bgColor: "red",
        duration: 4000,
      });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "SUBMIT";
      isSubmitting = false;
    }
  });
}
