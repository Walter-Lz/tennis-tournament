// app/tournament/page.js
"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import TournamentMatches from "../components/TournamentMatches";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import {es} from 'date-fns/locale';

export default function Tournament() {
  const [tournamentCreated, setTournamentCreated] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [tournamentName, setTournamentName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [category, setCategory] = useState('AA');
  const [error, setError] = useState('');

  const handleCreateTournament = () => {
    if (tournamentName && startDate && category) {
      setTournamentCreated(true);
      setCalendarVisible(true);
      setError('');
    } else {
      setError('Por favor, complete todos los campos antes de crear el torneo.');
    }
  };

  return (
    <Container>
      {!tournamentCreated ? (
        <Form>
           <Title>Inicializa el torneo</Title>
          <Label>
            Nombre del Torneo:
            <Input 
              type="text" 
              value={tournamentName} 
              onChange={(e) => setTournamentName(e.target.value)} 
            />
          </Label>
          <Label>
            Fecha de Inicio:
            <DatePickerWrapper>
              <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                locale={es}
              />
              <FaCalendarAlt />
            </DatePickerWrapper>
          </Label>
          <Label>
            Categoría:
            <Select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="AA">AA</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
          </Label>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <CreateButton onClick={handleCreateTournament}>
            Realizar Torneo
          </CreateButton>
        </Form>
      ) : (
        <div>
          {calendarVisible && <TournamentMatches />}
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
`;
const Input = styled.input`
  padding: 5px;
  margin-left: 10px;
  font-size: 1rem;
`;
const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  .react-datepicker-wrapper {
    width: auto;
  }

  svg {
    margin-left: 5px;
  }
`;
const Select = styled.select`
  padding: 5px;
  margin-left: 10px;
  font-size: 1rem;
`;
const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-bottom: 10px;
`;