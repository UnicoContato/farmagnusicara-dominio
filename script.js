const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const privacyOpen = document.getElementById("privacyOpen");
const privacyClose = document.getElementById("privacyClose");
const privacyModal = document.getElementById("privacyModal");
const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryClose = document.getElementById("galleryClose");
let lastScroll = 0;

const closeMobileMenu = () => {
  mobileMenu.classList.remove("open");
  menuButton.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
};

const openModal = modal => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("modal-open");
};

const closeModal = modal => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("modal-open");
};

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 120) {
    header.style.transform = "translateY(-130%)";
    closeMobileMenu();
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScroll = currentScroll;
});

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileLinks.forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

privacyOpen.addEventListener("click", () => openModal(privacyModal));
privacyClose.addEventListener("click", () => closeModal(privacyModal));
privacyModal.addEventListener("click", event => {
  if (event.target === privacyModal) closeModal(privacyModal);
});

document.querySelectorAll("[data-gallery]").forEach(item => {
  item.addEventListener("click", () => {
    galleryImage.src = item.dataset.gallery;
    galleryImage.alt = item.querySelector("img").alt;
    openModal(galleryModal);
  });
});

galleryClose.addEventListener("click", () => closeModal(galleryModal));
galleryModal.addEventListener("click", event => {
  if (event.target === galleryModal) closeModal(galleryModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal(privacyModal);
    closeModal(galleryModal);
    closeMobileMenu();
  }
});
