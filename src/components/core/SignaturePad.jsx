import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './../css/SignaturePad.css';

function SignaturePad(props) {
    const {
        signRef,
        customClass = "customInput",  // Default class if not provided
        labelClass = "",
        labelText = "Signatures",  // Default label text
        penColor = 'black',  // Default pen color
        clearOnResize = false,  // Default behavior for clearOnResize
        className = "",  // Default class for canvas
        onEnd,
        onClearClick
    } = props;

    const handleClear = () => {
        console.log("Clearing canvas...");
        // Clear the signature canvas
        signRef?.current?.clear();

        // Trigger the onClearClick callback if provided
        if (onClearClick) {
            console.log("Triggering onClearClick callback...");
            onClearClick();
        }
    };

    return (
        <div className={customClass}>
            <label className={`${labelClass} signatureLabel`}>
                {labelText}
            </label>
            <SignatureCanvas
                ref={signRef}
                onEnd={onEnd}
                penColor={penColor}
                clearOnResize={clearOnResize}
                canvasProps={{
                    className: `${className} signatureCanvas`
                }}
            />
            <div className="flex justify-right text-right float-right">
                <FontAwesomeIcon
                    onClick={handleClear}
                    icon={faEraser}
                    className="eraseIcon"
                />
            </div>
        </div>
    );
}

export default SignaturePad;
