import React from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { cancelReservation } from '../store/reservation/thunks';

export default function Reservation({ id, date, tableId, email, name }) {
    const dispatch = useDispatch();

    const clickCancel = (e) => {
        e.preventDefault()
        dispatch(cancelReservation(id))
    }

    return (
        <div style={{display:'flex',  margin: "2%"}}>
            <ResInfo key={"date"}>{date}</ResInfo>
            <ResInfo key={"tableId"} style={{width: "5em"}}>{tableId}</ResInfo>
            <ResInfo key={"email"} style={{width: "70em"}}>{email}</ResInfo>
            <ResInfo key={"name"}>{name}</ResInfo>
            <ResInfo key={"cancel"}><button onClick={clickCancel}>Cancel</button></ResInfo>
        </div>
    )
}

const ResInfo = styled.div`
    textAlign: left;
    width: 30em;
    padding: 1em;
    border-bottom: 1px solid black ;
`