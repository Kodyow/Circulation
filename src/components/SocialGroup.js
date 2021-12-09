import React, {useEffect,useState}from 'react'
import Axios from 'axios';
import { useParams } from 'react-router'
import './SocialGroup.css'
import Dropdown from './Dropdown'

const SocialGroup = () => {
    const {id} = useParams();
    const [data, setData] = useState();
    // useEffect(() => {
    //     Axios.get(`http://localhost:5000/groups/${id}`).then((response) => {
    //         setData(response.data);
    //         console.log(response);
    //     });;
    // }, []);

    // const viewMember = (event) => {
    //     Axios.post("http://localhost:5000/groups/${id}").then((response)=> {
    //         console.log(response);
    //     });
    // }
    return (
        <div className ="container group-profile">
            <h1>Group</h1>
            <div class='card border-success mb-3 group-desc'>
                <div class="card-header">Header</div>
                <div class="card-body">
                    <h4 class="card-title">Success card title</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            <Dropdown/>
        </div>
    )
}

export default SocialGroup
