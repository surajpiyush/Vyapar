import React from 'react';
import { JsonIconOutline } from '../../assets/Icons/ReactIcons';

function JSONDownloadButton({ data }) {
    const downloadJSON = () => {
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <button onClick={downloadJSON}><JsonIconOutline fontSize="30px" color='#fcc603'/></button>
        </div>
    );
}

export default JSONDownloadButton;
