import React from 'react'
import { Card } from './Card'

export const GroupList = ({myHeader, className, cardClassName}) => {
    return (
        <>
            <h2>{myHeader}</h2>
            <div className={className}>
                <Card className={cardClassName}/>
                <Card className={cardClassName}/>
                <Card className={cardClassName}/>
                <Card className={cardClassName}/>
                <Card className={cardClassName}/>
                <Card className={cardClassName}/>
            </div>
        </>
    )
}
