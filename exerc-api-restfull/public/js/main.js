document.addEventListener('DOMContentLoaded', () => {
  const materialsGrid = document.querySelector('.materials-grid');
  const materialForm = document.querySelector('#materialForm');

  initLogin(); 
  if (materialsGrid) renderMateriais(); 
  if (materialForm) setupForm(); 
});
