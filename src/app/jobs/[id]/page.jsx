import { getJobById } from '@/lib/api/jobs';
import React from 'react';

const DetailsJobPage = async({ params }) => {

    const { id } = await params;
    const job = await getJobById(id);
    console.log("Job details:", job);
    return (
        <div>
            <h1>Job Details Page</h1>
            <p>Job ID: {id}</p>
           <p>{job?.title}</p>
           <p>{job?.description}</p>
        </div>
    );
};

export default DetailsJobPage;