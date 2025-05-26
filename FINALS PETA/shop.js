// Cart functionality
        let cart = [];
        
        // DOM elements
        const cartBtn = document.getElementById('cart-btn');
        const closeCartBtn = document.getElementById('close-cart');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        const cartNotification = document.getElementById('cart-notification');
        
        // Toggle cart sidebar
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
            updateCartDisplay();
        });
        
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
        });
        
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
        });
        
        // Add to cart function
        function addToCart(name, price) {
            // Show notification
            cartNotification.classList.remove('hidden');
            setTimeout(() => {
                cartNotification.classList.add('hidden');
            }, 3000);
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            // Update cart count
            updateCartCount();
            
            // Update cart display if sidebar is open
            if (!cartSidebar.classList.contains('translate-x-full')) {
                updateCartDisplay();
            }
        }
        
        // Update cart count in navbar
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Update cart display in sidebar
        function updateCartDisplay() {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
                cartSubtotal.textContent = '$0.00';
                cartTotal.textContent = '$0.00';
                return;
            }
            
            let itemsHTML = '';
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                itemsHTML += `
                    <div class="flex justify-between items-center py-4 border-b border-gray-200">
                        <div>
                            <h4 class="font-medium">${item.name}</h4>
                            <p class="text-sm text-gray-500">$${item.price.toFixed(2)} × ${item.quantity}</p>
                        </div>
                        <div class="flex items-center">
                            <span class="font-medium mr-4">$${itemTotal.toFixed(2)}</span>
                            <button onclick="removeFromCart('${item.name}')" class="text-red-500 hover:text-red-700">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
            
            cartItems.innerHTML = itemsHTML;
            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            cartTotal.textContent = `$${subtotal.toFixed(2)}`;
        }
        
        // Remove item from cart
        function removeFromCart(name) {
            cart = cart.filter(item => item.name !== name);
            updateCartCount();
            updateCartDisplay();
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });