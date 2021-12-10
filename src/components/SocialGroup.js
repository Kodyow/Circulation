import React, {useEffect,useState}from 'react'
import Axios from 'axios';
import { useParams } from 'react-router'
import { Table } from './Table'
import './SocialGroup.css'

const SocialGroup = () => {
    const {id} = useParams();
    const [userRole, setUserRole] = useState("");
    const [groupInfo, setGroupInfo] = useState([]);
    const [data, setData] = useState([]);
    const [columns, setcolumns] = useState(["User ID", "Username","Join Date","Reputation"]);
    const [ignore, setIgnore] = useState(0);
    useEffect(() => {
        Axios.get(`http://localhost:5000/groups/${id}`).then((response) => {
            setGroupInfo(response.data);
            console.log(response.data);
        });;
    }, []);

    const viewMember = (event) => {
        setUserRole(event.target.value);
        Axios.post(`http://localhost:5000/groups/${id}/role`,{
            role: event.target.value
        }).then((response)=> {
            console.log(response.data);
            setData(response.data);
        });
        
    }
    return (
        <div className ="container group-profile">
            <h1>Group</h1>
            <div className='card border-success mb-3 group-desc'>
                {
                    groupInfo.map((element,index) => 
                        <div key = {index}>
                            <div className="card-header"><span>Group ID: {element.ID}</span> <p>Tag: {element.Tag}</p></div>
                            <div className="card-body">
                                <h4 className="card-title">{element.Name}</h4>
                                <p className="card-text">{element.Description}</p>
                                <p className="card-text">Visibility: {element.Visibility}</p>
                            </div>
                        </div>
                    )
                }


            </div>
            <div className="form-group">
                <label htmlFor="group-role-dropdown" className="form-label mt-4">Select Member Role: </label>
                <select className="form-select" id="group-role-dropdown" onChange={viewMember} value={userRole}>
                    <option value=""></option>
                    <option value="Administrator">Administrator</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Member">Member</option>
                </select>
                <Table columns={columns} query={data} path="profile" ignore={ignore}/>
            </div>
        </div>
    )
}

export default SocialGroup
