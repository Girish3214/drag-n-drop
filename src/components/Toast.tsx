const showToast = ({
  message,
  type,
  duration = 3000,
}: {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}) => {
  const toastContainer = document.createElement("div");
  toastContainer.className = `fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white font-medium transition-all duration-300 ease-in-out z-50`;

  // Set background color based on toast type
  switch (type) {
    case "success":
      toastContainer.style.backgroundColor = "#38a169"; // Green
      break;
    case "error":
      toastContainer.style.backgroundColor = "#e53e3e"; // Red
      break;
    case "info":
      toastContainer.style.backgroundColor = "#3182ce"; // Blue
      break;
  }

  // Set message
  toastContainer.innerText = message;

  // Append to body
  document.body.appendChild(toastContainer);

  // Remove toast after the specified duration
  setTimeout(() => {
    toastContainer.classList.add("opacity-0"); // Adding opacity to fade out
    setTimeout(() => {
      toastContainer.remove();
    }, 300); // Wait for fade-out animation to complete
  }, duration);
};

export { showToast };
