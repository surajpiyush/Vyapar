import React from 'react';

const formatNumber = (number) => {
    if (number >= 10000000000) {
        return (number / 10000000000)?.toFixed(2) + ' B';
    } else if (number >= 1000000000) {
        return (number / 1000000000)?.toFixed(2) + ' Cr';
    } else if (number >= 10000000) {
        return (number / 10000000)?.toFixed(2) + ' M';
    } else if (number >= 100000) {
        return (number / 100000)?.toFixed(2) + ' L';
    } else if (number >= 1000) {
        return (number / 1000)?.toFixed(2) + ' K';
    } else {
        return number?.toFixed(2);
    }
}


const SalePriceComponent = ({ salePrice }) => {
    const formattedPrice = formatNumber(salePrice);

    return (
        <div style={{fontWeight:"bold"}}>
           ₹ { formattedPrice} 
        </div>
    );
}

export default SalePriceComponent;
