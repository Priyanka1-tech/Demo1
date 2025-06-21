// Hospital Portal - Form Validation Utilities

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.errors = [];
        this.init();
    }
    
    init() {
        if (this.form) {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        const inputs = this.form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, `${this.getFieldLabel(field)} is required`);
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            if (!this.isValidEmail(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Password validation
        if (field.type === 'password' && value) {
            if (value.length < 6) {
                this.showFieldError(field, 'Password must be at least 6 characters long');
                return false;
            }
            if (!this.isStrongPassword(value)) {
                this.showFieldError(field, 'Password must contain at least one letter and one number');
                return false;
            }
        }
        
        // Username validation
        if (field.id === 'userid' && value) {
            if (value.length < 3) {
                this.showFieldError(field, 'User ID must be at least 3 characters long');
                return false;
            }
            if (!this.isValidUsername(value)) {
                this.showFieldError(field, 'User ID can only contain letters, numbers, and underscores');
                return false;
            }
        }
        
        return true;
    }
    
    showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.3rem;
            text-align: left;
            animation: fadeIn 0.3s ease-out;
        `;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
        
        this.errors.push({ field, message });
    }
    
    clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        
        field.style.borderColor = '#b2bec3';
        field.style.boxShadow = 'none';
        
        // Remove from errors array
        this.errors = this.errors.filter(error => error.field !== field);
    }
    
    getFieldLabel(field) {
        const label = field.parentNode.querySelector('label[for="' + field.id + '"]');
        return label ? label.textContent : field.name || field.id;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        return usernameRegex.test(username);
    }
    
    isStrongPassword(password) {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasLetter && hasNumber;
    }
    
    validateForm() {
        this.errors = [];
        const inputs = this.form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    getErrors() {
        return this.errors;
    }
    
    clearAllErrors() {
        this.errors = [];
        const errorDivs = this.form.querySelectorAll('.field-error');
        errorDivs.forEach(div => div.remove());
        
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '#b2bec3';
            input.style.boxShadow = 'none';
        });
    }
}

// Password strength indicator
class PasswordStrengthIndicator {
    constructor(passwordField, strengthIndicator) {
        this.passwordField = passwordField;
        this.strengthIndicator = strengthIndicator;
        this.init();
    }
    
    init() {
        if (this.passwordField && this.strengthIndicator) {
            this.passwordField.addEventListener('input', () => this.updateStrength());
        }
    }
    
    updateStrength() {
        const password = this.passwordField.value;
        const strength = this.calculateStrength(password);
        this.displayStrength(strength);
    }
    
    calculateStrength(password) {
        let score = 0;
        
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        
        if (score <= 2) return 'weak';
        if (score <= 4) return 'medium';
        return 'strong';
    }
    
    displayStrength(strength) {
        const colors = {
            weak: '#e74c3c',
            medium: '#f39c12',
            strong: '#27ae60'
        };
        
        const messages = {
            weak: 'Weak password',
            medium: 'Medium strength password',
            strong: 'Strong password'
        };
        
        this.strengthIndicator.textContent = messages[strength];
        this.strengthIndicator.style.color = colors[strength];
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormValidator, PasswordStrengthIndicator };
} 