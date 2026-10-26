(function () {
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("site-nav");

  if (toggle && panel) {
    var label = toggle.querySelector(".visually-hidden");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    var desktop = window.matchMedia("(min-width: 980px)");
    var onChange = function () {
      if (desktop.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var lifts = document.querySelectorAll(".tile__lift");
  if (!motion.matches && lifts.length && "IntersectionObserver" in window) {
    var watcher = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-paused", !entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    lifts.forEach(function (el) {
      watcher.observe(el);
    });
  }

  // Preview only. Once action is a real Formspree URL, this handler returns
  // and the browser submits the form. See the TODO in connect.html.
  document.querySelectorAll("form[data-preview]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      var action = (form.getAttribute("action") || "").trim();
      if (action && action !== "#") return;

      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var trap = form.querySelector('[name="_gotcha"]');
      if (trap && trap.value) return;

      var status = form.querySelector("[data-status]");
      if (status) status.hidden = false;
      form.reset();
    });
  });
})();
