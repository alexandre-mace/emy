import React from 'react';
import {TextRow, RectShape} from 'react-placeholder/lib/placeholders';

export default(
    <div className='w-100'>
        <RectShape color='orangered' style={{width: '100%', height: 80, marginBottom: 30}}/>
        
        {[...Array(6)].map((x, i) =>
        <TextRow color='#EDEDED' style={{height: 33}} key={i}/>
        )}
    </div>
);

