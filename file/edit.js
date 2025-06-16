const scriptURL = "https://script.google.com/macros/s/AKfycbzLIsE5GE4GhBKc1YIsxZ0_ALw6iywCIq0-tfBFDYFczkZ6HjPCJS501QfmLnh1cwoGsA/exec";

    document.getElementById("statusForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);

      fetch(scriptURL, {
        method: "POST",
        body: formData
      })
      .then(response => {
        alert("وضعیت با موفقیت ثبت شد.");
        form.reset();
      })
      .catch(error => {
        console.error("Error!", error.message);
        alert("خطا در ارسال فرم.");
      });
    });