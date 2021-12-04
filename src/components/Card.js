import React from 'react'

export const Card = ({className}) => {
    return (
            <div class={`${className} card text-white bg-secondary mb-3`} >
                <div class="card-header">Header</div>
                <div class="card-body">
                    <h4 class="card-title">Secondary card title</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>

    )
}
