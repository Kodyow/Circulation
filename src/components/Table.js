import React, { useState, useEffect, componentDidMount} from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css'
export const Table = ({columns,query,path}) => {
    const navigate = useNavigate();
    const handleOnClick = (id) => {
        navigate(`/${path}/${id}`);
    }
    
    return (
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
                        query?
                        query.map((element, index)=>
                                <tr key={element.ID} onClick={ (event) => handleOnClick(element.ID)}>
                                    {
                                        renderColumns(element)
                                    }
                                </tr>

                        )          
                        : <></>                
                    }
            </tbody>
        </table>
    )
}

function renderColumns(elements) {
    const rowList = [];
    for (var key in elements) {
        rowList.push(<td key={key}>{elements[key]}</td>);
    }
    return rowList;
}




