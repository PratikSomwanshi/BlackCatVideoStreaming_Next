"use client";

import React from "react";
import { ImSpinner10 } from "react-icons/im";

function LoadingSpinnerLocal({ size }: { size: number }) {
    return (
        <div className="flex justify-center items-center animate-spin">
            <ImSpinner10 size={size} />
        </div>
    );
}

export default LoadingSpinnerLocal;
