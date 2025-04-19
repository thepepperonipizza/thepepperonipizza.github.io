document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentPages = document.querySelectorAll('.content-page');
    const profileIcon = document.getElementById('profile-icon');
    const heroSection = document.getElementById('hero-section');
    const contentSection = document.getElementById('content-section');
    const scrollDown = document.getElementById('scroll-down');
  
    let hasScrolled = false;
  
    function scrollToContent() {
      if (!hasScrolled) {
        hasScrolled = true;
        contentSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => hasScrolled = false, 1000);
      }
    }
  
    scrollDown.addEventListener('click', scrollToContent);
  
    window.addEventListener('scroll', function () {
      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
  
      if (
        scrollPosition > heroHeight * 0.6 &&
        scrollPosition < heroHeight * 1.3
      ) {
        scrollToContent();
      }
    });
  
    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToContent();
      }
    });
  
    profileIcon.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    navButtons.forEach(button => {
      button.addEventListener('click', async function () {
        sidebar.classList.remove('centered');
        mainContent.classList.add('active');
        navButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        const pageId = this.getAttribute('data-page');
        const targetPage = document.getElementById(pageId);
  
        if (!targetPage.classList.contains('loaded')) {
          try {
            const response = await fetch(`../pages/${pageId}.html`);
            const html = await response.text();
            targetPage.innerHTML = html;
            targetPage.classList.add('loaded');
          } catch (error) {
            targetPage.innerHTML = '<p>Error loading content.</p>';
          }
        }
  
        contentPages.forEach(page => page.classList.remove('active'));
        targetPage.classList.add('active');
      });
    });
  });  