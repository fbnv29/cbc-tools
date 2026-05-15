const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const questionInput = document.getElementById("question");
const sendButton = form.querySelector(".btn-send");
const emptyState = document.getElementById("empty-state");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;

  appendMessage("user", question);
  questionInput.value = "";
  resizeInput();
  setLoading(true);
  const placeholder = appendMessage("system", "Buscando respuesta...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const result = await response.json();
    placeholder.remove();

    if (!response.ok) {
      appendMessage("bot error", `Error: ${result.error || response.statusText}`);
      return;
    }

    appendMessage("bot", result.answer || "No encontré una respuesta.");
  } catch (error) {
    placeholder.remove();
    appendMessage("bot error", "Ocurrió un error al conectar con el servidor.");
    console.error(error);
  } finally {
    setLoading(false);
    questionInput.focus();
  }
});

questionInput.addEventListener("input", resizeInput);

questionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

function appendMessage(role, text) {
  emptyState?.remove();

  const message = document.createElement("div");
  message.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  message.appendChild(bubble);
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;

  return message;
}

function setLoading(isLoading) {
  questionInput.disabled = isLoading;
  sendButton.disabled = isLoading;
  sendButton.querySelector("span").textContent = isLoading ? "Enviando" : "Enviar";
}

function resizeInput() {
  questionInput.style.height = "auto";
  questionInput.style.height = `${Math.min(questionInput.scrollHeight, 150)}px`;
}

resizeInput();
