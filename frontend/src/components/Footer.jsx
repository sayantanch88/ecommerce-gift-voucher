import React from 'react';

export default function Footer() {
  return (
    <footer className="cr-footer">
      <div>&copy; {new Date().getFullYear()} Coco Republic. All rights reserved.</div>
      <div style={{marginTop: '8px', fontSize: '0.9rem', color: '#ff4444'}}>
        Disclaimer: This is a demo purpose app for AI SDLC demonstration and does not resemble an actual product.
      </div>
    </footer>
  );
}
