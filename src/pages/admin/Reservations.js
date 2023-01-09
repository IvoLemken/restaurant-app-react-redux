import styled from "styled-components"
import { Title } from "../../styled"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectToken, selectUser } from "../../store/user/selectors"
import { loadAllReservations } from "../../store/reservation/thunks"
import { selectReservations } from "../../store/reservation/selectors"
import ReservationsOverview from "../../components/ReservationsOverview"

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

  const reservations = useSelector(selectReservations)

  useEffect(() => {
    //Runs only on the first render
    dispatch(loadAllReservations());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <Title>Reservations</Title>
        <ReservationsOverview reservations={reservations}></ReservationsOverview>
      </Container>
    </div>
  )
}

const Container = styled.div`
  content-align: center
  margin: 15%;
`