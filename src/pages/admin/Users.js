import styled from "styled-components"
import { Title } from "../../styled"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectToken, selectUser } from "../../store/user/selectors"
import { selectUserList } from "../../store/userList/selectors"
import { loadAllUsers } from "../../store/userList/thunks"
import UsersOverview from "../../components/UsersOverview"

export const Users = () => {

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

  const userList = useSelector(selectUserList)

  useEffect(() => {
    //Runs only on the first render
    dispatch(loadAllUsers());
  }, [dispatch])
  

  return (
    <div style={{textAlign: "center"}}>
      <Container>
        <Title>Users</Title>
        <UsersOverview userList={userList}></UsersOverview>
      </Container>
    </div>
  )
}

const Container = styled.div`
  content-align: center
  margin: 15%;
`