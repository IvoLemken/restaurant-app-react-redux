import React from 'react'
import Reservation from './Reservation'

export default function ReservationsOverview({ reservations }) {
    if (!reservations || !reservations.reservedTables) {return;}
    return (
        <div key={"reservationsOverview"}>
            {
                reservations.reservedTables.map((reservation) => {
                    return <Reservation key={reservation.id} id={reservation.id} date={reservation.date} tableId={reservation.tableId} email={reservation.user.email} name={reservation.user.name}></Reservation>
                })
            }
        </div>
    )
}
