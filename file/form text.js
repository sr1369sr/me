  const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const icon = sidebarToggle.querySelector('i'); // گرفتن آیکون داخل دکمه

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarToggle.classList.toggle('open'); // برای تغییر رنگ دکمه

  if (sidebar.classList.contains('open')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times'); // تغییر آیکون به ضربدر
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars'); // برگشت آیکون به همبرگر
  }
});


    const accordionButtons = document.querySelectorAll(".accordion button");
    accordionButtons.forEach(button => {
      button.addEventListener("click", function () {
        const panel = this.nextElementSibling;
        
        if (panel.classList.contains("open")) {
          panel.classList.remove("open");
        } else {
          document.querySelectorAll(".panel").forEach(p => p.classList.remove("open"));
          panel.classList.add("open");
        }
      });
    });


// تابع برای باز و بسته کردن پنل‌های آکاردئونی
function toggleAccordion(event) {
    const content = event.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

const scriptURL = "https://script.google.com/macros/s/AKfycbwrFdAAHbauet7wBtW-lb92wED3BCJwbHYRJ6AvaaMoIR_JyC8cNcIoBLIZs-qeZ0DJ/exec";

function collectCheckboxValues() {
    // دریافت مستقیم لینک وارد شده توسط کاربر برای پروژه
    var finalText = document.getElementById("variableInput2").value;

    // دریافت مستقیم لینک وارد شده توسط کاربر برای آلبوم
    var finalAlbumText = document.getElementById("variableInput3").value;

    // جمع‌آوری مقادیر چک‌باکس‌ها
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedOptions = Array.from(checkboxes).map(cb => cb.value).join(", ");

    // دریافت اطلاعات پروژه
    var projectTitle = document.getElementById("projectTitle").value;
    var projectTitle_a = document.getElementById("projectTitle_a").value;
    var projectTitle_b = document.getElementById("projectTitle_b").value;
    var projectTitle_c = document.getElementById("projectTitle_c").value;
    var projectTitle_d = document.getElementById("projectTitle_d").value;
    var projectCoordinates = document.getElementById("projectCoordinates").value;

    // قرار دادن مقادیر در فیلدهای مخفی برای استفاده در فرم
    document.getElementById("combinedText2").value = finalText;
    document.getElementById("categories").value = selectedOptions;

    // ساخت FormData برای ارسال به GAS
    var formData = new FormData(document.getElementById("myForm"));
    formData.set('projectTitle', projectTitle);
    formData.set('projectTitle_a', projectTitle_a);
    formData.set('projectTitle_b', projectTitle_b);
    formData.set('projectTitle_c', projectTitle_c);
    formData.set('projectTitle_d', projectTitle_d);
    formData.set('projectCoordinates', projectCoordinates);
    formData.set('albumName', finalAlbumText); // حالا آلبوم لینک کامل داره
    formData.set('finalAlbumText', finalAlbumText); // لینک کامل آلبوم

    // ارسال به Google Apps Script
    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => alert('فرم با موفقیت ارسال شد!'))
    .catch(error => console.error('Error:', error));
}

// اتصال رفتار فرم
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").onsubmit = function(event) {
        event.preventDefault();
        collectCheckboxValues();
    };
});


document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;

        // Toggle the "show" class to trigger the animation
        content.classList.toggle('show');

        // Adjust the max-height dynamically based on content height
        if (content.classList.contains('show')) {
            content.style.maxHeight = content.scrollHeight + "px"; // تنظیم حداکثر ارتفاع به ارتفاع واقعی محتوا
        } else {
            content.style.maxHeight = null; // بازنشانی حداکثر ارتفاع
        }
    });
});






		
		
		
		// تاریخ روز ماه ساعت
		
		// پر کردن سال‌ها
    const yearSelect = document.getElementById("year");
    for (let y = 1403; y <= 1410; y++) {
      const option = document.createElement("option");
      option.value = y;
      option.text = y;
      yearSelect.appendChild(option);
    }

    // ساعت
    const hourSelect = document.getElementById("hour");
    for (let h = 0; h <= 23; h++) {
      const option = document.createElement("option");
      option.value = h;
      option.text = String(h).padStart(2, '0');
      hourSelect.appendChild(option);
    }

    // دقیقه
    const minuteSelect = document.getElementById("minute");
    for (let m = 0; m <= 55; m += 5) {
      const option = document.createElement("option");
      option.value = m;
      option.text = String(m).padStart(2, '0');
      minuteSelect.appendChild(option);
    }

    // روزها بر اساس ماه و سال
    const monthSelect = document.getElementById("month");
    const daySelect = document.getElementById("day");

    function updateDays() {
      const month = parseInt(monthSelect.value);
      const year = parseInt(yearSelect.value);
      let daysInMonth;

      if (month <= 6) daysInMonth = 31;
      else if (month <= 11) daysInMonth = 30;
      else {
        // اسفند
        daysInMonth = (((year + 38) * 682) % 2816) < 682 ? 30 : 29;
      }

      daySelect.innerHTML = "";
      for (let d = 1; d <= daysInMonth; d++) {
        const option = document.createElement("option");
        option.value = d;
        option.text = d;
        daySelect.appendChild(option);
      }
    }

    yearSelect.addEventListener("change", updateDays);
    monthSelect.addEventListener("change", updateDays);

    // درج در input
    function updateResult() {
      const y = yearSelect.value;
      const m = String(monthSelect.value).padStart(2, '0');
      const d = String(daySelect.value).padStart(2, '0');
      const h = String(hourSelect.value).padStart(2, '0');
      const min = String(minuteSelect.value).padStart(2, '0');

      document.getElementById("projectAreaInput").value = `${y}/${m}/${d} - ${h}:${min}`;
    }
	    [yearSelect, monthSelect, daySelect, hourSelect, minuteSelect].forEach(select =>
      select.addEventListener("change", updateResult)
    );

    // مقدار اولیه
    updateDays();
    updateResult();
	
	
	 // انتخاب گزینه ها
	function updateField(selectElement, targetInputId) {
    document.getElementById(targetInputId).value = selectElement.value;
  }

  function toggleAccordion() {
    const panel = document.getElementById("accordionPanel");
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
  }
  
  
  
  
  function loadSite() {
    var fixedText1 = "https://srswebsite.github.io/learning/"; // متن ثابت اول
    var fixedText2 = "/index.html"; // متن ثابت دوم
    var variableText = document.getElementById("variableInput").value; // متن متغیر

    // ترکیب متن ثابت اول، متن متغیر و متن ثابت دوم
    var finalText = fixedText1 + variableText + fixedText2;

    // قرار دادن لینک کامل در فیلد مخفی
    document.getElementById("combinedText").value = finalText;

    // نمایش لینک کامل در آیفریم
    var siteFrame = document.getElementById("unique-siteFrame");
    siteFrame.src = finalText;
}
function loadFixedLink() {
    var fixedLink = "map.html";
    document.getElementById("unique-siteFrame").src = fixedLink;
}

function loadEditLink() {
    var editLink = "edit.html";
    document.getElementById("unique-siteFrame").src = editLink;
}

function loadTableLink() {
    var tableLink = "https://docs.google.com/spreadsheets/d/1UtSwDCfZjN-qsFPbsL6HGuQODdxM8LzLzm8VkMvzpGI/edit?usp=drive_link";
    document.getElementById("unique-siteFrame").src = tableLink;
}

function loadEventsLink() {
    var eventsLink = "gallery text.html";
    document.getElementById("unique-siteFrame").src = eventsLink;
}