const scriptURL = "https://script.google.com/macros/s/AKfycbw5U0J_QKcT5mr5HpQiMqiWrL13aGv5z4XDbsgMLmU14sTG9Yda6UZmVuK9LkdcQ1CqnA/exec";

document.getElementById("loadBtn").addEventListener("click", () => {
  const rowId = document.getElementById("rowId").value;
  const colId = document.getElementById("colId").value;

  fetch(`${scriptURL}?action=read&rowId=${rowId}&colId=${colId}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("cellContent").value = data;
    })
    .catch(err => {
      alert("خطا در خواندن سلول");
      console.error(err);
    });
});

document.getElementById("editCellForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const rowId = document.getElementById("rowId").value;
  const colId = document.getElementById("colId").value;
  const content = document.getElementById("cellContent").value;

  const formData = new FormData();
  formData.append("action", "write");
  formData.append("rowId", rowId);
  formData.append("colId", colId);
  formData.append("content", content);

  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(response => {
      alert("تغییرات ذخیره شد.");
    })
    .catch(error => {
      alert("خطا در ذخیره‌سازی.");
      console.error(error);
    });
});
document.getElementById("deleteBtn").addEventListener("click", () => {
  const rowId = document.getElementById("deleteRowId").value;
  if (!rowId || isNaN(rowId)) {
    alert("لطفاً شماره ردیف معتبر وارد کنید.");
    return;
  }

  if (!confirm("آیا مطمئن هستید که می‌خواهید این ردیف را حذف کنید؟ این عملیات قابل بازگشت نیست.")) {
    return;
  }

  fetch(`${scriptURL}?action=deleteRow&rowId=${rowId}`, {
    method: "GET"
  })
    .then(res => res.text())
    .then(data => {
      if (data === "OK") {
        alert("ردیف با موفقیت حذف شد.");
      } else {
        alert("خطا در حذف ردیف: " + data);
      }
    })
    .catch(err => {
      alert("خطا در ارتباط با سرور.");
      console.error(err);
    });
});

const statusSelector = document.getElementById("statusSelector");
  const statusPreview = document.getElementById("statusPreview");
  const cellContent = document.getElementById("cellContent");

  // نمایش وضعیت انتخاب‌شده
  statusSelector.addEventListener("change", function () {
    statusPreview.textContent = this.value;
  });

  // چسباندن وضعیت به cellContent
  function pasteStatus() {
    if (statusSelector.value) {
      cellContent.value = statusSelector.value;
    }
  }