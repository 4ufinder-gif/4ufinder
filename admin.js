document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value
  };

  localStorage.setItem("product", JSON.stringify(product));
  alert("Product saved (demo mode)");
});
