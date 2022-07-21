import React, { useEffect } from 'react';

const RemoveCards = () => {
    useEffect(() => {
        remove();
    });

    const remove = () => {
        
        // setTimeout(function() {
            let nombres;
            nombres = document.querySelectorAll('.vtex-rich-text-0-x-heading--persoanje-indiv');
            console.log("---------------------------------------------------------------------------------------")
            for( let i = 0; i < nombres.length; i++ ) {
                console.log(nombres.length);
                if( nombres[i].innerHTML === "Nombre" ) {
                    nombres[i].parentNode?.parentNode?.parentNode?.parentNode?.parentElement?.remove();
                }
                else {
                    let x = nombres[i].parentNode?.parentNode?.parentNode?.parentNode?.parentElement as HTMLElement;
                    x.style.display = "block";
                }
            }

            console.log("---------------------------------------------------------------------------------------")
        // }, 5000);
    }

    return (
        <>
        </>
    );
}

export default RemoveCards;