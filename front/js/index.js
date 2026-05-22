/* move2U – JSScripts  */

const modal        = document.getElementById('applyModal');
const modalName    = document.getElementById('modalActivityName');
const closeBtn     = document.getElementById('modalCloseBtn');
const form         = document.getElementById('applyForm');
const dateInput    = document.getElementById('applyDate');
const dateWarning  = document.getElementById('dateWarning');
const toast        = document.getElementById('successToast');

// ---- Join Activity Button Handler ----
// Select all "Join Now" buttons and attach click event listeners to each one
document.querySelectorAll('.join-btn').forEach(btn => {
  btn.addEventListener('click', () => {    
    modalName.textContent = btn.dataset.activity;// Set the modal title to display the activity name from the button's data attribute
    form.reset(); // Clear all form fields to ensure a fresh form for the new activity
    dateWarning.style.display = 'none';// Hide the date warning message (in case it was shown from a previous attempt)
    modal.classList.add('open');// Add the 'open' class to the modal to make it visible
    document.body.style.overflow = 'hidden';// Prevent body scrolling while the modal is open for better user experience
  });
});

/* ---- Close modal ------------------------------------------ */
function closeModal() {
  modal.classList.remove('open'); // Restore scrolling on the page removing the class that makes the modal visible
  document.body.style.overflow = ''; // Restore scrolling on the page by clearing the overflow style
}

closeBtn.addEventListener('click', closeModal); // Event listener to close the modal when the close button is clicked

// Close the modal when clicking the dark overlay (outside the modal box)
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal(); // Check if the click is on the overlay
});

// Close the modal when the Escape key is pressed
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); // If the ESC key is pressed and the modal is open, close it
});

// ---- Weekend-only date validation -------------------------
// Validate the selected date to ensure it falls on a weekend
dateInput.addEventListener('change', () => {
  if (!dateInput.value) return; // Exit if no date is selected
  const day = new Date(dateInput.value + 'T00:00:00').getDay(); // Get the day of the week (0=Sunday, 6=Saturday)
  dateWarning.style.display = (day === 0 || day === 6) ? 'none' : 'block'; // Show warning if not a weekend
});

// ---- Form submission --------------------------------------
// Handle form submission
form.addEventListener('submit', e => {
  e.preventDefault();// Prevent the default form submission behavior

  // Basic HTML5 validation of the inputs
  if (!form.checkValidity()) {
    form.querySelectorAll('input').forEach(input => {
      if (!input.validity.valid) input.style.borderColor = '#dc3545';// Highlight invalid inputs in red
    });
    return; // Stop submission if validation fails
  }

   // Weekend check - ensure the selected date falls on a weekend
  const day = new Date(dateInput.value + 'T00:00:00').getDay();// Get the day of the week
  if (day !== 0 && day !== 6) { // Get the day of the week (0=Sunday, 6=Saturday)
    dateWarning.style.display = 'block';  // Show warning if not a weekend
    return; // Stop submission if date is not a weekend
  }

  closeModal(); // Close the modal after successful submission
  showToast(); // Display success message
  form.reset(); // Clear all form fields
});

// Reset red borders on input - remove error styling when user corrects input
form.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => { input.style.borderColor = ''; }); // Clear the red border color
});

// ---- Toast helper ----------------------------------------- 
// Display a temporary notification message to the user
function showToast() {
  toast.style.display = 'block'; // Show the toast message
  setTimeout(() => { toast.style.display = 'none'; }, 4500); // Hide after 4.5 seconds
}