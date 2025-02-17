const priceCtx = document.getElementById('priceChart').getContext('2d');
const overviewCtx = document.getElementById('overviewChart').getContext('2d');


const overviewChart = new Chart(overviewCtx, {
    type: 'bar',
    data: {
        labels: ['Buyers', 'Sellers', 'Orders', 'Earnings', 'Approvals'],
        datasets: [{
            label: 'Overview',
            data: [1234, 567, 89, 123456, 89],
            backgroundColor: [
                'rgba(76, 175, 80, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
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


const priceChart = new Chart(priceCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Price',
            data: [],
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: '#4CAF50',
            borderWidth: 2
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


const chartControls = document.createElement('div');
chartControls.className = 'chart-controls';
chartControls.innerHTML = `
    <div class="control-group">
        <label for="chartLabel">Label:</label>
        <input type="text" id="chartLabel" placeholder="Enter label">
    </div>
    <div class="control-group">
        <label for="chartValue">Value:</label>
        <input type="number" id="chartValue" placeholder="Enter value">
    </div>
    <button id="addDataPoint">Add Data Point</button>
    <button id="resetChart">Reset Chart</button>
`;
document.querySelector('.analysis-content').prepend(chartControls);


document.getElementById('addDataPoint').addEventListener('click', () => {
    const label = document.getElementById('chartLabel').value;
    const value = parseFloat(document.getElementById('chartValue').value);
    
    if (label && !isNaN(value)) {
        priceChart.data.labels.push(label);
        priceChart.data.datasets[0].data.push(value);
        priceChart.update();
        document.getElementById('chartLabel').value = '';
        document.getElementById('chartValue').value = '';
    } else {
        alert('Please enter valid label and value');
    }
});


document.getElementById('resetChart').addEventListener('click', () => {
    priceChart.data.labels = [];
    priceChart.data.datasets[0].data = [];
    priceChart.update();
});



const analysisTabs = document.querySelectorAll('.analysis-tab');
const priceChartContainer = document.getElementById('priceChart');
const priceTableContainer = document.getElementById('priceTable');

analysisTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        analysisTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tab.dataset.type === 'graph') {
            priceChartContainer.classList.remove('hidden');
            priceTableContainer.classList.add('hidden');
        } else {
            priceChartContainer.classList.add('hidden');
            priceTableContainer.classList.remove('hidden');
        }
    });
});

const transactionSearch = document.getElementById('transactionSearch');
const transactionFilter = document.getElementById('transactionFilter');
const transactionTable = document.getElementById('transactionTable');

const transactions = [
    {
        date: '2025-02-15',
        buyer: 'Ramam',
        seller: 'Farm Fresh',
        amount: '₹1500',
        status: 'completed'
    },
    {
        date: '2025-02-15', 
        buyer: 'Farmer',
        seller: 'Organic Valley',
        amount: '₹2500',
        status: 'pending'
    }
];

function renderTransactions(filteredTransactions) {
    transactionTable.innerHTML = filteredTransactions.map(transaction => `
        <tr>
            <td>${transaction.date}</td>
            <td>${transaction.buyer}</td>
            <td>${transaction.seller}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.status}</td>
        </tr>
    `).join('');
}

transactionSearch.addEventListener('input', () => {
    const searchTerm = transactionSearch.value.toLowerCase();
    const filtered = transactions.filter(t => 
        t.buyer.toLowerCase().includes(searchTerm) || 
        t.seller.toLowerCase().includes(searchTerm)
    );
    renderTransactions(filtered);
});

transactionFilter.addEventListener('change', () => {
    const filterValue = transactionFilter.value;
    let filtered = transactions;
    
    if (filterValue === 'today') {
        filtered = transactions.filter(t => isToday(new Date(t.date)));
    } else if (filterValue === 'week') {
        filtered = transactions.filter(t => isThisWeek(new Date(t.date)));
    }
    
    renderTransactions(filtered);
});


const feedbackFilter = document.getElementById('feedbackFilter');
const feedbackList = document.querySelector('.feedback-list');

const feedbacks = [
    {
        user: 'Ramam',
        rating: 4,
        date: '2025-02-15',
        text: 'Great quality products!',
        type: 'buyer'
    },
    {
        user: 'Farmer',
        rating: 5,
        date: '2025-02-15',
        text: 'Excellent service',
        type: 'seller'
    }
];

function renderFeedbacks(filteredFeedbacks) {
    feedbackList.innerHTML = filteredFeedbacks.map(feedback => `
        <div class="feedback-item">
            <div class="feedback-header">
                <span class="user">${feedback.user}</span>
                <span class="rating">${'★'.repeat(feedback.rating)}${'☆'.repeat(5 - feedback.rating)}</span>
                <span class="date">${feedback.date}</span>
            </div>
            <p class="feedback-text">${feedback.text}</p>
            <div class="feedback-actions">
                <button class="action-btn resolve">Mark Resolved</button>
                <button class="action-btn reply" onclick="replyToFeedback('${feedback.user}')">Reply</button>
            </div>
        </div>
    `).join('');
}

feedbackFilter.addEventListener('change', () => {
    const filterValue = feedbackFilter.value;
    let filtered = feedbacks;
    
    if (filterValue === 'buyers') {
        filtered = feedbacks.filter(f => f.type === 'buyer');
    } else if (filterValue === 'sellers') {
        filtered = feedbacks.filter(f => f.type === 'seller');
    }
    
    renderFeedbacks(filtered);
});


const addProductBtn = document.getElementById('addProductBtn');
const productSearch = document.getElementById('productSearch');
const productList = document.querySelector('.product-list');
const productTable = document.querySelector('.product-list table');
productTable.style.width = '100%';
productTable.style.tableLayout = 'fixed';

const products = [
    {
        name: 'Organic Apples',
        stock: 100,
        price: 150,
        rating: 4
    },
    {
        name: 'Fresh Tomatoes',
        stock: 50,
        price: 80,
        rating: 5
    }
];

function renderProducts(filteredProducts) {
    productList.innerHTML = filteredProducts.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.stock}</td>
            <td>₹${product.price}</td>
            <td>${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</td>
            <td>
                <button class="action-btn edit">Edit</button>
                <button class="action-btn delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

addProductBtn.addEventListener('click', () => {
    
});

productSearch.addEventListener('input', () => {
    const searchTerm = productSearch.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
});


function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function isThisWeek(date) {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));
    return date >= startOfWeek && date <= endOfWeek;
}


const userSearch = document.getElementById('userSearch');
const userFilter = document.getElementById('userFilter');
const userTable = document.querySelector('.user-list tbody');

const users = [
    {
        name: 'Raman',
        type: 'buyer',
        status: 'active'
    },
    {
        name: 'farmer',
        type: 'seller',
        status: 'pending'
    }
];

function renderUsers(filteredUsers) {
    userTable.innerHTML = filteredUsers.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.type}</td>
            <td>${user.status}</td>
            <td>
                <button class="action-btn ${user.status === 'pending' ? 'approve' : 'block'}">
                    ${user.status === 'pending' ? 'Approve' : user.status === 'active' ? 'Block' : 'Unblock'}
                </button>
                <button class="action-btn delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

userSearch.addEventListener('input', () => {
    const searchTerm = userSearch.value.toLowerCase();
    const filtered = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm)
    );
    renderUsers(filtered);
});

