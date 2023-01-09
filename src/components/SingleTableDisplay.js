import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../store/user/selectors"
import { Link } from 'react-router-dom'
import { LinkWord } from '../styled'
import { makeReservation } from '../store/reservation/thunks'

export default function SingleTableDisplay({ id, seats, reserved, date }) {
    const dispatch = useDispatch();

    const reserveTable = (e) => {
        e.preventDefault()
        dispatch(makeReservation(date,id));
    }

    const reservationButton = (token) => {
        if (token !== null) {
          return (<button onClick={reserveTable}>Reserve Table</button>)
        }
        return (<Link to="/login" style={LinkWord}>Login to reserve</Link>)
    }
    const token = useSelector(selectToken);
    const [resButton, setResButton] = useState(reservationButton(token))
    const [color, setColor] = useState("rgb(0,255,0)")

    useEffect(() => {
        if (reserved) {
            setColor("rgb(255,0,0)");
            setResButton("Booked");
        } 
        else {
            setColor("rgb(0,255,0)");
            setResButton(reservationButton(token));
        }
    }, [reserved])

    return (
        <div style={{backgroundColor: color, padding: '1em', margin: '1em'}}>Table {id}<br/>{seats} seats<br/><br/>{resButton}</div>
    )
}
