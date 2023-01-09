import React from 'react'
import User from './User'

export default function UsersOverview({ userList }) {
    if (!userList || !userList.users) {return;}
    return (
        <div key={"usersOverview"}>
            {
                userList.users.map((user) => {
                    return <User key={user.id} id={user.id} name={user.name} email={user.email} accountBlocked={user.accountBlocked}></User>
                })
            }
        </div>
    )
}
