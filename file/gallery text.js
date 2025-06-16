const gasUrl = "https://script.google.com/macros/s/AKfycbzBxXomKqF_GZ9TiN4GqYDwoOHAoJlGKg9XZiGkIPNppS_jBT7RF-jT5HrghdzqrN00GQ/exec";

// تبدیل اولویت به آیکون ستاره‌ها
function getStars(priority) {
  if (!priority) return "";
  switch (priority.trim()) {
    case "ضروری":
      return `<span class="stars red">★★★</span>`;
    case "متوسط":
      return `<span class="stars orange">★★</span>`;
    case "کم اهمیت":
      return `<span class="stars yellow">★</span>`;
    default:
      return "";
  }
}
// نمایش آیکون وضعیت
function getStatusIcon(status) {
  if (status === "✅") {
    return `<i class="fas fa-check-circle status-icon done" title="انجام‌شده"></i>`;
  } else if (status === "🔄") {
    return `<i class="fas fa-spinner status-icon in-progress" title="در حال انجام"></i>`;
  } else {
    return `<i class="fas fa-times-circle status-icon not-done" title="در انتظار انجام"></i>`;
  }
}

// لیست وضعیت‌ها به ترتیب چرخش
const statusCycle = ["❌", "🔄", "✅"];

// ارسال وضعیت جدید به GAS
function toggleStatus(iconElement, rowIndex, currentStatus, item) {
  const currentIndex = statusCycle.indexOf(currentStatus);
  const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

  fetch(gasUrl, {
    method: "POST",
    body: JSON.stringify({ row: rowIndex, status: nextStatus }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => {
    // بروزرسانی کلاس‌ها
    iconElement.classList.remove("done", "not-done", "in-progress");
    if (nextStatus === "✅") {
      iconElement.className = `fas fa-check-circle status-icon done`;
      iconElement.setAttribute("title", "انجام‌شده");
    } else if (nextStatus === "🔄") {
      iconElement.className = `fas fa-spinner status-icon in-progress`;
      iconElement.setAttribute("title", "در حال انجام");
    } else {
      iconElement.className = `fas fa-times-circle status-icon not-done`;
      iconElement.setAttribute("title", "در انتظار انجام");
    }

    // بروزرسانی وضعیت لوکال
    item.status = nextStatus;
  });
}


// دریافت اطلاعات و ساخت آکاردئون
fetch(gasUrl)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("accordionContainer");

    data.forEach((item, index) => {
      const accordion = document.createElement("div");
      accordion.className = "accordion";

      const header = document.createElement("div");
      header.className = "accordion-header";

      // شماره پنل از 2 شروع شود
      const panelNumber = index + 2;

      header.innerHTML = `
        <span style="margin-right: 10px; font-weight: bold; color: #333;">${panelNumber}.</span>
        <span style="flex:1;">${item.title}</span>
        <span style="margin: 0 10px; color: #666;">${item.date}</span>
        <span>${getStars(item.priority)}</span>
        <span class="status-container">${getStatusIcon(item.status)}</span>
      `;

      const content = document.createElement("div");
      content.className = "accordion-content";
      content.innerHTML = item.content;

      header.addEventListener("click", () => {
        header.classList.toggle("active");
        content.style.display = content.style.display === "block" ? "none" : "block";
      });

      setTimeout(() => {
        const icon = header.querySelector(".status-icon");
        if (icon) {
          icon.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleStatus(icon, item.rowIndex, item.status, item);
          });
        }
      }, 0);

      accordion.appendChild(header);
      accordion.appendChild(content);
      container.appendChild(accordion);
    });
  })
  .catch(err => {
    document.getElementById("accordionContainer").innerHTML = "<p>خطا در بارگذاری اطلاعات.</p>";
    console.error("Fetch error:", err);
  });


// جلوگیری از کش با reload دستی
function hardReload() {
  const currentUrl = window.location.href.split('?')[0];
  const newUrl = `${currentUrl}?reload=${new Date().getTime()}`;
  window.location.href = newUrl;
}
