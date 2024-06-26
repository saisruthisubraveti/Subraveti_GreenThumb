document.addEventListener('DOMContentLoaded', () => {
    const plants = [
        { id: 1, name: 'Fiddle Leaf plant', price: 10.00, image: 'image/fiddle leaf1.jpeg' },
        { id: 2, name: 'Snake plant', price: 15.00, image: 'image/snake5.png' },
        { id: 3, name: 'Spider plant', price: 10.00, image: 'image/spider3.jpeg' },
        { id: 4, name: 'Lavender plant', price: 10.00, image: 'image/lavender1.jpeg' },
        { id: 5, name: 'Roses plant', price: 10.00, image: 'image/roses2.jpeg' },
        { id: 6, name: 'Tulip plant', price: 20.00, image: 'image/tulip.jpeg' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateAnalytics = () => {
        const cartSummary = document.getElementById('cart-summary');
        const topSelling = document.getElementById('top-selling');

        cartSummary.innerHTML = '';
        let totalQuantity = 0;
        let totalRevenue = 0;

        cart.forEach(item => {
            totalQuantity += item.quantity;
            totalRevenue += item.price * item.quantity;

            const li = document.createElement('li');
            li.textContent = `${item.name} - Quantity: ${item.quantity} - Revenue: $${(item.price * item.quantity).toFixed(2)}`;
            cartSummary.appendChild(li);
        });

        const totalLi = document.createElement('li');
        totalLi.textContent = `Total Quantity: ${totalQuantity} - Total Revenue: $${totalRevenue.toFixed(2)}`;
        cartSummary.appendChild(totalLi);

        topSelling.innerHTML = '';
        const sortedCart = cart.sort((a, b) => b.quantity - a.quantity);

        sortedCart.forEach((item, index) => {
            if (index < 3) {
                const li = document.createElement('li');
                li.textContent = `${item.name} - Quantity: ${item.quantity}`;
                topSelling.appendChild(li);
            }
        });

        renderCharts(cart);
    };

    const renderCharts = (cart) => {
        const ctxQuantity = document.getElementById('quantityChart').getContext('2d');
        const ctxRevenue = document.getElementById('revenueChart').getContext('2d');

        const plantNames = cart.map(item => item.name);
        const plantQuantities = cart.map(item => item.quantity);
        const plantRevenues = cart.map(item => (item.price * item.quantity).toFixed(2));

        new Chart(ctxQuantity, {
            type: 'bar',
            data: {
                labels: plantNames,
                datasets: [{
                    label: 'Quantity Sold',
                    data: plantQuantities,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        new Chart(ctxRevenue, {
            type: 'pie',
            data: {
                labels: plantNames,
                datasets: [{
                    label: 'Revenue',
                    data: plantRevenues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    };

    updateAnalytics();
});
