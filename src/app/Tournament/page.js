// app/tournament/page.js
"use client";
import { useState } from 'react';
import styled from 'styled-components';
import TournamentMatches from "../components/TournamentMatches"
export default function Tournament() {
  const [tournamentCreated, setTournamentCreated] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleCreateTournament = () => {
    setTournamentCreated(true);
    setCalendarVisible(true);
  };

  return (
    <Container>
      <Title>Torneo</Title>
      
      {!tournamentCreated ? (
        <CreateButton onClick={handleCreateTournament}>
          Realizar Torneo
        </CreateButton>
      ) : (
        <div>
          <p>Torneo creado exitosamente</p>
          {calendarVisible && <TournamentMatches />}
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;