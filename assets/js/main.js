/*
  Sunrise Multispecialty Clinic — main.js
  Vanilla JS only. No dependencies.
  Sections: Header/Nav, Reveal on scroll, Back to top, FAQ accordion,
            Gallery lightbox, Appointment form validation, Footer year.
*/
(function () {
  "use strict";

  /* ---------- Utilities ---------- */
  var qs = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var qsa = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initActiveNavLink();
    initRevealOnScroll();
    initBackToTop();
    initFaqAccordion();
    initGalleryLightbox();
    initAppointmentForm();
    initFooterYear();
  });

  /* ---------- Sticky header shadow ---------- */
  function initHeader() {
    var header = qs("#siteHeader");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav (hamburger) ---------- */
  function initMobileNav() {
    var btn = qs("#hamburgerBtn");
    var nav = qs("#mainNav");
    if (!btn || !nav) return;

    var closeNav = function () {
      nav.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    };

    btn.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      btn.classList.toggle("is-open", isOpen);
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    qsa("a", nav).forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Highlight current page in nav ---------- */
  /*
    Pages are flat files (about.html, services.html, ...) so the current
    slug is just the filename without its extension; index.html (or no
    filename at all, e.g. a bare "/") is "home".
  */
  function initActiveNavLink() {
    var last = window.location.pathname.split("/").pop().toLowerCase();
    var slug = (!last || last === "index.html") ? "home" : last.replace(/\.html$/, "");
    qsa(".nav-link").forEach(function (link) {
      if ((link.getAttribute("data-nav") || "").toLowerCase() === slug) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Reveal-on-scroll animation ---------- */
  function initRevealOnScroll() {
    var items = qsa(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = qs("#backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 480);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- FAQ Accordion (accessible) ---------- */
  function initFaqAccordion() {
    var triggers = qsa(".accordion-trigger");
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;

      trigger.addEventListener("click", function () {
        var isOpen = trigger.getAttribute("aria-expanded") === "true";

        // Close all others within the same accordion group (single-open behavior)
        var group = trigger.closest(".accordion");
        if (group) {
          qsa(".accordion-trigger", group).forEach(function (other) {
            if (other !== trigger) {
              other.setAttribute("aria-expanded", "false");
              var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
              if (otherPanel) otherPanel.style.maxHeight = null;
            }
          });
        }

        trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
        panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";
      });
    });
  }

  /* ---------- Gallery Lightbox ---------- */
  function initGalleryLightbox() {
    var items = qsa(".gallery-item");
    var lightbox = qs("#lightbox");
    if (!items.length || !lightbox) return;

    var lbImg = qs(".lightbox-img", lightbox);
    var lbCaption = qs(".lightbox-caption", lightbox);
    var closeBtn = qs(".lightbox-close", lightbox);
    var prevBtn = qs(".lightbox-prev", lightbox);
    var nextBtn = qs(".lightbox-next", lightbox);
    var currentIndex = 0;
    var lastFocused = null;

    var showImage = function (index) {
      currentIndex = (index + items.length) % items.length;
      var item = items[currentIndex];
      var img = qs("img", item);
      lbImg.src = img.getAttribute("src");
      lbImg.alt = img.getAttribute("alt") || "";
      lbCaption.textContent = item.getAttribute("data-caption") || img.getAttribute("alt") || "";
    };

    var openLightbox = function (index) {
      lastFocused = document.activeElement;
      showImage(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    var closeLightbox = function () {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    items.forEach(function (item, index) {
      item.addEventListener("click", function () { openLightbox(index); });
    });

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", function () { showImage(currentIndex - 1); });
    nextBtn.addEventListener("click", function () { showImage(currentIndex + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    });
  }

  /* ---------- Appointment / Enquiry Form ---------- */
  // TODO (developer): clinic's WhatsApp number, digits only with country code (matches the wa.me links used elsewhere on the site).
  var CLINIC_WHATSAPP_NUMBER = "919885131390";
  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  function buildAppointmentMessage(values) {
    var lines = [
      "New Appointment Enquiry - Sunrise Clinic",
      "Name: " + values.name,
      "Phone: " + values.phone
    ];
    if (values.email) lines.push("Email: " + values.email);
    lines.push("Service: " + values.service);
    lines.push("Preferred Date: " + values.date);
    lines.push("Preferred Time: " + values.time);
    if (values.message) lines.push("Message: " + values.message);
    return lines.join("\n");
  }

  function initAppointmentForm() {
    var form = qs("#appointmentForm");
    var successBox = qs("#formSuccess");
    var errorBox = qs("#formError");
    var whatsappBtn = qs("#whatsappContinueBtn");
    var submitBtn = form ? qs('button[type="submit"]', form) : null;
    if (!form) return;

    var validators = {
      name: function (v) { return v.trim().length >= 2; },
      phone: function (v) { return /^[0-9+\-\s()]{7,16}$/.test(v.trim()); },
      email: function (v) { return v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      date: function (v) { return v.trim() !== ""; },
      time: function (v) { return v.trim() !== ""; },
      service: function (v) { return v.trim() !== ""; },
      message: function () { return true; }
    };

    var showError = function (field, show) {
      var group = field.closest(".form-group");
      if (!group) return;
      group.classList.toggle("has-error", show);
      field.classList.toggle("is-invalid", show);
      field.setAttribute("aria-invalid", show ? "true" : "false");
    };

    var validateField = function (field) {
      var name = field.name;
      var validator = validators[name];
      if (!validator) return true;
      var valid = validator(field.value);
      showError(field, !valid);
      return valid;
    };

    qsa("[data-validate]", form).forEach(function (field) {
      field.addEventListener("blur", function () { validateField(field); });
      field.addEventListener("input", function () {
        if (field.closest(".form-group").classList.contains("has-error")) validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = qsa("[data-validate]", form);
      var allValid = true;
      var firstInvalid = null;

      fields.forEach(function (field) {
        var ok = validateField(field);
        if (!ok) {
          allValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!allValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var values = {
        name: qs("#patientName", form) ? qs("#patientName", form).value.trim() : "",
        phone: qs("#patientPhone", form) ? qs("#patientPhone", form).value.trim() : "",
        email: qs("#patientEmail", form) ? qs("#patientEmail", form).value.trim() : "",
        service: qs("#patientService", form) ? qs("#patientService", form).value.trim() : "",
        date: qs("#preferredDate", form) ? qs("#preferredDate", form).value.trim() : "",
        time: qs("#preferredTime", form) ? qs("#preferredTime", form).value.trim() : "",
        message: qs("#patientMessage", form) ? qs("#patientMessage", form).value.trim() : ""
      };

      if (whatsappBtn) {
        whatsappBtn.href = "https://wa.me/" + CLINIC_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildAppointmentMessage(values));
      }

      var showSuccess = function () {
        form.classList.add("is-hidden");
        if (successBox) {
          var nameSpan = qs("#successName", successBox);
          if (nameSpan) nameSpan.textContent = values.name ? ", " + values.name.split(" ")[0] : "";
          successBox.classList.add("is-visible");
          successBox.setAttribute("tabindex", "-1");
          successBox.focus();
        }
        form.reset();
      };

      var showSubmitError = function () {
        if (errorBox) errorBox.classList.add("is-visible");
      };

      if (errorBox) errorBox.classList.remove("is-visible");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalLabel = submitBtn.dataset.originalLabel || submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      // Sends the enquiry by email via Web3Forms (free, no backend required: https://web3forms.com).
      // Requires a valid access_key in the form's hidden "access_key" field.
      fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.success) {
            showSuccess();
          } else {
            showSubmitError();
          }
        })
        .catch(function () {
          showSubmitError();
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.dataset.originalLabel;
          }
        });
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    qsa("#currentYear").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
