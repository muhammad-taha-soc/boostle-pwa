// import React from 'react';

export const setLocalStorage = (item) => {
  localStorage.setItem('items', JSON.stringify(item));
};

export const getLocalStorage = (item) => {
  localStorage.getItem('items', JSON.stringify(item));
};
