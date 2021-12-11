import React, {useEffect,useState}from 'react'
import Axios from 'axios';
import { useParams,useNavigate } from 'react-router'
import { Table } from './Table'
import './SocialGroup.css'
import { format } from 'date-fns';


const SocialGroup = () => {
    const navigate = useNavigate();
    const handleOnClick = (id) => {
        navigate(`/profile/${id}`);
    }

    const {id} = useParams();
    const [userRole, setUserRole] = useState("");
    const [eventInfo, setEventInfo] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [data, setData] = useState([]);
    const [columns, setcolumns] = useState(["User", "Role"]);
    useEffect(() => {
        Axios.get(`http://localhost:5000/event/${id}`).then((response) => {
            setEventInfo(response.data);
            setData(response.data[0]);
            setStart(format(new Date(response.data[0].Sdate),`dd/MM/yyyy`));
            setEnd(format(new Date(response.data[0].Edate),`dd/MM/yyyy`));
            console.log(response.data);
        });;
    }, []);

    return (
        <div className ="container group-profile">
            <h1>Event</h1>
            <div>
                <div className="card mb-3">
                <h3 className="card-header">Event Name: {data.Ename}</h3>
                <div className="card-body">
                    <h5 className="card-title">My Name: {data.Details}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Location: {data.Location}</li>
                    <li className="list-group-item">Start Date: {start}</li>
                    <li className="list-group-item">End Date: {end}</li>
                    <li className="list-group-item">Repeats: {data.rep}</li>
                    <li className="list-group-item">Hosts Name: {data.Hname}</li>
                </ul>
                </div>
            </div>
            <div className="form-group">
            <table className="table table-hover">
                    <thead>
                        <tr className="table-primary">
                            {
                                columns.map((element,i)=>
                                    <th scope="col" key={i}>{element}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                              eventInfo?
                              eventInfo.map((element, index)=>
                                        <tr key={element.ID} onClick={ (event) => handleOnClick(element.ID)}>  
                                                <td>{element.Uname}</td>
                                                <td>{element.role}</td>
                                        </tr>

                                )  : <></>                      
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SocialGroup