userFilter.addEventListener('change', () => {
    const filterValue = userFilter.value;
    let filtered = users;
    
    if (filterValue !== 'all') {
        filtered = users.filter(u => u.type === filterValue || u.status === filterValue);
    }
    renderUsers(filtered);
});


const verificationSearch = document.getElementById('productSearch');
const verificationTable = document.querySelector('.verification-list tbody');

const pendingProducts = [
    {
        name: 'Organic Wheat',
        seller: 'Farm Fresh',
        date: '2025-02-15'
    },
    {
        name: 'Fresh Milk',
        seller: 'Dairy Delight',
        date: '2025-02-15'
    }
];

function renderPendingProducts(filteredProducts) {
    verificationTable.innerHTML = filteredProducts.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.seller}</td>
            <td>${product.date}</td>
            <td>
                <button class="action-btn approve">Approve</button>
                <button class="action-btn reject">Reject</button>
            </td>
        </tr>
    `).join('');
}

verificationSearch.addEventListener('input', () => {
    const searchTerm = verificationSearch.value.toLowerCase();
    const filtered = pendingProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.seller.toLowerCase().includes(searchTerm)
    );
    renderPendingProducts(filtered);
});


const paymentFilter = document.getElementById('paymentFilter');
const paymentTable = document.querySelector('.payment-list tbody');

const payments = [
    {
        id: 'TX1001',
        amount: 1500,
        status: 'completed'
    },
    {
        id: 'TX1002',
        amount: 2500,
        status: 'pending'
    }
];

function renderPayments(filteredPayments) {
    paymentTable.innerHTML = filteredPayments.map(payment => `
        <tr>
            <td>${payment.id}</td>
            <td>₹${payment.amount}</td>
            <td>${payment.status}</td>
            <td>
                ${payment.status === 'pending' ? '<button class="action-btn process">Process</button>' : ''}
                ${payment.status === 'completed' ? '<button class="action-btn refund">Refund</button>' : ''}
            </td>
        </tr>
    `).join('');
}

paymentFilter.addEventListener('change', () => {
    const filterValue = paymentFilter.value;
    let filtered = payments;
    
    if (filterValue !== 'all') {
        filtered = payments.filter(p => p.status === filterValue);
    }
    renderPayments(filtered);
});


const sendNotificationBtn = document.getElementById('sendNotificationBtn');
const createCampaignBtn = document.getElementById('createCampaignBtn');
const campaignTable = document.querySelector('.campaign-list tbody');

const campaigns = [
    {
        name: 'Holi Sale',
        date: '2025-02-15',
        recipients: 'All Users',
        status: 'Scheduled'
    },
    {
        name: 'Harvest Festival',
        date: '2025-02-15',
        recipients: 'Sellers',
        status: 'Completed'
    }
];

function renderCampaigns() {
    campaignTable.innerHTML = campaigns.map(campaign => `
        <tr>
            <td>${campaign.name}</td>
            <td>${campaign.date}</td>
            <td>${campaign.recipients}</td>
            <td>${campaign.status}</td>
        </tr>
    `).join('');
}

sendNotificationBtn.addEventListener('click', () => {
    const message = prompt('Enter notification message:');
    if (message) {
        fetch('/api/send-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Notification sent successfully!');
            } else {
                alert('Failed to send notification');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending notification');
        });
    }
});

createCampaignBtn.addEventListener('click', () => {
    
});


function replyToFeedback(user) {
    const reply = prompt(`Enter your reply to ${user}:`);
    if (reply) {
        fetch('/api/send-reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, reply })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Reply sent successfully!');
            } else {
                alert('Failed to send reply');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending reply');
        });
    }
}


renderTransactions(transactions);
renderFeedbacks(feedbacks);
renderProducts(products);
renderUsers(users);
renderPendingProducts(pendingProducts);
renderPayments(payments);
renderCampaigns();
