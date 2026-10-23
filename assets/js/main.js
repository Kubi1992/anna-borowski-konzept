/* ==========================================================================
   Anna Borowski – Designkonzept · Interaktionen
   Theme · Menü · Teilen · Bilderschutz · Galerie · Lightbox · Anfrage · Formulare
   ========================================================================== */
(function () {
  "use strict";

  /* Zentrale Einstellungen – hier echte Daten eintragen */
  var CONFIG = {
    instagram: "https://www.instagram.com/",   // TODO: Annas Instagram-Profil
    artist: "Anna Borowski"
  };

  var WORKS = window.WORKS || [];
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* privat/gesperrt */ } }
  };

  var ICONS = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7.5 7.5L12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4.5 4.5 0 006.4 0l3-3a4.5 4.5 0 00-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 00-6.4 0l-3 3a4.5 4.5 0 006.4 6.4l1-1"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.3-1.2z"/><path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1.2-.5-2.3-1.6-2.8-2.8l.9-1-1-2z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h-2.5A3.5 3.5 0 009 6.5V9H6.5v3.5H9V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 011-1H15z"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M11 9.5c-.6 2.8-1.6 7-2.5 10.5M10.5 14c3.8 1.4 6.4-1 6-4a4.6 4.6 0 00-8.8-.4c-.4 1.4.1 2.6.8 3.2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>'
  };

  /* ------------------------------------------------------------------ Toast */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2600);
  }

  /* ------------------------------------------------------------------ Theme */
  function initTheme() {
    var root = document.documentElement;
    function sync() {
      var dark = root.dataset.theme === "dark";
      $$("[data-theme-toggle]").forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(dark));
        btn.setAttribute("aria-label", dark ? "Helles Design aktivieren" : "Dunkles Design aktivieren");
        btn.title = btn.getAttribute("aria-label");
      });
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.content = dark ? "#121417" : "#f7f5f1";
    }
    $$("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
        store.set("theme", root.dataset.theme);
        sync();
      });
    });
    sync();
  }

  /* ------------------------------------------------------------- Navigation */
  function initNav() {
    var body = document.body;
    var btn = $("[data-menu-toggle]");
    function setOpen(open) {
      body.classList.toggle("menu-open", open);
      if (btn) {
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      }
    }
    if (btn) btn.addEventListener("click", function () { setOpen(!body.classList.contains("menu-open")); });
    $$(".sidebar a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function () { setOpen(false); });

    var topbar = $(".topbar");
    if (topbar) {
      var onScroll = function () { topbar.classList.toggle("is-scrolled", window.scrollY > 8); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    $$("[data-instagram]").forEach(function (a) { a.href = CONFIG.instagram; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------------------------------------------------------- Teilen */
  var shareDialog;
  function buildShareDialog() {
    shareDialog = document.createElement("dialog");
    shareDialog.className = "dialog";
    shareDialog.setAttribute("aria-labelledby", "share-title");
    shareDialog.innerHTML =
      '<div class="dialog__inner">' +
        '<div class="dialog__head"><div><p class="eyebrow">Teilen</p><h2 id="share-title">Seite teilen</h2></div>' +
        '<button class="icon-btn" data-close aria-label="Schließen">' + ICONS.close + '</button></div>' +
        '<ul class="share-list">' +
          '<li><button type="button" data-copy>' + ICONS.link + '<span>Link kopieren</span></button></li>' +
          '<li><a data-net="whatsapp" target="_blank" rel="noopener">' + ICONS.whatsapp + '<span>WhatsApp</span></a></li>' +
          '<li><a data-net="facebook" target="_blank" rel="noopener">' + ICONS.facebook + '<span>Facebook</span></a></li>' +
          '<li><a data-net="pinterest" target="_blank" rel="noopener">' + ICONS.pinterest + '<span>Pinterest</span></a></li>' +
          '<li><a data-net="mail">' + ICONS.mail + '<span>E-Mail</span></a></li>' +
        '</ul>' +
      '</div>';
    document.body.appendChild(shareDialog);
    wireDialog(shareDialog);
    $("[data-copy]", shareDialog).addEventListener("click", function () {
      var url = shareDialog.dataset.url;
      var done = function () { toast("Link kopiert"); shareDialog.close(); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { fallbackCopy(url); done(); });
      else { fallbackCopy(url); done(); }
    });
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignorieren */ }
    ta.remove();
  }
  function share(opts) {
    var url = opts.url || location.href.split("#")[0];
    var title = opts.title || document.title;
    var isTouch = window.matchMedia("(pointer: coarse)").matches;
    // Auf Smartphones das native Teilen-Menü des Systems verwenden
    if (navigator.share && isTouch) {
      navigator.share({ title: title, url: url }).catch(function () {});
      return;
    }
    if (!shareDialog) buildShareDialog();
    var u = encodeURIComponent(url), t = encodeURIComponent(title);
    shareDialog.dataset.url = url;
    $("#share-title", shareDialog).textContent = opts.heading || "Seite teilen";
    $('[data-net="whatsapp"]', shareDialog).href = "https://api.whatsapp.com/send?text=" + t + "%20" + u;
    $('[data-net="facebook"]', shareDialog).href = "https://www.facebook.com/sharer/sharer.php?u=" + u;
    $('[data-net="pinterest"]', shareDialog).href = "https://pinterest.com/pin/create/button/?url=" + u + "&description=" + t;
    $('[data-net="mail"]', shareDialog).href = "mailto:?subject=" + t + "&body=" + u;
    shareDialog.showModal();
  }
  function initShare() {
    $$("[data-share]").forEach(function (btn) {
      btn.addEventListener("click", function () { share({}); });
    });
  }

  /* --------------------------------------------------- Dialog-Grundfunktionen */
  function wireDialog(dlg) {
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();   // Klick auf Hintergrund schließt
    });
  }

  /* ------------------------------------------------------------ Bilderschutz */
  function initProtection() {
    var isArt = function (el) { return el && el.closest && el.closest(".protected, .lightbox__figure"); };
    document.addEventListener("contextmenu", function (e) {
      if (isArt(e.target)) {
        e.preventDefault();
        toast("© " + CONFIG.artist + " – die Bilder sind urheberrechtlich geschützt.");
      }
    });
    document.addEventListener("dragstart", function (e) { if (isArt(e.target)) e.preventDefault(); });
  }

  /* ------------------------------------------------------------- Hilfsfunktionen */
  function thumb(w) { return "assets/img/works/thumb/" + w.id + ".jpg"; }
  function large(w) { return "assets/img/works/large/" + w.id + ".jpg"; }
  function byId(id) { for (var i = 0; i < WORKS.length; i++) if (WORKS[i].id === id) return WORKS[i]; return null; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function workUrl(w) { return location.href.split("#")[0].split("?")[0].replace(/[^/]*$/, "") + "index.html#werk-" + w.id; }

  function statusHtml(w) {
    return w.status === "sold"
      ? '<span class="status status--sold">Verkauft</span>'
      : '<button type="button" class="inquire-link" data-inquire="' + w.id + '">Anfragen</button>';
  }

  function workCard(w, index) {
    var r = w.w / w.h;
    return '' +
      '<figure class="work reveal" style="--r:' + r.toFixed(4) + ';flex-grow:' + r.toFixed(4) + '">' +
        '<button type="button" class="work__media protected" data-open="' + index + '" aria-label="' + esc(w.title) + ' – Großansicht öffnen">' +
          '<img src="' + thumb(w) + '" width="' + w.w + '" height="' + w.h + '" alt="' + esc(w.title) + ', ' + esc(w.technique) + ', ' + esc(w.size) + '" loading="lazy" decoding="async" draggable="false">' +
        '</button>' +
        '<figcaption class="work__caption">' +
          '<span class="work__title">' + esc(w.title) + '</span>' +
          '<span class="work__action">' + statusHtml(w) + '</span>' +
          '<span class="work__meta">' + esc(w.technique) + ' · <span class="nowrap">' + esc(w.size) + '</span></span>' +
        '</figcaption>' +
      '</figure>';
  }

  var revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObserver.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -40px 0px" })
    : null;
  function observeReveal(ctx) {
    $$(".reveal:not([data-rv])", ctx).forEach(function (el, i) {
      el.dataset.rv = "";
      el.style.transitionDelay = Math.min(i, 6) * 60 + "ms";
      if (revealObserver) revealObserver.observe(el); else el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------------- Galerie */
  function renderGrid(container, list) {
    container.innerHTML = list.map(workCard).join("");
    observeReveal(container);
    container.onclick = function (e) {
      var inq = e.target.closest("[data-inquire]");
      if (inq) { openInquiry(byId(inq.dataset.inquire)); return; }
      var open = e.target.closest("[data-open]");
      if (open) lightbox.open(list, +open.dataset.open);
    };
  }

  function initGallery() {
    var gallery = $("#gallery");
    if (!gallery) return;
    var view = store.get("gallery-view") || "rows";

    function render() {
      gallery.className = "gallery gallery--" + view;
      $$("[data-view]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.view === view)); });
      renderGrid(gallery, WORKS);
    }
    $$("[data-view]").forEach(function (b) {
      b.addEventListener("click", function () { view = b.dataset.view; store.set("gallery-view", view); render(); });
    });
    render();

    // Direktlink auf ein Werk: index.html#werk-<id>
    var m = location.hash.match(/^#werk-(.+)$/);
    if (m) {
      var idx = WORKS.findIndex(function (w) { return w.id === decodeURIComponent(m[1]); });
      if (idx > -1) lightbox.open(WORKS, idx);
    }
  }

  /* --------------------------------------------------------------- Lightbox */
  var lightbox = (function () {
    var el, img, list = [], index = 0, lastFocus, touchX = null;

    function build() {
      el = document.createElement("div");
      el.className = "lightbox";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      el.setAttribute("aria-label", "Bildansicht");
      el.innerHTML =
        '<div class="lightbox__stage">' +
          '<figure class="lightbox__figure protected"><img class="lightbox__img" alt="" draggable="false"><div class="lightbox__shield"></div></figure>' +
          '<button class="lightbox__nav lightbox__prev" aria-label="Vorheriges Bild">' + ICONS.prev + '</button>' +
          '<button class="lightbox__nav lightbox__next" aria-label="Nächstes Bild">' + ICONS.next + '</button>' +
        '</div>' +
        '<div class="lightbox__info">' +
          '<p class="lightbox__count"></p>' +
          '<div><h2 class="lightbox__title"></h2><p class="lightbox__meta"></p><div class="lightbox__status"></div></div>' +
          '<div class="lightbox__buttons"></div>' +
        '</div>' +
        '<button class="lightbox__close" aria-label="Schließen">' + ICONS.close + '</button>';
      document.body.appendChild(el);
      img = $(".lightbox__img", el);

      $(".lightbox__close", el).addEventListener("click", close);
      $(".lightbox__prev", el).addEventListener("click", function () { go(-1); });
      $(".lightbox__next", el).addEventListener("click", function () { go(1); });
      $(".lightbox__stage", el).addEventListener("click", function (e) { if (e.target === e.currentTarget) close(); });
      $(".lightbox__buttons", el).addEventListener("click", function (e) {
        var w = list[index];
        if (e.target.closest("[data-inquire]")) openInquiry(w);
        if (e.target.closest("[data-share-work]")) share({ url: workUrl(w), title: "„" + w.title + "“ – " + CONFIG.artist, heading: "Werk teilen" });
      });
      document.addEventListener("keydown", function (e) {
        if (!el.classList.contains("is-open") || document.querySelector("dialog[open]")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
        if (e.key === "Tab") trapFocus(e);
      });
      // Wischgesten auf dem Smartphone
      el.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
      el.addEventListener("touchend", function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX = null;
      });
    }

    function trapFocus(e) {
      var f = $$("button, a[href]", el).filter(function (b) { return b.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function show() {
      var w = list[index];
      // Erst das (bereits geladene) Vorschaubild, dann die große Version nachladen
      img.src = thumb(w);
      img.alt = w.title + ", " + w.technique + ", " + w.size;
      img.classList.add("is-loading");
      var hi = new Image();
      hi.onload = function () { if (list[index] === w) { img.src = hi.src; img.classList.remove("is-loading"); } };
      hi.src = large(w);
      setTimeout(function () { img.classList.remove("is-loading"); }, 400);

      $(".lightbox__count", el).textContent = (index + 1) + " / " + list.length;
      $(".lightbox__title", el).textContent = w.title;
      $(".lightbox__meta", el).textContent = w.technique + " · " + w.size;
      $(".lightbox__status", el).innerHTML = w.status === "sold"
        ? '<span class="status status--sold">Verkauft</span>'
        : '<span class="status">Verfügbar</span><span class="lightbox__price"> · Preis auf Anfrage</span>';
      $(".lightbox__buttons", el).innerHTML =
        (w.status === "sold" ? "" : '<button class="btn btn--primary" data-inquire>Kaufanfrage stellen</button>') +
        '<button class="btn btn--share" data-share-work aria-label="Werk teilen">' + ICONS.share + '<span class="label">Teilen</span></button>';
      var multi = list.length > 1;
      $(".lightbox__prev", el).hidden = !multi;
      $(".lightbox__next", el).hidden = !multi;
      if ($("#gallery")) history.replaceState(null, "", "#werk-" + w.id);
      // Nachbarbilder vorladen
      if (multi) [1, -1].forEach(function (d) { new Image().src = large(list[(index + d + list.length) % list.length]); });
    }

    function open(l, i) {
      if (!el) build();
      list = l; index = Math.max(0, i);
      lastFocus = document.activeElement;
      show();
      el.classList.add("is-open");
      document.body.style.overflow = "hidden";
      $(".lightbox__close", el).focus({ preventScroll: true });
    }
    function close() {
      el.classList.remove("is-open");
      document.body.style.overflow = "";
      if (/^#werk-/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    function go(d) { index = (index + d + list.length) % list.length; show(); }

    return { open: open };
  })();

  /* ------------------------------------------------------------ Kaufanfrage */
  var inquiryDialog;
  function openInquiry(w) {
    if (!w) return;
    if (!inquiryDialog) {
      inquiryDialog = document.createElement("dialog");
      inquiryDialog.className = "dialog";
      inquiryDialog.setAttribute("aria-labelledby", "inq-title");
      document.body.appendChild(inquiryDialog);
      wireDialog(inquiryDialog);
    }
    inquiryDialog.innerHTML =
      '<div class="dialog__inner">' +
        '<div class="dialog__head"><div><p class="eyebrow">Kaufanfrage</p><h2 id="inq-title">Interesse an diesem Werk?</h2></div>' +
        '<button class="icon-btn" data-close aria-label="Schließen">' + ICONS.close + '</button></div>' +
        '<div class="dialog__work protected"><img src="' + thumb(w) + '" alt="" draggable="false">' +
          '<div><strong>' + esc(w.title) + '</strong><span>' + esc(w.technique) + ' · ' + esc(w.size) + '</span></div></div>' +
        '<form class="form" novalidate>' +
          '<div class="form__row form__row--2">' +
            '<div class="field"><label for="inq-name">Name</label><input id="inq-name" name="name" autocomplete="name" required></div>' +
            '<div class="field"><label for="inq-mail">E-Mail</label><input id="inq-mail" name="email" type="email" autocomplete="email" required></div>' +
          '</div>' +
          '<div class="field"><label for="inq-msg">Nachricht</label><textarea id="inq-msg" name="message" rows="4">Guten Tag Frau Borowski,\n\nich interessiere mich für Ihr Bild „' + esc(w.title) + '“ (' + esc(w.size) + ') und würde gerne mehr über Preis und Verfügbarkeit erfahren.\n\nViele Grüße</textarea></div>' +
          '<label class="check"><input type="checkbox" required> <span>Ich bin mit der Verarbeitung meiner Angaben zur Beantwortung der Anfrage einverstanden.</span></label>' +
          '<button class="btn btn--primary" type="submit">Anfrage senden</button>' +
          '<p class="form__note">Unverbindlich – Sie erhalten eine persönliche Antwort.</p>' +
        '</form>' +
      '</div>';
    $("form", inquiryDialog).addEventListener("submit", function (e) {
      e.preventDefault();
      if (!e.target.reportValidity()) return;
      e.target.outerHTML = successHtml("Vielen Dank für Ihre Anfrage!", "Anna Borowski meldet sich in Kürze bei Ihnen. (Demo – es wurde nichts versendet.)");
    });
    inquiryDialog.showModal();
  }

  function successHtml(title, text) {
    return '<div class="form-success" role="status">' + ICONS.check + '<h3>' + title + '</h3><p>' + text + '</p></div>';
  }

  /* ---------------------------------------------------------- Kontaktformular */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    var topic = $("#c-topic", form), workField = $("#c-work-field", form), work = $("#c-work", form);
    WORKS.filter(function (w) { return w.status !== "sold"; }).forEach(function (w) {
      var o = document.createElement("option");
      o.value = w.id; o.textContent = "„" + w.title + "“ – " + w.size;
      work.appendChild(o);
    });
    function syncWork() { workField.hidden = topic.value !== "kauf"; }
    topic.addEventListener("change", syncWork);

    // Vorbelegung über kontakt.html?werk=<id>
    var id = new URLSearchParams(location.search).get("werk");
    if (id && byId(id)) { topic.value = "kauf"; work.value = id; }
    syncWork();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      form.outerHTML = successHtml("Vielen Dank für Ihre Nachricht!", "Ich melde mich so bald wie möglich bei Ihnen. (Demo – es wurde nichts versendet.)");
    });
  }

  /* ------------------------------------------------- Kalendereintrag (.ics) */
  function initCalendar() {
    $$("[data-ics]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var d = btn.dataset;
        var ics = [
          "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Anna Borowski//Ausstellungen//DE",
          "BEGIN:VEVENT",
          "UID:" + d.ics + "@anna-borowski.art",
          "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
          "DTSTART;VALUE=DATE:" + d.start,
          "DTEND;VALUE=DATE:" + d.end,
          "SUMMARY:" + d.title,
          "LOCATION:" + d.location,
          "END:VEVENT", "END:VCALENDAR"
        ].join("\r\n");
        var a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
        a.download = d.ics + ".ics";
        document.body.appendChild(a); a.click(); a.remove();
        toast("Kalendereintrag heruntergeladen");
      });
    });
  }

  /* ------------------------------------------------------------------ Start */
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initNav();
    initShare();
    initProtection();
    initGallery();
    initContactForm();
    initCalendar();
    observeReveal(document);
  });
})();
