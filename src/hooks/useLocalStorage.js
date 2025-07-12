import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Lire la valeur initiale depuis le localStorage ou utiliser la valeur par défaut
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur et le localStorage
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Gérer l'erreur si besoin
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
