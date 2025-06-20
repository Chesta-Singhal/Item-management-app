// Save Item to Local Storage
document.getElementById("itemForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const item = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    description: document.getElementById("description").value,
    cover: document.getElementById("cover").value,
    images: document.getElementById("images").value.split(",").map(i => i.trim())
  };
  let items = JSON.parse(localStorage.getItem("items") || "[]");
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  document.getElementById("message").innerText = "Item successfully added!";
  this.reset();
});

// Load Items
if (document.getElementById("itemsContainer")) {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  const container = document.getElementById("itemsContainer");

  items.forEach((item, index) => {
    const img = document.createElement("img");
    img.src = item.cover;
    img.alt = item.name;
    img.onclick = () => showModal(index);
    container.appendChild(img);
  });
}

// Modal Functions
function showModal(index) {
  const items = JSON.parse(localStorage.getItem("items"));
  const item = items[index];

  document.getElementById("modalTitle").innerText = item.name;
  document.getElementById("modalType").innerText = item.type;
  document.getElementById("modalDesc").innerText = item.description;

  const carousel = document.getElementById("carousel");
  carousel.innerHTML = "";
  item.images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    carousel.appendChild(image);
  });

  document.getElementById("modal").style.display = "flex";
  document.getElementById("enquireBtn").onclick = () => {
    alert("Email sent to support@example.com");
  };
}

document.getElementById("closeBtn")?.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});