import React, { useState, useEffect, componentDidMount} from 'react';
import { Link } from 'react-router-dom';
import './Table.css'
export const Table = ({columns,query}) => {

    
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
                        query.map((element, index)=>
                            <Link to={`/groups/${element.ID}`}>
                                <tr key={element.ID}>
                                    {
                                        renderColumns(element)
                                    }
                                </tr>
                            </Link>

                        )                        
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




