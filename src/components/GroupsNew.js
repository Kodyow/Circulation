import React, { useState, useEffect, useReducer } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom'

function GroupsNew() {
    const [groupName, setGroupName] = useState("")
    const [description, setDescription] = useState("")
    const [tag, setTag] = useState(1)
    const [visibility, setVisibility] = useState("Public")
    const [tagList, setTagList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        Axios.get("http://localhost:5000/groups/new").then((response) => {
            setTagList(response.data);
            console.log(tagList);

        });
    }, []);

    const create = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:5000/groups/new", {
            groupName: groupName,
            description: description,
            tag: tag,
            visibility: visibility,
        }).then((response)=> {
            console.log(response);
            if (response) {
            navigate('/groups'); 
            }
        });
       
    };



    return (
        <div className="container">
            <form onSubmit={create}>
                <fieldset>
                    <h1>Create Group</h1>
                        <div>
                            <label className="form-label mt-4">Select Tag</label><br/>
                            <select className="form-select" id="tag-role-dropdown" onChange={(event) => setTag(event.target.value)} value={tag}>
                                {
       
                                    tagList.map((element,i) => (
                                        <option key={element.ID} value={element.ID}>{element.name}</option>
                                    ))
                                    
                                }
                                                         
                                
                            </select>
                        </div>


                        <label className="form-label mt-4">Select Visibility</label><br/>
                        <select className="form-select" id="group-role-dropdown" onChange={(event) => setVisibility(event.target.value)} value={visibility}>
                            <option id="public1" value="Public">Public</option>
                            <option id="protected1"value="Protected">Protected</option>
                            <option id="private1" value="Private">Private</option>
                        </select>
                    <div className="form-group">
                        <label htmlFor="setGroupName" className="form-label mt-4">Group Name</label>
                        <input name="Group" type="Group" className="form-control" id="setGroupName" placeholder="Group Name" onChange={(e)=>{setGroupName(e.target.value)}}/>
                        
                        <label htmlFor="setDescription" className="form-label mt-4">Description</label>
                        <input name="Description" type="Description" className="form-control" id="setDescription" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}/>

                        </div>    
                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </fieldset>
            </form>
        </div>

    );
}

export default GroupsNew;
