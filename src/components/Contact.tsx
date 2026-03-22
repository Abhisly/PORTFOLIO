import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section crazy-finale" id="contact">
      <div className="contact-bg-grid"></div>
      <div className="contact-background-glow"></div>
      
      <div className="contact-header">
        <h2 className="finale-title" data-text="LET'S_CREATE">LET'S_CREATE</h2>
        <div className="finale-subtitle">AVAILABILITY: 2026_OPEN_SOURCE</div>
      </div>

      <div className="contact-grid">
        <div className="contact-column">
          <div className="column-tag">01 / DIRECT_LINK</div>
          <a 
            href="mailto:Abhixsly.pro@gmail.com?subject=Project Inquiry - Quantum Portfolio&body=Hello Abhi,%0D%0A%0D%0AI'm reaching out to discuss..." 
            className="contact-large-link" 
            data-cursor="magnetic"
          >
            Abhixsly.pro@gmail.com
            <span className="link-hover-reveal">SEND_DIRECT_MESSAGE</span>
          </a>
          <div className="contact-under-email">
            <div className="contact-credits-inline">
              <div className="credit-item">
                <span className="credit-label">DESIGN_DEVELOPMENT</span>
                <span className="credit-value">ABHI VENKAT SAI</span>
              </div>
            </div>
            <div className="scroll-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              BACK_TO_TOP_↑
            </div>
          </div>
        </div>

        <div className="contact-column">
          <div className="column-tag">02 / NEURAL_NETWORK</div>
          <div className="social-links-crazy">
            {[
              { name: 'Github', url: 'https://github.com/Abhisly?tab=repositories' },
              { name: 'Linkedin', url: '#linkedin' },
              { name: 'Twitter', url: '#twitter' },
              { name: 'Instagram', url: '#instagram' }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target={social.url.startsWith('http') ? "_blank" : "_self"}
                rel={social.url.startsWith('http') ? "noopener noreferrer" : ""}
                className="social-item-crazy"
                data-cursor="magnetic"
              >
                <span className="social-text">{social.name}</span>
                <MdArrowOutward className="social-icon-crazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bottom-scan-line"></div>
    </div>
  );
};

export default Contact;
