import { Button, Input, Title, LinkWord } from "../styled"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState } from "react"
import TablesDisplay from "../components/TablesDisplay"
import { useDispatch, useSelector } from "react-redux"
import { selectTables, selectReservedTables } from "../store/tables/selectors"
import { loadTables } from "../store/tables/thunks"
import { loadReservations } from "../store/tables/thunks"

const LOCAL_STORAGE_DATE_KEY = 'restaurant-app'

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

export const Homepage = () => {
  const [reservationDate, setDate] = useState("")
  
  const reservedTables = useSelector(selectReservedTables);
  const tables = useSelector(selectTables);

  useEffect(() => {
    const storedDate = localStorage.getItem(LOCAL_STORAGE_DATE_KEY)
    if (storedDate) setDate(storedDate); else setDate(formatDate());
  }, [])  

  const dispatch = useDispatch()
  
  dispatch(loadTables());

  useEffect(() => {
    if (reservationDate !== "") {
      localStorage.setItem(LOCAL_STORAGE_DATE_KEY, reservationDate)
      dispatch(loadReservations(reservationDate));
    }
  }, [reservationDate])

  return (
    <div style={{textAlign: "center"}}>
      <Container>
        <Title>Make a reservation</Title>
        
        <Input 
          type="date"
          name="reservationDate"
          value={reservationDate}
          min={formatDate()}
          onChange={(e) => {
            setDate(e.target.value)
          }}
        />
        
        <br/>
        <br/>
        <br/>
        <TablesDisplay tables={tables} reservedTables={reservedTables}/>

      </Container>
    </div>
  )
}

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin: 15%;
`