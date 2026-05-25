function toggleMenu(){
    const menu= document.querySelector(".menu-links");
    const icon= document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

//  CV download
function downloadCV() {
  const link = document.createElement('a');
  link.href = './assets/CV_PFA_2026_Ennaciri_Anouar.pdf';
  link.download = 'Anouar_Ennaciri_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}