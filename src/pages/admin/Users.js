import styled from "styled-components"
import { Button, Input, Title, LinkWord } from "../../styled"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
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
  }, [])
  

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

const SubText = styled.p`
  text-align: center;
  color: #1E3163;
  padding: 20px 0px 5px 0px;
`;

