import React from 'react'
import SingleTableDisplay from './SingleTableDisplay'

export default function TablesDisplay({ tables, reservedTables }) {
    if (!tables || !reservedTables) {return;}
    return (
        <div key={"tableOverview"} style={{display:'grid', gridTemplateColumns: 'auto auto', alignContent: 'center'}}>
            {
                tables.map(table => {
                    if (reservedTables.tables.find((e) => e === table.id)) {
                        return <SingleTableDisplay key={table.id} id={table.id} seats={table.seats} reserved={true} />
                    }
                    return <SingleTableDisplay key={table.id} id={table.id} seats={table.seats} reserved={false} />
                })
            }
        </div>
    )
}