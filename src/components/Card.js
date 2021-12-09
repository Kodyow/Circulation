import React from 'react'

export const Card = ({className}) => {
    return (
            <div className={`${className} card text-white bg-secondary mb-3`} >
                <div className="card-header">Header</div>
                <div className="card-body">
                    <h4 className="card-title">Secondary card title</h4>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>

    )
}
