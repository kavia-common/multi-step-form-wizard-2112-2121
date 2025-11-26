export const colors = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
};

// PUBLIC_INTERFACE
export function cn(...classes) {
  /** Utility to conditionally join classNames */
  return classes.filter(Boolean).join(' ');
}
