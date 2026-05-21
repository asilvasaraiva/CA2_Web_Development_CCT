// ---- Contact Form Validation elements ----
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactPhone = document.getElementById('contactPhone');
const contactEmail = document.getElementById('contactEmail');
const contactQuery = document.getElementById('contactQuery');


// Error message elements
const nameError = document.getElementById('contactNameError');
const phoneError = document.getElementById('contactPhoneError');
const emailError = document.getElementById('contactEmailError');
const queryError = document.getElementById('contactQueryError');
const errorColor = '#dc3545' //const error color for highlighting invalid fields

// ---- Validation Functions ----

// Validate name: alphabetic characters only and spaces allowed
function validateName() {
  const nameValue = contactName.value.trim();
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(nameValue)) {
    alert('Full name must contain only alphabetic characters and spaces');// Display alert message to user
    contactName.style.borderColor = errorColor; // Highlight field in red if invalid
    return false; // Return false to indicate validation failed
  }
  nameError.textContent = '';// Clear error message if valid
  contactEmail.style.borderColor = ''; // Remove red border highlighting
return true; // Return true to indicate validation passed
}

// Validation Email after
function validateEmail() {
  if (!contactEmail.value.trim()) {
    alert('Email is required');// Display alert message to user
    contactEmail.style.borderColor = errorColor; // Highlight field in red if invalid
    isValid = false; // Return false to indicate validation failed
  } else {
    emailError.textContent = '';// Clear error message if valid
    contactEmail.style.borderColor = ''; // Remove red border highlighting
  }
  return true; // Return true to indicate validation passed
}

// Validate phone number: numeric format and 9 or 10 digits long
function validatePhoneNumber() {
  const phoneValue = contactPhone.value.trim();
  const phoneRegex = /^\d{9,10}$/; 
  if (!phoneRegex.test(phoneValue)) { // Validates that phone number is numeric and 9 or 10 digits long
    alert('Phone number must be numeric and 9 or 10 digits long');// Display alert message to user
contactPhone.style.borderColor = errorColor; // Highlight field in red if invalid
    return false; // Return false to indicate validation failed
  }
  phoneError.textContent = ''; // Clear error message if valid
  contactPhone.style.borderColor = ''; // Remove red border highlighting
  return true; // Return true to indicate validation passed
}

// ---- Query Validation ----
// Validates that the user has entered a query/message
function validateQuery() {
  if (!contactQuery.value.trim()) { // Check if query field is empty
    alert('Query is required'); // Display alert message to user
    contactQuery.style.borderColor = errorColor; // Highlight field in red
    return false; // Return false to indicate validation failed
  } else {
    queryError.textContent = ''; // Clear error message if valid
    contactQuery.style.borderColor = ''; // Remove red border highlighting
    return true; // Return true to indicate validation passed
  }
}

// ---- Form Submission Handler ----
// Listens for form submission event and validates all fields before sending
contactForm.addEventListener('submit', e => {
  e.preventDefault(); // Prevent default form submission behavior

  // Perform validation on all form fields
  const isNameValid = validateName(); // Validate name field
  const isPhoneValid = validatePhoneNumber(); // Validate phone number field
  const isEmailValid = validateEmail(); // Validate email field
  const isNotEmpty = validateQuery(); // Validate query/message field

  // Check if all validations passed successfully
  if (isNotEmpty && isPhoneValid && isNameValid && isEmailValid) {
    alert('Form submitted successfully!'); // Display success message to user
    contactForm.reset(); // Clear all form fields after successful submission
  }
});