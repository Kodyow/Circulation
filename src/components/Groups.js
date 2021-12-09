import React, { useState, useEffect, componentDidMount} from 'react';
import Axios from 'axios';
import { GroupList } from './GroupList'
import './Groups.css'
import { Table } from './Table'


export const Groups = () => {
    const [group, setGroup] = useState([]);
    const [header, setHeader] = useState(["Group ID", "Group Name", "Description","Tag"]);


    useEffect(() => {
        Axios.get("http://localhost:5000/groups").then((response) => {
            setGroup(response.data);
            console.log(response);
        });;
    }, []);

    return (
        <div className="group-container clearfix">
            <div className="my-groups">
                <h2>My Groups</h2>
                {/* <GroupList cardClassName="my-card"/> */}
                <Table columns={header} query={group}/>
            </div>
            
            <div className="other-groups clearfix">
                <h2>Public Groups</h2>
                {/* <GroupList cardClassName="other-card"/> */}
                <Table columns={header} query={group}/>
            </div>
            
            
        </div>
    )
}
