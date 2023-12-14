export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <h3>CUSTOMER SUPPORT</h3>
          <p>Quick Hotline: +36 22 100 100</p>
          <p>Available 8-18h Mo-Fri.</p>
          <p>Helpdesk Address: help@ajsewebshop.io</p>
          <button>Customer Support</button>
        </div>

        <div className="footer__center">
          <h3>AJSE NEWSLETTER</h3>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email Address" />
          <button>Subscribe</button>
        </div>

        <div className="footer__right">
          <h3>HELP CENTER</h3>
          <div><a href="#">Contact Information</a></div>
          <div><a href="#">Frequently Asked Questions</a></div>
          <div><a href="#">Warranty Info</a></div>
          <div><a href="#">Payment Info</a></div>
          <div><a href="#">Shipping Info</a></div>
          <div><a href="#">Legal (GDPR)</a></div>
          <div><a href="#">Report a Problem</a></div>
        </div>
      </div>
    </footer>
  );
}
