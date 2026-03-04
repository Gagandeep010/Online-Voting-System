import React from "react";
import "./landing.css"; // Import the external CSS file
import TrustIndicator from "./TrustIndicator.tsx";
import CallToAction from "./CallToAction.tsx";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text-container">
          <div className="hero-badge">
            <div className="b1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9a583db0f768ca86e5ebe3c083627a387041f59"
              alt=""
            />
            <div className="hero-badge-text">
              Secure voting platform for all, using blockchain technology
            </div>
            </div>
          </div>
          <div className="content-hero">
            <svg
              width="918"
              height="182"
              viewBox="0 0 918 182"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hero-svg"
            >
              <text
                fill="#111827"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="Inter"
                fontSize="50"
                fontWeight="800"
                letterSpacing="1.8px"
              >
                <tspan x="82.5953" y="83.107">
                  {" "}
                </tspan>
              </text>
              <text
                fill="#111827"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="VC Nudge Trial"
                fontSize="50"
                letterSpacing="1.8px"
              >
                <tspan x="42.4047" y="83.107">
                  A
                </tspan>
              </text>
              <text
                fill="#0D9488"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="VC Nudge Trial"
                fontSize="50"
                letterSpacing="1.8px"
              >
                <tspan x="113.449" y="84.2402">
                  SECURE
                </tspan>
              </text>
              <text
                fill="#111827"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="VC Nudge Trial"
                fontSize="50"
                letterSpacing="1.8px"
              >
                <tspan x="358.095" y="84.2402">
                  VOTING PLATFORM
                </tspan>
              </text>
              <path
                  d="M100 25C172 29 233 29 323 27M100 25C158 28 203 27 323 27M323 25C324 60 324 85 323 105M323 27C323 55 323 80 323 105M323 105C240 100 180 103 100 105M323 105C250 107 190 107 100 105M100 105C97 80 99 58 100 25M100 105C102 75 103 55 100 25"
                  stroke="#0D9488"
                  strokeWidth="1.5"
                  strokeLinecap="round"
              />
              <text
                fill="#111827"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="VC Nudge Trial"
                fontSize="45"
                letterSpacing="1.8px"
              >
                <tspan x="0.323425" y="173.24">
                  WHERE YOUR VOICE WILL BE HEARD
                </tspan>
              </text>
            </svg>
          </div>
        </div>
        <p className="hero-description">
          We enhance the security ability of the existing voting system through
          the integration of blockchain technology.
        </p>
      </div>
      <TrustIndicator/>
      <CallToAction/>
    </section>
  );
};

export default Hero;
