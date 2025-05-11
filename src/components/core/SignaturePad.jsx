import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import IsNull from '../common/Common';
import './../css/SignaturePad.css';

function SignaturePad(props) {
    const { sigRef, customClass, labelClass, labelText,
        penColor, clearOnResize, className, onEnd, onClearClick } = props;

    const handleClear = () => {
        sigRef?.current?.clear()
        if (onClearClick !== undefined && onClearClick !== null) {
            onClearClick();
        }
    }
    return (
        <div className={!IsNull(customClass) ? customClass : "customInput"}>
            <label className={(labelClass ?? '') + " signatureLabel"}>
                {labelText ?? "Signatures"}
            </label>
            <SignatureCanvas
                ref={sigRef}
                onEnd={onEnd}
                penColor={penColor ?? 'black'}
                clearOnResize={clearOnResize ?? false}
                canvasProps={{
                    className: (className ?? '') + " signatureCanvas"
                }} />
            <div className="flex justify-right text-right float-right">
                <FontAwesomeIcon onClick={handleClear} icon={faEraser} className="eraseIcon" />
            </div>
        </div>
    )
}

export default SignaturePad;