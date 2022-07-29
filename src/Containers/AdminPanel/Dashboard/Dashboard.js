import React from 'react'
import { SimpleHeading } from '../../../Components/common/Heading'
import { SimpleParagraph } from '../../../Components/common/Paragraph'

const Dashboard = () => {
  return (
    <div>
        <SimpleHeading heading={"What's New"} size={18}/>
        <SimpleParagraph paragraph={"Display Graph of Requests, Listings etc"} size={16}/>
    </div>
  )
}

export default Dashboard