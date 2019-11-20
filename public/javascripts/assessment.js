function approve(e) {
  console.log(e.currentTarget);
  e.currentTarget.classList.toggle(`approved`);
  console.log(e.currentTarget);
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    let [...images] = document.getElementById('images-container').children;
    images.forEach(img => (img.onclick = approve));
  },
  false
);
