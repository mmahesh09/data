// Configure marked
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

const ICONS = { ".xlsx": "📊", ".xls": "📊", ".pdf": "📄", ".md": "📝", ".txt": "📝" };

// ── State ──
let isLoading = false;

// ── Init ──
window.addEventListener("DOMContentLoaded", () => {
  loadFileList();
  document.getElementById("messageInput").focus();
});

// ── File upload ──
async function uploadFile(input) {
  const file = input.files[0];
  if (!file) return;

  const status = document.getElementById("uploadStatus");
  status.textContent = `Uploading ${file.name}...`;
  status.className = "upload-status loading";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) throw new Error(data.detail || "Upload failed");

    status.textContent = `✓ ${data.message}`;
    status.className = "upload-status success";
    loadFileList();
  } catch (err) {
    status.textContent = `✗ ${err.message}`;
    status.className = "upload-status error";
  } finally {
    input.value = "";
    setTimeout(() => { status.textContent = ""; status.className = "upload-status"; }, 4000);
  }
}

async function loadFileList() {
  try {
    const res = await fetch("/files");
    const data = await res.json();
    const list = document.getElementById("fileList");
    list.innerHTML = "";
    data.files.forEach(name => {
      const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
      const icon = ICONS[ext] || "📎";
      const item = document.createElement("div");
      item.className = "file-item";
      item.innerHTML = `<span class="file-item-icon">${icon}</span><span class="file-item-name" title="${name}">${name}</span>`;
      list.appendChild(item);
    });
  } catch (_) {}
}

// ── Chat ──
function newChat() {
  document.getElementById("messages").innerHTML = `
    <div class="welcome-card">
      <div class="welcome-icon">🏦</div>
      <h2>How can I help you today?</h2>
      <p>Upload banking documents (Excel, PDF, Markdown) and ask questions about your data.</p>
      <div class="starter-grid">
        <button class="starter-btn" onclick="sendStarter('What tables are available in the banking schema?')">What tables are in the schema?</button>
        <button class="starter-btn" onclick="sendStarter('What does CIF number mean?')">What does CIF number mean?</button>
        <button class="starter-btn" onclick="sendStarter('Explain the KYC status field and its possible values')">Explain KYC status field</button>
        <button class="starter-btn" onclick="sendStarter('What are the regulatory reporting fields?')">Regulatory reporting fields</button>
      </div>
    </div>`;
}

function sendStarter(text) {
  document.getElementById("messageInput").value = text;
  sendMessage();
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 160) + "px";
}

async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text || isLoading) return;

  isLoading = true;
  input.value = "";
  input.style.height = "auto";
  document.getElementById("sendBtn").disabled = true;

  // Remove welcome card if present
  const welcome = document.querySelector(".welcome-card");
  if (welcome) welcome.remove();

  appendMessage("user", text);
  const typingId = showTyping();

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    removeTyping(typingId);

    if (!res.ok) throw new Error(data.detail || "Request failed");

    appendMessage("ai", data.response);
  } catch (err) {
    removeTyping(typingId);
    appendMessage("ai", `**Error:** ${err.message}`);
  } finally {
    isLoading = false;
    document.getElementById("sendBtn").disabled = false;
    input.focus();
  }
}

function appendMessage(role, text) {
  const messages = document.getElementById("messages");
  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${role === "user" ? "user-av" : "ai-av"}`;
  avatar.textContent = role === "user" ? "U" : "🏦";

  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;

  if (role === "ai") {
    bubble.innerHTML = marked.parse(text);
    bubble.querySelectorAll("pre code").forEach(el => hljs.highlightElement(el));
  } else {
    bubble.textContent = text;
  }

  row.appendChild(avatar);
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById("messages");
  const id = "typing-" + Date.now();
  const wrap = document.createElement("div");
  wrap.className = "message-row typing-row";
  wrap.id = id;
  wrap.innerHTML = `
    <div class="avatar ai-av">🏦</div>
    <div class="typing-bubble">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
    </div>`;
  messages.appendChild(wrap);
  messages.scrollTop = messages.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
