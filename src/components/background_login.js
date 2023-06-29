import React, { useState, useEffect } from 'react';

export default function BackgroundLogin() {
  const [liStyles, setLiStyles] = useState(Array.from({ length: 10 }, generateRandomStyles));

  function generateRandomStyles() {
    const size = Math.random() * 100;
    return {
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${Math.random() * 3 + 2}s`, // Minimum 2s
      animationDuration: `${Math.random() * 2 + 2}s`, // Minimum 2s
    };
  }

  useEffect(() => {
    setLiStyles(Array.from({ length: 10 }, generateRandomStyles));
  }, []);

  function handleAnimationEnd(index) {
    setLiStyles(prevStyles => {
      const newStyles = [...prevStyles];
      newStyles[index] = generateRandomStyles();
      return newStyles;
    });
  }

  return (
    <ul className="circles">
      {liStyles.map((style, index) => (
        <li
          key={index}
          style={{
            left: style.left,
            width: style.width,
            height: style.height,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
          onAnimationEnd={() => handleAnimationEnd(index)}
        />
      ))}
    </ul>
  );
}
