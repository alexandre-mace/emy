import React from 'react';
import {TextRow} from 'react-placeholder/lib/placeholders';

export default(
    <div className='w-100'>
        {[...Array(6)].map((x, i) =>
            <TextRow color='#EDEDED' style={{height: 33}} key={i}/>
        )}
    </div>
);

