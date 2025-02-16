import { useState, useEffect } from "react";

const generateTournament = (players) => {
  if (players.length <= 4) return [];
  
  const scheduledMatches = [];
  const tournamentPlayers = players.slice(4); // Excluir los primeros 4
  const startDate = new Date();
  
  tournamentPlayers.forEach((player, index) => {
    let matchDay = new Date(startDate);
    let opponents = [];
    
    for (let i = 1; i <= 4; i++) {
      let opponentIndex = (index + i) % tournamentPlayers.length;
      opponents.push({ player1: player, player2: tournamentPlayers[opponentIndex], date: new Date(matchDay) });
      matchDay.setDate(matchDay.getDate() + 4);
    }
    scheduledMatches.push(...opponents);
  });

  return scheduledMatches;
};

export default function Tournament() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const players = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5', 'Jugador 6', 'Jugador 7', 'Jugador 8', 'Jugador 9', 'Jugador 10'];
    setMatches(generateTournament(players));
  }, []);

  return (
    <div>
      <h1>Calendario del Torneo</h1>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            {match.player1} vs {match.player2} - {match.date.toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}