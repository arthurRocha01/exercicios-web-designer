import { renderMateriais, setupForm } from './ui/materialUI.js';
import { initLogin } from './ui/materialUI.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.endsWith('index.html') || path === '/' || path === '/index') {
    initLogin();
  } 
  else if (path.endsWith('dashboard.html')) {
    renderMateriais();
  } 
  else if (path.endsWith('cadastrar.html')) {
    setupForm();
  }
});
