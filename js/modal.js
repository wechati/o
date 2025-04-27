document.addEventListener('DOMContentLoaded', () => {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
  
    // --- Function to open a modal ---
    function openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('is-open');
        document.body.classList.add('modal-is-open'); // Prevent background scroll
        // Optional: Focus the first focusable element (e.g., close button)
        const focusableElement = modal.querySelector('button.modal-close') || modal.querySelector('a, button');
        if (focusableElement) {
            setTimeout(() => focusableElement.focus(), 50); // Delay helps ensure transition finishes
        }
        // Add event listener for Escape key specific to this open modal
        document.addEventListener('keydown', handleEscapeKey);
      } else {
        console.warn(`Modal with ID "${modalId}" not found.`);
      }
    }
  
    // --- Function to close the currently open modal ---
    function closeModal() {
      const openModal = document.querySelector('.modal.is-open');
      if (openModal) {
        openModal.classList.remove('is-open');
        document.body.classList.remove('modal-is-open'); // Restore background scroll
        // Remove Escape key listener when modal closes
        document.removeEventListener('keydown', handleEscapeKey);
         // Optional: Return focus to the trigger element (more complex, requires storing trigger)
      }
    }
  
    // --- Function to handle Escape key press ---
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }
  
    // --- Add event listeners to trigger buttons ---
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const modalId = trigger.getAttribute('data-modal-target');
        if (modalId) {
          openModal(modalId);
        } else {
           console.error("Trigger button missing 'data-modal-target' attribute:", trigger);
        }
      });
    });
  
    // --- Add event listeners to close buttons ---
    modalCloseButtons.forEach(button => {
      button.addEventListener('click', () => {
        closeModal();
      });
    });
  
    // --- Add event listeners to overlays ---
    modalOverlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
        closeModal();
      });
    });
  
  }); // End DOMContentLoaded