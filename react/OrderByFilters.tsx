import React, { useEffect } from "react";

const OrderByFilters = () => {
    useEffect(() => {
        const orderElement = document.getElementsByClassName("vtex-search-result-3-x-orderByOptionsContainer")[0] as HTMLElement;
        console.log('//////////////////////////////////////////');
        console.log(orderElement);
        console.log('//////////////////////////////////////////');
        const opcion0 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[0] as HTMLElement;
        const opcion1 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[1] as HTMLElement;
        const opcion2 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[2] as HTMLElement;
        const opcion3 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[3] as HTMLElement;
        const opcion4 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[4] as HTMLElement;
        const opcion5 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[5] as HTMLElement;
        const opcion6 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[6] as HTMLElement;
        const opcion7 = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem")[7] as HTMLElement;
        orderElement.append(opcion0);
        orderElement.append(opcion5);
        orderElement.append(opcion4);
        orderElement.append(opcion3);
        orderElement.append(opcion6);
        orderElement.append(opcion7);
        orderElement.append(opcion2);
        orderElement.append(opcion1);


        // let opciones = orderElement.getElementsByClassName("vtex-search-result-3-x-orderByOptionItem");
        // const order = [0,5,4,3,6,7,2,1];
        // for(let i = 0; i < opciones.length; i++) {;
        //     orderElement.append(opciones[order[i]]);
        // }

    }, []);

    return (
        <>
        </>
    );
}

export default OrderByFilters;