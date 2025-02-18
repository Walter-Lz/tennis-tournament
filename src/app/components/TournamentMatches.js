import { useState, useEffect } from "react";
import styled from "styled-components";

const generateTournament = (players) => {
  if (players.length <= 4) return [];  
  const scheduledMatches = [];
  const tournamentPlayers = players.slice(4); // Excluir los primeros 4
  const startDate = new Date();
  
  let matchDay = new Date(startDate);
  let matchesPerDay = 0;
  const playerMatches = new Map();
  tournamentPlayers.forEach(player => {
    playerMatches.set(player, []);
  });

  for (let i = 0; i < tournamentPlayers.length; i++) {
    let player = tournamentPlayers[i];
    let matchesPlayed = 0;

    for (let j = 1; j < tournamentPlayers.length; j++) {
      if (matchesPlayed >= 4) break;

      let opponentIndex = (i + j) % tournamentPlayers.length;
      let opponent = tournamentPlayers[opponentIndex];

      if (playerMatches.get(player).includes(opponent) || playerMatches.get(opponent).includes(player)) continue;

      scheduledMatches.push({ player1: player, player2: opponent, date: new Date(matchDay) });
      playerMatches.get(player).push(opponent);
      playerMatches.get(opponent).push(player);
      matchesPlayed++;
      matchesPerDay++;

      if (matchesPerDay === 2) {
        matchDay.setDate(matchDay.getDate() + 1);
        matchesPerDay = 0;
      }
    }
    matchDay.setDate(matchDay.getDate() + 4); // 4 días de descanso
  }
  return scheduledMatches;
};

export default function Tournament() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const players = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5', 'Jugador 6', 'Jugador 7', 'Jugador 8', 'Jugador 9', 'Jugador 10'];
    setMatches(generateTournament(players));
  }, []);

// Agrupar partidos por fecha
const matchesByDate = matches.reduce((acc, match) => {
  const date = match.date.toDateString();
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(match);
  return acc;
}, {});
  // Formatear fechas en español
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
  };

return (
  <div>
    <h1>Calendario del Torneo</h1>
    <MatchesContainer>
      {Object.keys(matchesByDate).map((date, index) => (
        <MatchColumn key={index}>
        <MatchDate>{formatDate(date)}</MatchDate>
        {matchesByDate[date].map((match, matchIndex) => (
          <MatchCard key={matchIndex}>
            <MatchVs>{match.player1} vs {match.player2}</MatchVs>
          </MatchCard>
        ))}
      </MatchColumn>
    ))}
  </MatchesContainer>
</div>
);
}
const MatchesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%;
  overflow-x: auto;
`;
const MatchColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 calc(100% / 6); /* Limitar a 6 columnas */
  max-width: calc(100% / 6);
`;
const MatchCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const MatchDate = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;
const MatchVs = styled.div`
  font-size: 14px;
  color: #555;
`;