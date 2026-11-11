// MDTransport Website - Interactive Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Copy citation to clipboard
    window.copyCitation = function() {
        const citationText = `Verma, A. K.; Thorat, A. S.; Shah, J. K.
MDTransport: A Modular, Open-Source, Extensible Python Tool 
for Computing Transport Properties from GROMACS and LAMMPS Simulations.
J. Chem. Inf. Model. 2026, 66, 9989−10003.
DOI: 10.1021/acs.jcim.6c00558`;

        navigator.clipboard.writeText(citationText).then(function() {
            const btn = document.querySelector('.btn-copy');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.background = '#16a34a';
                btn.style.borderColor = '#16a34a';
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                }, 2000);
            }
        }).catch(function() {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = citationText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Citation copied to clipboard!');
        });
    };

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add copy buttons to code blocks
    document.querySelectorAll('pre').forEach(pre => {
        if (!pre.querySelector('.copy-code-btn')) {
            const btn = document.createElement('button');
            btn.className = 'copy-code-btn';
            btn.textContent = 'Copy';
            btn.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem 0.5rem;
                font-size: 0.7rem;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: #94a3b8;
                border-radius: 4px;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            `;
            btn.addEventListener('click', function() {
                const code = pre.querySelector('code') || pre;
                navigator.clipboard.writeText(code.textContent).then(() => {
                    btn.textContent = 'Copied!';
                    btn.style.color = '#22c55e';
                    btn.style.borderColor = '#22c55e';
                    setTimeout(() => {
                        btn.textContent = 'Copy';
                        btn.style.color = '';
                        btn.style.borderColor = '';
                    }, 2000);
                });
            });
            pre.style.position = 'relative';
            pre.appendChild(btn);
            pre.addEventListener('mouseenter', () => btn.style.opacity = '1');
            pre.addEventListener('mouseleave', () => btn.style.opacity = '0');
        }
    });

    // Highlight active nav item based on current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Lazy load images if any added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    // Keyboard navigation for details/summary
    document.querySelectorAll('details summary').forEach(summary => {
        summary.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Print-friendly adjustments
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('details').forEach(d => d.open = true);
});