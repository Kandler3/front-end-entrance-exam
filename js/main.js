function getEditableElements() {
  return Array.from(document.querySelectorAll('[contenteditable="true"]'));
}

function getElementKey(el, idx) {
  if (el.dataset.editId) return 'edit_' + el.dataset.editId;
  if (el.id) return 'edit_' + el.id;
  return 'edit_' + idx;
}

function saveAllEditable() {
  getEditableElements().forEach((el, idx) => {
    const key = getElementKey(el, idx);
    localStorage.setItem(key, el.innerHTML);
  });
}

function restoreAllEditable() {
  getEditableElements().forEach((el, idx) => {
    const key = getElementKey(el, idx);
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      el.innerHTML = saved;
    }
  });
}

function saveEditable(el, idx) {
  const key = getElementKey(el, idx);
  localStorage.setItem(key, el.innerHTML);
}

window.addEventListener('DOMContentLoaded', restoreAllEditable);

window.addEventListener('DOMContentLoaded', () => {
  getEditableElements().forEach((el, idx) => {
    el.addEventListener('input', () => saveEditable(el, idx));
  });
});
