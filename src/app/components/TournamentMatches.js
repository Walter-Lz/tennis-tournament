import { useState, useEffect } from "react";
import styled from "styled-components";
import MatchesDetails from "./MatchesDetails";
import TournamentBoard from "./TournamentBoard";

const GenerateTournament = (players) => {
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
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [view, setView] = useState('calendar'); // estado para controlar la vista

  useEffect(() => {
    const players = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5', 'Jugador 6', 'Jugador 7', 'Jugador 8', 'Jugador 9', 'Jugador 10'];
    setMatches(GenerateTournament(players));
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
      <h1>Torneo Movistar 2025</h1>
      <TabSelector>
        <Tab onClick={() => setView('calendar')} active={view === 'calendar' ? 'true' : 'false'}>Calendario</Tab>
        <Tab onClick={() => setView('board')} active={view === 'board' ? 'true' : 'false'}>Tablero</Tab>
      </TabSelector>
      {view === 'calendar' ? (
        <MatchesContainer>
          {Object.keys(matchesByDate).map((date, index) => (
            <div key={index}>
              <MatchDate>{formatDate(date)}</MatchDate>
              {matchesByDate[date].map((match, matchIndex) => (
                <MatchCard key={matchIndex} onClick={() => setSelectedMatch(match)}>
                  <MatchVs>{match.player1} vs {match.player2}</MatchVs>
                </MatchCard>
              ))}
            </div>
          ))}
        </MatchesContainer>
      ) : (
        <TournamentBoard />
      )}
      {selectedMatch && <MatchesDetails match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
    </div>
  );
}
const TabSelector = styled.div`
  display: flex;
  margin-bottom: 16px;
  border-bottom: 2px solid #ccc;
`;

const Tab = styled.div`
  flex: 1;
  padding: 8px 16px;
  cursor: pointer;
  text-align: center;
  border-bottom: ${props => (props.active === 'true' ? '2px solid #007bff' : 'none')};
  color: ${props => (props.active === 'true' ? '#007bff' : '#555')};
  &:hover {
    color:rgb(83, 179, 71);
  }
`;

const MatchesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  max-width: 100%;
  max-height: 80vh; /* Altura máxima para permitir el desplazamiento */
  overflow-y: auto; /* Desplazamiento vertical */
`;

const MatchCard = styled.div`
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 4px;
  &:hover {
    background: #b5ff96;
  }
  `;

const MatchDate = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const MatchVs = styled.div`
  font-size: 14px;
  color: #555;
`;