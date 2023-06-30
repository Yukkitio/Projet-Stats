import React from "react";

export default function GameStats() {
  const gameCardsData = [
      {
          image: 'https://picsum.photos/500/300/?image=10',
          title: 'Jeu 1',
          description: 'Description du jeu 1',
      },
      {
          image: 'https://picsum.photos/500/300/?image=10',
          title: 'Jeu 2',
          description: 'Description du jeu 2',
      },
      {
          image: 'https://picsum.photos/500/300/?image=10',
          title: 'Jeu 3',
          description: 'Description du jeu 3',
      },
      {
          image: 'https://picsum.photos/500/300/?image=10',
          title: 'Jeu 4',
          description: 'Description du jeu 4',
      },
      // Ajoutez les données pour les autres cartes ici
  ];
  return (
        <div className="main">
          <h1>Responsive Card Grid Layout</h1>
          <ul className="cards">
            {gameCardsData.map((card, index) => (
              <li className="cards_item" key={index}>
                <div className="card">
                  <div className="card_image"><img src={card.image} alt={card.title} /></div>
                  <div className="card_content">
                    <h2 className="card_title">{card.title}</h2>
                    <p className="card_text">{card.description}</p>
                    <button className="btn card_btn">Read More</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
  );
}