import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Quotation from '../core/templates/pdf/Quotation';

function QuotationViewer() {
    const quotationData = useSelector(state => state?.quotationData);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }
    const handleSendEmail = () => {

    }
    return (
        <div>
            <div className="top-0 flex justify-right float-right z-100 m-1 p-0 text-white">
                <button
                    onClick={handleSendEmail}
                    className="m-1 p-0 h-9 lg:w-28 w-23 text-white rounded !bg-gray-900 !text-xs hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 buttonfont">
                    Send Email
                </button>
                <button
                    onClick={handleBack}
                    className="m-1 p-0 h-9 lg:w-24 w-14 text-white rounded !bg-gray-900 !text-xs hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 buttonfont">
                    Back
                </button>
            </div>
            <Quotation className="m-0 p-0" quotationData={quotationData} />
        </div>
    );
}

export default QuotationViewer;