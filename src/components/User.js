import React from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { blockUnblockUser } from '../store/userList/thunks';

export default function User({ id, name, email, accountBlocked }) {
    const dispatch = useDispatch();

    const clickBlock = (e) => {
        e.preventDefault()
        dispatch(blockUnblockUser(id, !accountBlocked))
    }

    const blockText = () => {
        if (accountBlocked) {
            return "Unblock";
        }
        return "Block";
    }

    return (
        <div style={{display:'flex',  margin: "2%"}}>
            <UserInfo key={"name"}>{name}</UserInfo>
            <UserInfo key={"email"} style={{width: "70em"}}>{email}</UserInfo>
            <UserInfo key={"block"}><button onClick={clickBlock}>{blockText()}</button></UserInfo>
        </div>
    )
}

const UserInfo = styled.div`
    textAlign: left;
    width: 30em;
    padding: 1em;
    border-bottom: 1px solid black ;
`