import { BlobProvider } from '@react-pdf/renderer';
import { saveAs } from "file-saver";
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Quotation, { QuotationDocument } from '../core/templates/pdf/Quotation';

function QuotationViewer() {
    const quotationData = useSelector(state => state?.quotationData);
    const quotationDocument = <QuotationDocument key={'quotationDocument1'} quotationData={quotationData} />;
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }
    const handleShare = async (e, blob) => {
        e?.preventDefault()
        e?.currentTarget?.blur()
        console.log(quotationDocument)
        console.log(blob)
        if (blob) {
            await saveAs(blob, quotationData?.pdfFileName);
            window.location.href = `mailto:?to=${encodeURIComponent(
                `${quotationData?.clientDetail?.emailAddressClient}`
            )}&subject=${encodeURIComponent(`${quotationData?.pdfFileName}`)}&body=${encodeURIComponent(
                `Kindly find attached quotation.`
            )}`;
        }
    }

    return (
        <div>
            <div className="top-0 flex justify-right float-right z-100 m-1 p-0 text-white">
                <BlobProvider document={quotationDocument}>
                    {({ blob }) => (
                        <button
                            onClick={(e) => handleShare(e, blob)}
                            className="m-1 p-0 h-9 lg:w-28 w-23 text-white rounded !bg-gray-900 !text-xs hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 buttonfont">
                            Share
                        </button>)}
                </BlobProvider>
                <button
                    onClick={handleBack}
                    className="m-1 p-0 h-9 lg:w-24 w-14 text-white rounded !bg-gray-900 !text-xs hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 buttonfont">
                    Back
                </button>
            </div>
            <Quotation key={'quotation1'} className="m-0 p-0" quotationData={quotationData} />
        </div>
    );
}

export default QuotationViewer;