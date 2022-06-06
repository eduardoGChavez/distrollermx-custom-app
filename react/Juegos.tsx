import React, { useEffect } from "react";

const Juegos = () => {
    useEffect(() => {
        // const orderElement = document.getElementsByTagName("html")[0] as HTMLElement;
        // console.log('//////////////////////////////////////////');
        // console.log(orderElement);
        // console.log('//////////////////////////////////////////');
    }, []);

    return (
        <>
            <iframe src="https://juegosdistroller.vicom.mx/ksi-mision-espacial/ksi-mision-espacial.php"></iframe>
        </>
    );
}

export default Juegos;