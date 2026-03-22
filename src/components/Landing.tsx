import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <div className="greeting">
              <span className="greeting-text greeting-hey">HEY</span>
              <span className="greeting-text greeting-iam">I'M</span>
            </div>
            <h1 className="name-title">
              <span className="name-line name-abhi" data-text="ABHI">ABHI</span>
              <span className="name-line name-venkat" data-text="VENKAT SAI">VENKAT SAI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Full Stack</h3>
            <div className="text-rotator">
              <span className="rotator-text" data-text="Developer">Developer</span>
              <span className="rotator-text" data-text="Engineer">Engineer</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
