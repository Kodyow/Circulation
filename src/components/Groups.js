import React from 'react'
import { GroupList } from './GroupList'
import './Groups.css'


export const Groups = () => {
    return (
        <div className="group-container">

            <GroupList myHeader="My Groups" className="my-groups" cardClassName="my-card"/>
            <GroupList myHeader="Public Groups" className="other-groups clearfix" cardClassName="other-card"/>
        </div>
    )
}
