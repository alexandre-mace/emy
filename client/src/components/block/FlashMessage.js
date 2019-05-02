import React, { Component } from 'react';
import { useAlert } from 'react-alert'


const FlashMessage = () => {
    const alert = useAlert();

    return (
        alert.show('Génial, le produit vient tout juste d\'être ajouté !', {
            timeout: 200000, // custom timeout just for this one alert
            type: 'success',
        })
    )
}

export default FlashMessage
