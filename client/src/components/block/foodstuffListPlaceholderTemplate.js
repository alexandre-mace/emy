import React from 'react';
import {TextRow, RectShape, MediaBlock} from 'react-placeholder/lib/placeholders';

export default(
    <div className='w-100 foodstuff-item-placeholder mt-4'>
        {[...Array(4)].map((x, i) =>
            <MediaBlock color='#D6D6D6' style={{width: '95%', height: 100, margin: '0 auto', marginBottom: 30}} key={i} rows={4} />
        )}
    </div>
);

