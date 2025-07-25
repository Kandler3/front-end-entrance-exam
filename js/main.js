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

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('download-pdf-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    btn.style.display = 'none';
    const element = document.getElementById('cv-content');
    const canvas = await html2canvas(element, { width: 595, height: 852, scale: 2 });
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new window.jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'JPEG', 40, 40, canvas.width, canvas.height);
    pdf.save('resume.pdf');
    btn.style.display = '';
  });
});
