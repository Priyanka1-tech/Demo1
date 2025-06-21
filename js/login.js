// Hospital Portal - Login Functionality

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-box form');
    const userInput = document.getElementById('userid');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('button[type="submit"]');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous error messages
        clearErrors();
        
        // Validate User ID
        if (!userInput.value.trim()) {
            showError(userInput, 'User ID is required');
            isValid = false;
        } else if (userInput.value.trim().length < 3) {
            showError(userInput, 'User ID must be at least 3 characters');
            isValid = false;
        }
        
        // Validate Password
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.style.textAlign = 'left';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
        input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    }
    
    // Clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Reset input styles
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '#b2bec3';
            input.style.boxShadow = 'none';
        });
    }
    
    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.textContent = message;
        successDiv.style.color = '#27ae60';
        successDiv.style.fontSize = '0.85rem';
        successDiv.style.marginTop = '0.5rem';
        successDiv.style.textAlign = 'center';
        
        loginForm.appendChild(successDiv);
    }
    
    // Simulate login process
    function simulateLogin() {
        loginButton.disabled = true;
        loginButton.textContent = 'Logging in...';
        loginButton.classList.add('loading');
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, accept any valid credentials
            if (userInput.value.trim() && passwordInput.value.trim()) {
                showSuccess('Login successful! Redirecting...');
                
                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'pages/dashboard.html';
                }, 2000);
            } else {
                showError(passwordInput, 'Invalid credentials. Please try again.');
                loginButton.disabled = false;
                loginButton.textContent = 'Login';
                loginButton.classList.remove('loading');
            }
        }, 1500);
    }
    
    // Form submission handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                simulateLogin();
            }
        });
    }
    
    // Real-time validation
    userInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 3) {
            showError(this, 'User ID must be at least 3 characters');
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (this.value && this.value.length < 6) {
            showError(this, 'Password must be at least 6 characters');
        }
    });
    
    // Clear errors on input focus
    userInput.addEventListener('focus', function() {
        clearErrors();
    });
    
    passwordInput.addEventListener('focus', function() {
        clearErrors();
    });
    
    // Enter key navigation
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // Add loading animation to logo
    const logo = document.querySelector('.hospital-logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }
    
    // Auto-focus on user input when page loads
    userInput.focus();
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 