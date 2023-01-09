import styled from "styled-components"
import { Button, Title } from "../../styled"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectToken, selectUser } from "../../store/user/selectors"
import { loadAllReservations } from "../../store/reservation/thunks"
import { selectReservations } from "../../store/reservation/selectors"

export const Reservations = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(selectToken)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (token == null) {
      navigate("/");
    }
    if (user == null) {
      navigate("/");
    }
    if (user !== null && user.isAdmin !== true) {
      navigate("/");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    //Runs only on the first render
    dispatch(loadAllReservations());
  }, []);

  const reservations = useSelector(selectReservations)

  const showReservations = () => {
    const result = []
    if (reservations && reservations.reservedTables) {
      reservations.reservedTables.forEach((e) => {
        result.push(`${e.id} | ${e.date} | ${e.tableId} | ${e.user.name} \n\n`)
      });
    }
    return result
  }

  return (
    <div style={{textAlign: "center"}}>
      <Container>
        <Title>Reservations</Title>
        {showReservations()}
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin: 15%;
`

const SubText = styled.p`
  text-align: center;
  color: #1E3163;
  padding: 20px 0px 5px 0px;
`;

