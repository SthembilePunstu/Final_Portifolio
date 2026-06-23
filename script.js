const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  status.style.color = "#94a3b8";
  status.textContent = "Sending…";

  const data = {
    access_key: "9c129110-099e-4e85-a52d-072f88d43039",
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    subject: "New message from your portfolio",
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      status.style.color = "#4ade80";
      status.textContent = "Message sent! I'll be in touch soon.";
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.style.color = "#f87171";
    status.textContent = "Something went wrong — try emailing me directly.";
  }
});

// Sticky nav shadow
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// Active nav link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        const link = document.querySelector(
          `nav a[href="#${entry.target.id}"]`,
        );
        if (link) link.classList.add("active");
      }
    });
  },
  { threshold: 0.4 },
);
sections.forEach((s) => observer.observe(s));

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i % 4) * 80 + "ms";
        entry.target.classList.add("visible");
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => revealObs.observe(el));
