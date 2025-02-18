// app/page.js
"use client";
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function Home() {
  const router = useRouter();

  const goToTournament = () => {
    router.push('/Tournament'); // Redirige a la página /tournament
  };

  return (
    <Container>
      <Title>Bienvenido a la Página de Inicio</Title>
      <GoToTournamentButton onClick={goToTournament}>
        Ir a la sección de Torneo
      </GoToTournamentButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Arial'
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const GoToTournamentButton = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;
