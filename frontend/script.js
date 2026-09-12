const API_URL = 'http://localhost:5000';

// DOM Elements
const form = document.getElementById('transactionForm');
const transactionsList = document.getElementById('transactionsList');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const balanceEl = document.getElementById('balance');
const balanceCard = document.getElementById('balanceCard');
const transactionCountEl = document.getElementById('transactionCount');
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const toastEl = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastEl);

let deleteTransactionId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTransactions();
  document.getElementById('date').valueAsDate = new Date();
});

// Form Submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  const formData = {
    type: document.getElementById('type').value,
    amount: parseFloat(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    date: document.getElementById('date').value || new Date().toISOString().split('T')[0],
    description: document.getElementById('description').value
  };

  // Show loading state
  const submitBtn = form.querySelector('.submit-btn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Adding...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(API_URL + '/add-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to add transaction');
    }

    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('date').valueAsDate = new Date();
    
    showToast('Success', 'Transaction added successfully!', 'success');
    await loadTransactions();
  } catch (error) {
    showToast('Error', 'Error adding transaction: ' + error.message, 'error');
  } finally {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
});

// Load Transactions
async function loadTransactions() {
  // Show loading spinner
  transactionsList.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner-border spinner-pastel" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  try {
    const response = await fetch(API_URL + '/transactions');
    
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    
    const transactions = await response.json();
    
    // Sort by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    displayTransactions(transactions);
    updateTotals(transactions);
    transactionCountEl.textContent = transactions.length;
  } catch (error) {
    console.error('Error loading transactions:', error);
    transactionsList.innerHTML = `
      <div class="text-center py-5 empty-state">
        <i class="bi bi-exclamation-circle empty-icon" style="color: #f5c6cb;"></i>
        <p class="empty-text">Server not running? Start backend first!</p>
      </div>
    `;
    transactionCountEl.textContent = '0';
    updateTotals([]);
  }
}

// Display Transactions
function displayTransactions(transactions) {
  if (transactions.length === 0) {
    transactionsList.innerHTML = `
      <div class="text-center py-5 empty-state">
        <i class="bi bi-inbox empty-icon"></i>
        <p class="empty-text">No transactions yet. Add one above!</p>
      </div>
    `;
    return;
  }

  transactionsList.innerHTML = transactions.map((t, index) => `
    <div class="transaction-item ${t.type}" style="animation-delay: ${index * 0.05}s">
      <div class="transaction-info">
        <h5>${escapeHtml(t.category)} ${t.description ? '<small class="text-muted">- ' + escapeHtml(t.description) + '</small>' : ''}</h5>
        <p><i class="bi bi-calendar3"></i> ${new Date(t.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
      </div>
      <div class="transaction-actions">
        <span class="transaction-amount ${t.type}">${t.type === 'income' ? '+' : '-'}Rs${t.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="openDeleteModal('${t._id}')">
          <i class="bi bi-trash3"></i> Delete
        </button>
      </div>
    </div>
  `).join('');
}

// Update Totals with Animation
function updateTotals(transactions) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  animateNumber(totalIncomeEl, totalIncome, 'Rs');
  animateNumber(totalExpenseEl, totalExpense, 'Rs');
  animateNumber(balanceEl, balance, 'Rs');

  // Update balance card styling
  balanceCard.className = 'card summary-card balance-card' + (balance < 0 ? ' balance-negative' : '');
  
  // Update balance icon
  const balanceIcon = balanceCard.querySelector('.card-icon i');
  balanceIcon.className = balance >= 0 ? 'bi bi-wallet' : 'bi bi-wallet2';
}

// Number Animation
function animateNumber(element, target, prefix = '') {
  const duration = 600;
  const start = parseFloat(element.textContent.replace(/[^0-9.-]/g, '')) || 0;
  const range = target - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + range * easeOut;
    
    element.textContent = prefix + current.toFixed(2);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Delete Modal
function openDeleteModal(id) {
  deleteTransactionId = id;
  deleteModal.show();
}

confirmDeleteBtn.addEventListener('click', async () => {
  if (!deleteTransactionId) return;

  try {
    const response = await fetch(API_URL + '/transaction/' + deleteTransactionId, { 
      method: 'DELETE' 
    });

    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }

    deleteModal.hide();
    showToast('Deleted', 'Transaction deleted successfully!', 'success');
    await loadTransactions();
  } catch (error) {
    showToast('Error', 'Error deleting transaction: ' + error.message, 'error');
  } finally {
    deleteTransactionId = null;
  }
});

// Reset delete ID when modal is hidden
document.getElementById('deleteModal').addEventListener('hidden.bs.modal', () => {
  deleteTransactionId = null;
});

// Toast Notification
function showToast(title, message, type = 'info') {
  const toastIcon = document.getElementById('toastIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  const icons = {
    success: 'bi-check-circle-fill text-success',
    error: 'bi-x-circle-fill text-danger',
    info: 'bi-info-circle-fill text-info',
    warning: 'bi-exclamation-triangle-fill text-warning'
  };

  toastIcon.className = 'bi ' + (icons[type] || icons.info) + ' me-2';
  toastTitle.textContent = title;
  toastMessage.textContent = message;

  toast.show();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Expose openDeleteModal to global scope for onclick handlers
window.openDeleteModal = openDeleteModal;
