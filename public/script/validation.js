function validation() {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        else{
          event.submitter.disabled = true;
          document.querySelector(".loader-wrapper").style.display = "block";
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

validation();
