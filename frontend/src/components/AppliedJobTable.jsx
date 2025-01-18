// export default AppliedJobTable;
/* eslint-disable no-unused-vars */
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
//import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  //  const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied Scholarships</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Scholarship</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                 [1,2].map((item,index) => {
                    return(
                     <TableRow key={index}>
                       <TableCell>09-01-2025</TableCell>
                        <TableCell>Indira Gandhi Scholarship</TableCell>
                        <TableCell>50000</TableCell>
                       <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                    </TableRow>
                    );
                 })
                 }
             </TableBody>
         </Table>
    </div>
  )
}

export default AppliedJobTable