import React from 'react'
import { Card } from './Card'

export const GroupList = ({cardClassName}) => {
    return (
        <>
            
            <Card className={cardClassName}/>
            <Card className={cardClassName}/>
            <Card className={cardClassName}/>
            <Card className={cardClassName}/>
            <Card className={cardClassName}/>
            <Card className={cardClassName}/>
        </>
    )
}
