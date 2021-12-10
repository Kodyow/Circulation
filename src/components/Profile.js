import React, {useEffect,useState}from 'react'
import Axios from 'axios';
import {useParams} from 'react-router-dom'
import person from '../resources/person.png'
import './Profile.css'
const Profile = () => {
    const {id} = useParams();
    const [first, setFirst] = useState([]);
    const [data, setData] = useState([]);
    // const [rep, setRep] = useState([]);

    // useEffect(() => {
    //     Axios.post(`http://localhost:5000/profile/${id}`).then((response) => {
    //         setRep(response.data);
    //         console.log(response);
    //     });;
    // }, []);

    useEffect(() => {
        Axios.get(`http://localhost:5000/profile/${id}`).then((response) => {
            setData(response.data);
            setFirst(response.data[0]);
        });;
    }, []);
    return (
        <div className="container">
            <div>
                <div class="card mb-3">
                <h3 class="card-header">User ID: {first.ID}</h3>
                <div class="card-body">
                    <h5 class="card-title">My Name: {first.Name}</h5>
                </div>
                <div class="card-body">
                    <img
                    src={person}
                    alt="Profile Image Not Avaliable"
                    height="450"
                    width="370" 
                    className="user-image"/>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Email: {first.Email}</li>
                    <li class="list-group-item">Phone Number: {first.Phone}</li>
                    <li class="list-group-item">Joined: {first.Date}</li>
                </ul>
                </div>
            </div>
            <h3>Greater Then Average Reputation</h3>
            <table className="table table-hover">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Group Name</th>
                        <th scope="col">Reputation</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            data.map((element, index)=>
                                    <tr key={element.GroupID}>
                                        <td>{element.GroupNM}</td>
                                        <td>{element.Reputation}</td>
                                    </tr>

                            )                        
                        }
                </tbody>
            </table>    
 
        </div>
    )
}

export default Profile