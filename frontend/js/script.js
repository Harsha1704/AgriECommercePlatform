document.addEventListener('DOMContentLoaded', function() {
    
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const showSignup = document.getElementById('show-signup');
    const loginFormElement = document.getElementById('login-form');
    const signupFormElement = document.getElementById('signup-form');

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormElement.style.display = 'none';
        signupFormElement.style.display = 'block';
    });

    
    const showLogin = document.createElement('a');
    showLogin.href = '#';
    showLogin.id = 'show-login';
    showLogin.style = 'color: #4CAF50; text-decoration: none; font-weight: bold;';
    showLogin.textContent = 'Back to Login';
    if (signupFormElement) {
        signupFormElement.insertBefore(showLogin, signupFormElement.firstChild);
    }

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormElement.style.display = 'none';
        loginFormElement.style.display = 'block';
    });

    
    const roleButtons = document.querySelectorAll('.role-btn');
  
    console.log('Initializing role buttons:', roleButtons);
    
    roleButtons.forEach(button => {
        console.log('Adding click handler for:', button.textContent);
        button.addEventListener('click', (e) => {
            console.log('Role selected:', button.dataset.role);
            roleButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            
            localStorage.setItem('selectedRole', button.dataset.role);
         
            const loginForm = document.getElementById('login-form');
            const signupForm = document.getElementById('signup-form');
            if (loginForm && signupForm) {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
                console.log('Showing login form');
            } else {
                console.error('Forms not found!');
            }
        });
    });

    const selectedRole = localStorage.getItem('selectedRole');
    if (selectedRole) {
        const roleButton = document.querySelector(`[data-role="${selectedRole}"]`);
        if (roleButton) {
            console.log('Restoring selected role:', selectedRole);
            roleButton.classList.add('selected');
            const loginForm = document.getElementById('login-form');
            const signupForm = document.getElementById('signup-form');
            if (loginForm && signupForm) {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
                console.log('Showing login form for restored role');
            } else {
                console.error('Forms not found during role restoration!');
            }
        }
    } else {
        console.log('No previously selected role found');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        if (loginForm && signupForm) {
            loginForm.style.display = 'none';
            signupForm.style.display = 'none';
            console.log('Hiding forms initially');
        } else {
            console.error('Forms not found during initial hide!');
        }
    }

    
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const selectedRole = localStorage.getItem('selectedRole');
            let redirectPage = 'dashboard.html';
            
            if (selectedRole === 'staff') {
                redirectPage = 'staff.html';
            } else if (selectedRole === 'buyer') {
                redirectPage = 'buyer.html';
            } else if (selectedRole === 'seller') {
                redirectPage = 'seller.html';
            }
            
            window.location.href = redirectPage;
        });
    }

    if (signupFormElement) {
        signupFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            
            const selectedRole = localStorage.getItem('selectedRole');
            let redirectPage = 'dashboard.html';
            
            if (selectedRole === 'staff') {
                redirectPage = 'staff.html';
            } else if (selectedRole === 'buyer') {
                redirectPage = 'buyer.html';
            } else if (selectedRole === 'seller') {
                redirectPage = 'seller.html';
            }
            
            window.location.href = redirectPage;
        });
    }
});

const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart');
const checkoutButton = document.getElementById('checkout');
const paymentMethodSelect = document.getElementById('payment-method');
const ordersContainer = document.getElementById('orders');
const chatContainer = document.getElementById('chat');
const reviewsContainer = document.getElementById('reviews');
const uploadForm = document.getElementById('upload-form');
const ordersManagementContainer = document.getElementById('orders');
const earningsContainer = document.getElementById('earnings');
const pricingForm = document.getElementById('pricing-form');
const chatBuyersContainer = document.getElementById('chat');
const withdrawalForm = document.getElementById('withdrawal-form');
const deliveryMethodSelect = document.getElementById('delivery-method');
const totalSalesElement = document.getElementById('total-sales');
const totalUsersElement = document.getElementById('total-users');
const performanceElement = document.getElementById('performance');
const usersContainer = document.getElementById('users');
const approveUserButton = document.getElementById('approve-user');
const blockUserButton = document.getElementById('block-user');
const approveProductButton = document.getElementById('approve-product');
const rejectProductButton = document.getElementById('reject-product');
const transactionsContainer = document.getElementById('transactions');
const generateReportButton = document.getElementById('generate-report');
const adminChatContainer = document.getElementById('chat');

document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
});

searchInput.addEventListener('input', handleSearch);
categorySelect.addEventListener('change', handleCategoryChange);
checkoutButton.addEventListener('click', handleCheckout);
paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
uploadForm.addEventListener('submit', handleProductUpload);
pricingForm.addEventListener('submit', handlePriceUpdate);
withdrawalForm.addEventListener('submit', handleWithdrawal);
deliveryMethodSelect.addEventListener('change', handleDeliveryMethodChange);
approveUserButton.addEventListener('click', handleApproveUser);
blockUserButton.addEventListener('click', handleBlockUser);
approveProductButton.addEventListener('click', handleApproveProduct);
rejectProductButton.addEventListener('click', handleRejectProduct);
generateReportButton.addEventListener('click', handleGenerateReport);

function loadInitialData() {
    
    fetchInitialData();
}

function fetchInitialData() {
   
}

function handleSearch(event) {
    const query = event.target.value;
 
}

function handleCategoryChange(event) {
    const category = event.target.value;
   
}

function handleCheckout() {
  
}

function handlePaymentMethodChange(event) {
    const method = event.target.value;
   
}

function handleProductUpload(event) {
    event.preventDefault();
   
}

function handlePriceUpdate(event) {
    event.preventDefault();
  
}

function handleWithdrawal(event) {
    event.preventDefault();
    
}

function handleDeliveryMethodChange(event) {
    const method = event.target.value;
    
}

function handleApproveUser() {
   
}

function handleBlockUser() {
    
}

function handleApproveProduct() {
  
}

function handleRejectProduct() {
    
}

function handleGenerateReport() {
  
}
