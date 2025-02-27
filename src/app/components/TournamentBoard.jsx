import React, { useState } from "react";
import styled from "styled-components";
import {FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TournamentBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 13;
  const [players, setPlayers] = useState([
    { name: "Jugador 1", played: 0, won: 0, lost: 0 },
    { name: "Jugador 2", played: 0, won: 0, lost: 0 },
    { name: "Jugador 3", played: 0, won: 0, lost: 0 },
    { name: "Jugador 4", played: 0, won: 0, lost: 0 },
    { name: "Jugador 5", played: 0, won: 0, lost: 0 },
    { name: "Jugador 6", played: 0, won: 0, lost: 0 },
    { name: "Jugador 7", played: 0, won: 0, lost: 0 },
    { name: "Jugador 8", played: 0, won: 0, lost: 0 },
    { name: "Jugador 9", played: 0, won: 0, lost: 0 },
    { name: "Jugador 10", played: 0, won: 0, lost: 0 },
    { name: "Jugador 11", played: 0, won: 0, lost: 0 },
    { name: "Jugador 12", played: 0, won: 0, lost: 0 },
    { name: "Jugador 13", played: 0, won: 0, lost: 0 },
    { name: "Jugador 14", played: 0, won: 0, lost: 0 },
    { name: "Jugador 15", played: 0, won: 0, lost: 0 },
    { name: "Jugador 16", played: 0, won: 0, lost: 0 },
  ]);

  // Determinar el índice de los jugadores a mostrar
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(players.length / playersPerPage);

  // Funciones para los botones de paginación
  const handlePrevious = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  return (
    <TableWrapper>
      <h2>Tabla del Torneo</h2>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Jugador</Th>
              <Th>Jugados</Th>
              <Th>Ganados</Th>
              <Th>Perdidos</Th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((player, index) => (
              <Tr key={index}>
                <Td>{player.name}</Td>
                <Td>{player.played}</Td>
                <Td>{player.won}</Td>
                <Td>{player.lost}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {/* Paginación con íconos */}
      <PaginationWrapper>
        <PaginationButton onClick={handlePrevious} disabled={currentPage === 1}>
          <FaArrowLeft />
        </PaginationButton>
        <PaginationButton onClick={handleNext} disabled={currentPage === totalPages}>
          <FaArrowRight />
        </PaginationButton>
      </PaginationWrapper>
    </TableWrapper>
  );
};
export default TournamentBoard;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw; 
  padding: 20px;
  text-align: center;
  align-items: center;
  overflow-x: hidden;
  margin-left: -20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const TableContainer = styled.div`
  width: 100%;
  max-width: 800px; 
  overflow-x: auto; 
  display: flex;
  justify-content: center; 
`;
const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  margin: 0 auto; 

  @media (max-width: 768px) {
    min-width: 100%;
    font-size: 14px;
  }
`;
const Th = styled.th`
  background: #007bff;
  color: white;
  padding: 12px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;
const Td = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
  text-align: center;
  word-break: break-word;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;
const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #f8f9fa; /* 🔹 Alternancia de color */
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PaginationButton = styled.button`
  background: #007bff;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:disabled {
    background: #e0e0e0;
    cursor: not-allowed;
  }

  &:hover {
    background: #0056b3;
  }

  &:active {
    background: #004085;
  }
`;