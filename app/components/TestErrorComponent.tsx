'use client';

import { useEffect, useState } from 'react';

interface TestErrorComponentProps {
  shouldThrow?: boolean;
}

export const TestErrorComponent: React.FC<TestErrorComponentProps> = ({ shouldThrow = false }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (shouldThrow) {
      setHasError(true);
    }
  }, [shouldThrow]);

  if (hasError) {
    // This will be caught by the ErrorBoundary
    throw new Error('This is a test error from TestErrorComponent');
  }

  return (
    <div className="p-4 bg-blue-100 rounded mb-4">
      <h3 className="font-medium text-blue-800">Test Component</h3>
      <p className="text-blue-600">This component is working correctly.</p>
      <button
        onClick={() => setHasError(true)}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Throw Error
      </button>
    </div>
  );
}; 