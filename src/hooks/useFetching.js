import { useState } from 'react';

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      seterror(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
