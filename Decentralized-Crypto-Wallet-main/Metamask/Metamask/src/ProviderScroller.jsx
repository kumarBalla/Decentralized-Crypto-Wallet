import React from "react";
import "./ProviderScroller.css";
import { 
  SiCoinbase, SiStripe, SiPaypal, SiRevolut 
} from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FaRegQuestionCircle } from "react-icons/fa"; // placeholder for missing icons

export default function ProviderScroller() {
  const providers = [
    { name: "Ramp", icon: <FaRegQuestionCircle size={50} /> }, // placeholder
    { name: "Revolut", icon: <SiRevolut size={50} /> },
    { name: "Onramp", icon: <FaRegQuestionCircle size={50} /> }, // placeholder
    { name: "Transak", icon: <FaRegQuestionCircle size={50} /> }, // placeholder
    { name: "Coinbase", icon: <SiCoinbase size={50} /> },
    { name: "Mercuryo", icon: <FaRegQuestionCircle size={50} /> }, // placeholder
    { name: "Stripe", icon: <SiStripe size={50} /> },
    { name: "PayPal", icon: <SiPaypal size={50} /> },
    { name: "Google Pay", icon: <FontAwesomeIcon icon={faGoogle} size="2x" /> }, // Font Awesome
  ];

  return (
    <div className="provider-logos-section">
      <h2>
        Get competitive quotes from our <br />
        <span>industry-leading providers</span>
      </h2>

      {/* Top scrolling row */}
      <div className="scroll-container">
        <div className="scroll-track scroll-left">
          {providers.concat(providers).map((p, i) => (
            <div className="logo-card" key={i}>
              {p.icon}
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scrolling row */}
      <div className="scroll-container">
        <div className="scroll-track scroll-right">
          {providers.concat(providers).map((p, i) => (
            <div className="logo-card" key={i}>
              {p.icon}
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
