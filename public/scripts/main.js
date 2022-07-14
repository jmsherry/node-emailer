const mailForm = document.forms["mail"];

mailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(mailForm);
  const data = Object.fromEntries(formData);
  console.log(
    "🚀 ~ file: main.js ~ line 6 ~ mailForm.addEventListener ~ data",
    data
  );

  sendData(data);
  mailForm.reset();
});

const sendData = async (data) => {
  try {
    const response = await fetch("/api/v1/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.status === 201) throw response;

    alert("Message sent");
  } catch (err) {
    alert("Error. Check console.");
    console.log(err);
  }
};
