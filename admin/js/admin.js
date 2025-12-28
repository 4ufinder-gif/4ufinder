// Switch sections
function showSection(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  document.getElementById(section).style.display = 'block';
}

// Fetch products from API
async function fetchProducts() {
  const res = await fetch('/api/getProducts');
  const products = await res.json();
  const container = document.getElementById('productsList');
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${p.name}</strong> | ${p.category} | $${p.price}
      <button onclick="editProduct(${p.id})">Edit</button>
      <button onclick="deleteProduct(${p.id})">Delete</button>
    `;
    container.appendChild(div);
  });
}

// Example: Call fetchProducts on load
document.addEventListener('DOMContentLoaded', fetchProducts);

// Show add product form
function showAddProductForm() {
  const container = document.getElementById('productsList');
  container.innerHTML = `
    <form onsubmit="addProduct(event)">
      <input type="text" name="name" placeholder="Product Name" required>
      <input type="text" name="category" placeholder="Category" required>
      <input type="number" name="price" placeholder="Price" required>
      <input type="text" name="image" placeholder="Image URL" required>
      <textarea name="description" placeholder="Description"></textarea>
      <button type="submit">Add</button>
    </form>
  `;
}

// Add product via API
async function addProduct(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    category: form.category.value,
    price: form.price.value,
    image: form.image.value,
    description: form.description.value
  };
  await fetch('/api/addProduct', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  fetchProducts();
}
