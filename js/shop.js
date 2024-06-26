document.addEventListener('DOMContentLoaded', () => {
  const plants = [
    { id: 1, name: 'Fiddle Leaf plant', price: 10.00, image: 'image/fiddle leaf1.jpeg' },
    { id: 2, name: 'Snake plant', price: 15.00, image: 'image/snake5.png' },
    { id: 3, name: 'Spider plant', price: 10.00, image: 'image/spider3.jpeg' },
    { id: 4, name: 'Lavender plant', price: 10.00, image: 'image/lavender1.jpeg' },
    { id: 5, name: 'Roses plant', price: 10.00, image: 'image/roses2.jpeg' },
    { id: 6, name: 'Tulip plant', price: 20.00, image: 'image/tulip.jpeg' }
  ];

  let cart = [];

  const addToCart = (PlantId) => {
    const plant = plants.find(p => p.id === PlantId);
    if (!plant) return;

    const cartItem = cart.find(item => item.id === PlantId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...plant, quantity: 1 });
    }

    updateCart();
  };

  const removeFromCart = (PlantId) => {
    const index = cart.findIndex(item => item.id === PlantId);
    if (index !== -1) {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      updateCart();
    }
  };

  const updateCart = () => {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}<br></span>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      `;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    // Dynamically add spacing in the shop section
document.querySelectorAll('.plant img').forEach(img => {
  const br = document.createElement('br');
  img.after(br);
  const plantElement = img.closest('.plant');
  plantElement.style.marginBottom = '20px';
});
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', () => {
        const PlantId = parseInt(button.dataset.id);
        removeFromCart(PlantId);
      });
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const PlantId = parseInt(button.parentElement.dataset.id);
      addToCart(PlantId);
    });
  });


// Call updateCart to initialize the cart and store it in localStorage on page load
updateCart();

  document.getElementById('checkout').addEventListener('click', () => {
    alert('Checkout functionality is not implemented yet.');
  });

  updateCart();
});
