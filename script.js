
const m=document.getElementById("menu"),n=document.getElementById("nav");
m.onclick=()=>n.classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>n.classList.remove("open"));
document.getElementById("year").textContent=new Date().getFullYear();

function updateEmptyState(gallery){
  const grid = gallery.querySelector(".editable-gallery");
  const hasImages = grid.querySelector(".editable-image");
  let empty = grid.querySelector(".empty-gallery");

  if(!hasImages && !empty){
    empty = document.createElement("div");
    empty.className = "empty-gallery";
    empty.textContent = "No images yet. Click “Add Image” to add one.";
    grid.appendChild(empty);
  } else if(hasImages && empty){
    empty.remove();
  }
}

function attachRemoveButton(button){
  button.addEventListener("click", ()=>{
    const gallery = button.closest(".event-gallery");
    button.closest(".editable-image").remove();
    updateEmptyState(gallery);
  });
}

document.querySelectorAll(".remove-image").forEach(attachRemoveButton);

document.querySelectorAll(".event-gallery").forEach(gallery=>{
  const input = gallery.querySelector('input[type="file"]');
  const grid = gallery.querySelector(".editable-gallery");

  input.addEventListener("change", ()=>{
    const files = [...input.files];

    files.forEach(file=>{
      if(!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = e=>{
        const empty = grid.querySelector(".empty-gallery");
        if(empty) empty.remove();

        const item = document.createElement("div");
        item.className = "editable-image";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = file.name;

        const remove = document.createElement("button");
        remove.className = "remove-image";
        remove.type = "button";
        remove.setAttribute("aria-label","Remove image");
        remove.textContent = "×";
        attachRemoveButton(remove);

        item.appendChild(img);
        item.appendChild(remove);
        grid.appendChild(item);
      };
      reader.readAsDataURL(file);
    });

    input.value = "";
  });

  updateEmptyState(gallery);
});
