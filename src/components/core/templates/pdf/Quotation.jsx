import { Document, PDFViewer, Page } from '@react-pdf/renderer';
import React from 'react';
import QuotationFooter from './QuotationFooter';
import QuotationItems from './QuotationItems';
import QuotationOrgAddress from './QuotationOrgAddress';
import QuotationServiceDetail from './QuotationServiceDetail';
import { QuotationStyles } from './QuotationStyles';
import QuotationTitle from './QuotationTitle';
import QuotationUserAddress from './QuotationUserAddress';

function Quotation(props) {
    const { quotationData } = props;
    return (
        quotationData ? (
            <PDFViewer
                key={quotationData?.quotationId ?? 'viewer'}
                className="p-0 m-0 xl:h-170 h-150 w-full"
                title={quotationData?.pdfFileName}
            >
                <QuotationDocument {...props} />
            </PDFViewer >) :
            (
                <QuotationEmpty />
            )
    );
}

export default Quotation;

export function QuotationEmpty() {
    return (
        <Document PageMode='fullScreen'>
            <Page size="A4" style={QuotationStyles.page} />
        </Document>
    );
}

export function QuotationDocument(props) {
    const { quotationData } = props;
    return (
        <Document PageMode='fullScreen' title={quotationData.pdfFileName}>
            <Page size="A4" style={QuotationStyles.page}>
                <QuotationTitle quotationData={quotationData} />
                <QuotationOrgAddress quotationData={quotationData} />
                <QuotationUserAddress quotationData={quotationData} />
                <QuotationServiceDetail quotationData={quotationData} />
                <QuotationItems quotationData={quotationData} />
                <QuotationFooter quotationData={quotationData} />
            </Page>
        </Document>
    )
}