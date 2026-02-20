import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      
      <p>NovaCart - Crafted for modern shopping.</p>
      <div className="footer-social">
        <a
          href="https://www.instagram.com"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 .001 8.001A4 4 0 0 0 12 8zm6-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
        </a>
        <a
          href="https://www.twitter.com"
          aria-label="Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 5.5c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.1 1.6-2-.8.5-1.6.8-2.5 1A3.6 3.6 0 0 0 12 8.1a10.2 10.2 0 0 1-7.4-3.7 3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.1-.2-1.6-.4 0 1.6 1.1 3 2.7 3.3-.5.2-1 .2-1.5.1.4 1.3 1.7 2.2 3.1 2.2A7.3 7.3 0 0 1 3 17.6a10.2 10.2 0 0 0 5.5 1.6c6.6 0 10.3-5.5 10.3-10.3v-.5c.7-.5 1.3-1.1 1.7-1.8z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com"
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.5 9H16V6h-2.5A3.5 3.5 0 0 0 10 9.5V12H8v3h2v6h3v-6h2.2l.8-3H13v-2a1 1 0 0 1 1-1z" />
          </svg>
        </a>
      </div>
      <p>February 2026 edition. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
