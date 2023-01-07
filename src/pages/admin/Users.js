import styled from "styled-components"
import { Button, Input, Title, LinkWord } from "../../styled"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectToken, selectUser } from "../../store/user/selectors"

export const Users = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(selectToken)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (token == null || user == null) {
      navigate("/");
    }
    // if (user.isAdmin !== true) {
    //   navigate("/");
    // }
  }, [token, user, navigate]);

  return (
    <div style={{textAlign: "center"}}>
      <Container>
        <Title>Users</Title>
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

