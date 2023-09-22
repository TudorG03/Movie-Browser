import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function Loading() {
    return(
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ClipLoader color={'#fff'} size={100} />
        </div>
    );
}
