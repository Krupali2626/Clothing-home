import React from "react";
import "./GoogleAdBanner.css";

/**
 * Reusable Google AdSense placeholder.
 * Drop <GoogleAdBanner size="leaderboard" /> anywhere an ad slot is needed.
 * Replace the placeholder <div> with the AdSense <ins> snippet when ready.
 */
const SIZES = {
  leaderboard: { w: "728px", h: "90px", label: "728 × 90 · Leaderboard" },
  banner: { w: "100%", h: "120px", label: "Responsive Banner" },
  square: { w: "300px", h: "250px", label: "300 × 250 · Medium Rectangle" },
  skyscraper: { w: "160px", h: "600px", label: "160 × 600 · Skyscraper" },
  mobile: { w: "320px", h: "100px", label: "320 × 100 · Mobile Banner" },
};

const GoogleAdBanner = ({ size = "banner", label }) => {
  const config = SIZES[size] || SIZES.banner;

  return (
    <div className="d_ad_wrapper" data-ad-size={size}>
      {/*
        ==============================================
        GOOGLE ADSENSE CODE GOES HERE
        Example:
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        ==============================================
      */}
      <div
        className="d_ad_placeholder container"
        style={{ maxWidth: config.w, minHeight: config.h }}
      >
        <span className="d_ad_tag">Advertisement</span>
        <span className="d_ad_size_label">{label || config.label}</span>
      </div>
    </div>
  );
};

export default GoogleAdBanner;
