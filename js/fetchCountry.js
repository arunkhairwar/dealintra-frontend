document.addEventListener("DOMContentLoaded", () => {
  const publicKey = "SzN2SDhV8kXWtw4K4";
  emailjs.init(publicKey);
  initCountryDropdown("country");
  bindEmailForm("contact-form");
});

// -----------------------------
// Reusable: bind EmailJS to any form
// -----------------------------

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
  const templateId = "template_r9u0a6t";
  const form = document.getElementById(formId);

  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector(".btn-text");
  let isSubmitting = false;

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    submitBtn.disabled = true;
    // submitBtn.classList.add("loading");
    btnText.textContent = "Submitting...";

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
        message: "Failed to Submit Form.",
        bgColor: "red",
        duration: 4000,
      });
    } finally {
      submitBtn.disabled = false;
      // submitBtn.classList.remove("loading");
      btnText.textContent = "Submit";
      isSubmitting = false;
    }
  });
}

// -----------------------------
// load countries
// -----------------------------

async function initCountryDropdown(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
    const data = await res.json();

    const countries = data
      .map((c) => c.name.common)
      .sort((a, b) => a.localeCompare(b));

    select.innerHTML = '<option value="">Select Country</option>';

    countries.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Country load failed:", error);
    select.innerHTML = '<option value="">Failed to load countries</option>';
  }
}
