import React, { useState, useEffect, componentDidMount} from 'react';
import Axios from 'axios';
//import { GroupList } from './GroupList'
import './Groups.css'
import { Table } from './Table'
import {useNavigate} from 'react-router-dom'


export const Groups = () => {
    const [group, setGroup] = useState([]);
    const [header, setHeader] = useState(["Group ID", "Group Name", "Description","Tag", "Visibility","Member Count"]);
    const [arrayViewCheckBox,setArrayViewCheckBox] = useState([]);
    const [searchInput,setSearchInput] = useState("");
    const [selectedOrder,setSelectedOrder] = useState("Group_name");
    const [myView,setMyView] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        Axios.get("http://localhost:5000/groups").then((response) => {
            setGroup(response.data);
            console.log(response);
        });
    }, []);

    const searchSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:5000/groups", {
            search: searchInput,
            visibility: arrayViewCheckBox,
            order: selectedOrder
        }).then((response) => {
            setGroup(response.data);
            console.log(response);
        });
    }

    const handleViewCheckBox = (event) => {
        let newArray = [...arrayViewCheckBox, event.target.value];
        if (arrayViewCheckBox.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value);
        }
        setArrayViewCheckBox(newArray);
        console.log(newArray);
        console.log(myView);

    }


    return (
        <div className="group-container clearfix">
            <form onSubmit={searchSubmit}>
                <fieldset className="form-group">
                    <legend className="mt-4">Search</legend>
                    <div className="input-group mb-3">
                        <input type="input" className="form-control" placeholder="Search by group name..." aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setSearchInput(e.target.value)}/>
                        <input className="btn btn-primary" type="submit" id="button-addon2"/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={(event) => setMyView(!myView)}>View My Groups</button>
                    <legend className="mt-4">Group Visibility</legend>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Public" id="flexCheckPuiblic" onChange={handleViewCheckBox}/>
                        <label className="form-check-label" htmlFor="flexCheckPuiblic">Public</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Protected" id="flexCheckProtected" onChange={handleViewCheckBox}/>
                        <label className="form-check-label" htmlFor="flexCheckProtected">Protected</label>
                    </div>
                    <div className={`form-check ${myView?"":"hidden"}`}>
                        <input className="form-check-input" type="checkbox" value="Private" id="flexCheckPrivate" onChange={handleViewCheckBox}/>
                        <label className="form-check-label" htmlFor="flexCheckPrivate">Private</label>
                    </div>
                </fieldset>
            </form>

            
            <div className="other-groups clearfix">
                <h2>Public Groups</h2>
                {/* <GroupList cardClassName="other-card"/> */}
                
                <Table columns={header} query={group} path="groups"/>
            </div>            
            <button class="btn btn-lg btn-primary" type="button" onClick={ (e) =>navigate('/groups/new')}>Create New Group</button>
        </div>
    )
}
