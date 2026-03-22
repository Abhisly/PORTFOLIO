import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Added ScrollToPlugin
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const targetId = elem.getAttribute("data-href");
        if (targetId) {
          gsap.to(window, {
            scrollTo: { y: targetId, autoKill: false },
            duration: 1.5,
            ease: "power4.inOut"
          });
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-logo" data-cursor="magnetic">
          <span className="logo-letter">A</span>
          <div className="logo-glow"></div>
          <div className="logo-ring"></div>
        </a>
        <a
          href="mailto:Abhixsly.pro@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          Abhixsly.pro@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about" data-cursor="magnetic">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" data-cursor="magnetic">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" data-cursor="magnetic">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
