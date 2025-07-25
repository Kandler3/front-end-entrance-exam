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

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.box, .nameBox').forEach(box => {
    box.addEventListener('click', function (e) {
      // Удаляем старый ripple, если есть
      const oldRipple = box.querySelector('.ripple');
      if (oldRipple) oldRipple.remove();
      // Координаты клика относительно box
      const rect = box.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      // Создаём ripple
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      box.appendChild(ripple);
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });
});
