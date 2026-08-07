let currentPlatform = "all";
let selectedDownloadUrl = "";

const q = document.getElementById("q");
const filter = document.getElementById("filter");
const modal = document.getElementById("download-modal");
const closeButton = document.getElementById("modal-close");
const directButton = document.getElementById("direct-download");
const copyButton = document.getElementById("copy-download-link");
const selectedName = document.getElementById("selected-download-name");
const selectedLogo = document.getElementById("selected-download-logo");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
let toastTimer;

function stars(number) {
  const full = Math.floor(number);
  const half = number - full >= 0.5;
  let result = "";

  for (let index = 0; index < 5; index += 1) {
    const className = index < full
      ? "filled"
      : (index === full && half ? "half" : "empty");
    result += `<span class="star ${className}">★</span>`;
  }

  return `<div class="star-rating">${result}<span class="rating-val">${number.toFixed(1)}</span></div>`;
}

function statusClass(status) {
  const normalized = String(status || "").toLowerCase();
  return ["working", "down", "updating"].includes(normalized) ? normalized : "down";
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "—";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatVersion(version) {
  const str = String(version || "—");
  if (str.length >= 11) {
    return str.slice(0, 7) + "...";
  }
  return str;
}

function createCard(item) {
  const hasMobile = item.platforms.includes("android") || item.platforms.includes("ios");
  const hasVng = hasMobile && (item.versionVng || item.statusVng);
  const safeUrl = item.downloadUrl || "";

  const globalVersionRaw = item.version || "—";
  const globalVersionFormatted = formatVersion(globalVersionRaw);

  const globalMeta = `
    <span class="meta-group global" title="Global Version ${escapeHtml(globalVersionRaw)} · ${escapeHtml(capitalize(item.status))}">
      <span class="meta-label">GLOBAL</span>
      <span class="version-chip">${escapeHtml(globalVersionFormatted)}</span>
      <span class="status-badge status-${statusClass(item.status)}">
        <span class="dot ${statusClass(item.status)}"></span>
        ${escapeHtml(capitalize(item.status))}
      </span>
    </span>`;

  const vngVersionRaw = item.versionVng || "—";
  const vngVersionFormatted = formatVersion(vngVersionRaw);

  const vngMeta = hasVng
    ? `
      <span class="meta-group vng" title="VNG Version ${escapeHtml(vngVersionRaw)} · ${escapeHtml(capitalize(item.statusVng))}">
        <span class="meta-label">VNG</span>
        <span class="version-chip">${escapeHtml(vngVersionFormatted)}</span>
        <span class="status-badge status-${statusClass(item.statusVng)}">
          <span class="dot ${statusClass(item.statusVng)}"></span>
          ${escapeHtml(capitalize(item.statusVng))}
        </span>
      </span>`
    : "";

  const warning = item.warn
    ? `<div class="warn-badge"><span class="warn-dot"></span>High ban risk</div>`
    : "";

  return `
    <div class="card${item.warn ? " card-warn" : ""}">
      ${warning}
      <div class="card-head">
        <div class="avatar">
          <img src="${escapeHtml(item.avatar)}" alt="${escapeHtml(item.name)}" onerror="this.style.display='none'" />
        </div>
        <div class="title-block">
          <div class="title">${escapeHtml(item.name)}</div>
          ${stars(Number(item.rating) || 0)}
        </div>
      </div>
      <div class="download-rows">
        <div class="download-row">
          ${globalMeta}
          <button class="btn btn-primary" type="button" ${safeUrl ? `data-download-url="${escapeHtml(safeUrl)}" data-download-name="${escapeHtml(`${item.name} · Global`)}" data-download-avatar="${escapeHtml(item.avatar || "")}"` : "disabled"}>Download</button>
        </div>
        ${hasVng ? `
          <div class="download-row">
            ${vngMeta}
            <button class="btn btn-vng" type="button" ${item.downloadVngUrl ? `data-download-url="${escapeHtml(item.downloadVngUrl)}" data-download-name="${escapeHtml(`${item.name} · VNG`)}" data-download-avatar="${escapeHtml(item.avatar || "")}"` : "disabled"}>Download</button>
          </div>` : ""}
      </div>
    </div>`;
}

function getFiltered() {
  const query = q.value.trim().toLowerCase();
  const statusFilter = filter.value;

  return DATA
    .filter((item) => {
      const searchable = [
        item.name,
        item.version,
        item.versionVng,
        item.status,
        item.statusVng
      ].join(" ").toLowerCase();

      if (query && !searchable.includes(query)) return false;
      if (["working", "down", "updating"].includes(statusFilter) && item.status !== statusFilter) return false;
      if (statusFilter === "hasVng" && !(item.versionVng || item.downloadVngUrl)) return false;
      return true;
    })
    .sort((first, second) => {
      const priority = { working: 0, updating: 1, down: 2 };
      if (priority[first.status] !== priority[second.status]) {
        return priority[first.status] - priority[second.status];
      }
      return second.rating - first.rating;
    });
}

function renderAll() {
  const list = getFiltered();
  const platforms = ["android", "ios", "windows", "macos"];
  let anyVisible = false;

  platforms.forEach((platform) => {
    const section = document.getElementById(`${platform}-section`);
    const grid = document.getElementById(`grid-${platform}`);
    const count = document.getElementById(`${platform}-count`);
    const shouldShow = currentPlatform === "all" || currentPlatform === platform;

    if (!shouldShow) {
      section.style.display = "none";
      return;
    }

    const items = list.filter((item) => item.platforms.includes(platform));
    count.textContent = items.length;
    section.style.display = items.length ? "block" : "none";

    if (!items.length) return;

    anyVisible = true;
    grid.innerHTML = items.map(createCard).join("");
    grid.querySelectorAll(".card").forEach((card, index) => {
      window.setTimeout(() => card.classList.add("show"), index * 40);
    });
  });

  document.getElementById("empty-state").hidden = anyVisible;
  document.getElementById("total-count").textContent = list.length;
  document.getElementById("working-count").textContent = list.filter((item) => item.status === "working").length;
  document.getElementById("down-count").textContent = list.filter((item) => item.status === "down").length;
  document.getElementById("updating-count").textContent = list.filter((item) => item.status === "updating").length;
}

function openDownloadModal(url, name, avatar) {
  if (!url) return;

  selectedDownloadUrl = url;
  selectedName.textContent = name || "Executor";
  selectedLogo.alt = name || "Executor logo";
  selectedLogo.src = avatar || "";
  selectedLogo.style.display = avatar ? "block" : "none";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeDownloadModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  selectedDownloadUrl = "";
}

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

async function copyDownloadLink() {
  if (!selectedDownloadUrl) return;

  try {
    await navigator.clipboard.writeText(selectedDownloadUrl);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = selectedDownloadUrl;
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }

  closeDownloadModal();
  showToast("Download link copied");
}

q.addEventListener("input", renderAll);
filter.addEventListener("change", renderAll);

document.querySelectorAll(".platform-btn").forEach((button) => {
  button.addEventListener("click", () => {
    currentPlatform = button.dataset.platform;
    document.querySelectorAll(".platform-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderAll();
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-download-url]");
  if (!button) return;
  openDownloadModal(
    button.dataset.downloadUrl,
    button.dataset.downloadName,
    button.dataset.downloadAvatar,
  );
});

closeButton.addEventListener("click", closeDownloadModal);
directButton.addEventListener("click", () => {
  if (!selectedDownloadUrl) return;
  window.open(selectedDownloadUrl, "_blank", "noopener");
  close.closeDownloadModal();
});
copyButton.addEventListener("click", copyDownloadLink);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeDownloadModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeDownloadModal();
  }
});

renderAll();
