import toast from 'react-hot-toast';

// Standard success toast with optional custom message
export const showSuccessToast = (message: string = 'Operation successful') => {
  toast.success(message);
};

// Standard error toast with optional custom message
export const showErrorToast = (error: unknown, defaultMessage: string = 'Something went wrong') => {
  let errorMessage = defaultMessage;
  
  // Try to extract a more specific error message if available
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  toast.error(errorMessage);
};

// Book-specific toast messages
export const bookToasts = {
  createSuccess: () => showSuccessToast('Book added successfully'),
  createError: (error: unknown) => showErrorToast(error, 'Failed to add book'),
  updateSuccess: () => showSuccessToast('Book updated successfully'),
  updateError: (error: unknown) => showErrorToast(error, 'Failed to update book'),
  deleteSuccess: () => showSuccessToast('Book deleted successfully'),
  deleteError: (error: unknown) => showErrorToast(error, 'Failed to delete book'),
}; 