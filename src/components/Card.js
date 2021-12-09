import React from 'react'

export const Card = ({className}) => {
    return (
            <div class={`${className} card text-white bg-secondary mb-3`} >
                <div class="card-header">Tag/GroupLink</div>
                <div class="card-body">
                    <h4 class="card-title">Name of Group</h4>
                    <p class="card-text">About group</p>
                </div>
            </div>

    )
}
