import { usePDF } from '@react-pdf/renderer';
import { saveAs } from "file-saver";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { InstallationTypeOptions, OrganizationName, SalesRepresentativeOptions, SystemSelectionOptions } from "../../Constants";
import { setQuotationData } from "../../redux/reducers/quotationSlice";
import { GetCurrentDate } from "../common/Common";
import Input from "../core/Input";
import { QuotationDocument } from "../core/templates/pdf/Quotation";
import { Item1 } from './../../Constants';
import SignaturePad from './../core/SignaturePad';

function QuotationForm() {
    const quotationDataRx = useSelector(state => state.quotationData);
    const [nameClient, setNameClient] = useState(quotationDataRx?.clientDetail?.name ?? '')
    const [addressClient, setAddressClient] = useState(quotationDataRx?.clientDetail?.address ?? '')
    const [phoneClient, setPhoneClient] = useState(quotationDataRx?.clientDetail?.phone ?? '')
    const [emailAddressClient, setEmailAddressClient] = useState(quotationDataRx?.clientDetail?.emailAddress ?? '')
    const [salesRep, setSalesRep] = useState(quotationDataRx?.serviceDetail?.salesRep ?? '')
    const [systemSelection, setSystemSelection] = useState(quotationDataRx?.serviceDetail?.systemSelection ?? '')
    const [installationType, setInstallationType] = useState(quotationDataRx?.serviceDetail?.installationType ?? '')
    const [quantity, setQuantity] = useState(quotationDataRx?.items?.length > 0 ? parseInt(quotationDataRx?.items[0]?.qty) : 0);
    const [siteNotes, setSiteNotes] = useState(quotationDataRx?.serviceDetail?.siteNotes ?? '')
    const [quotationId] = useState(quotationDataRx?.quotationId ??
        `${Date.now()}${Math.floor(Math.random() * 100)}`);
    const [quotationNo] = useState(quotationDataRx?.quotationNo ??
        `${Date.now().toString().substring(0, 10)}-${Math.floor(Math.random() * 100)}`);
    const [clientSign, setClientSign] = useState(quotationDataRx?.clientSign ?? '')
    const [salesRepSign, setSalesRepSign] = useState(quotationDataRx?.salesRepSign ?? '')
    const [currentDate] = useState(GetCurrentDate('-') ?? '')
    const [pdfFileName, setPdfFileName] = useState(quotationDataRx?.pdfFileName ?? '')
    const [instance, updateInstance] = usePDF({ document: null });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clientSignRef = useRef(null);
    const salesRepSignRef = useRef(null);
    const formRef = useRef(null);
    const buttonTypeRef = useRef(null);
    const clientSignEmptyRef = useRef(true);
    const salesRepSignEmptyRef = useRef(true);

    const quotationData = useMemo(() => ({
        quotationId,
        quotationNo,
        clientSign,
        salesRepSign,
        currentDate,
        pdfFileName,
        clientDetail: {
            name: nameClient,
            phone: phoneClient,
            emailAddress: emailAddressClient,
            address: addressClient,
        },
        serviceDetail: {
            salesRep,
            systemSelection,
            installationType,
            siteNotes
        },
        items: [{ ...Item1, qty: Number(quantity) || 0 }],
    }), [
        quotationId,
        quotationNo,
        clientSign,
        salesRepSign,
        currentDate,
        pdfFileName,
        nameClient,
        phoneClient,
        emailAddressClient,
        addressClient,
        salesRep,
        systemSelection,
        installationType,
        siteNotes,
        quantity
    ]);


    useEffect(() => {
        if (quotationDataRx === '') {
            dispatch(setQuotationData(quotationData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e?.preventDefault()
        e?.currentTarget?.blur()
        buttonTypeRef.current = e?.nativeEvent?.submitter?.getAttribute('id');
        dispatch(setQuotationData(quotationData));
        if (buttonTypeRef?.current === "GeneratePDF") {
            //GeneratePDF
            navigate('/QuotationViewer');
        }
        else if (buttonTypeRef?.current === "SendEmail") {
            //SendEmail
            const newDoc = <QuotationDocument key={'quotationDocument1'} quotationData={quotationData} />;
            updateInstance(newDoc);
        }
    }

    useEffect(() => {
        if (instance?.loading === false && instance?.blob && buttonTypeRef.current === 'SendEmail') {
            // PDF generation is complete
            handleShare();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance?.loading]);


    const handleShare = async () => {
        if (instance?.blob) {
            await saveAs(instance.blob, pdfFileName);
            window.location.href = `mailto:?to=${encodeURIComponent(
                `${emailAddressClient}`
            )}&subject=${encodeURIComponent(`${pdfFileName}`)}&body=${encodeURIComponent(
                `Kindly find attached quotation.`
            )}`;
        }
    };

    useEffect(() => {
        setPdfFileName(`Quotation - ${nameClient} - ${quotationNo}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameClient])

    useEffect(() => {
        if (clientSignEmptyRef.current === true) {
            clientSignRef?.current?.fromDataURL(clientSign)
            clientSignEmptyRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (salesRepSignEmptyRef.current === true) {
            salesRepSignRef?.current?.fromDataURL(salesRepSign)
            salesRepSignEmptyRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCancel = (e) => {
        e?.preventDefault()
        e?.currentTarget?.blur()
        buttonTypeRef.current = e?.target?.getAttribute('data-type');
        setNameClient('')
        setAddressClient('')
        setPhoneClient('')
        setEmailAddressClient('')
        setSalesRep('')
        setSystemSelection('')
        setInstallationType('')
        setQuantity('')
        setSiteNotes('')
        setClientSign('')
        setSalesRepSign('')
        clientSignRef?.current?.clear()
        salesRepSignRef?.current?.clear()
        dispatch(setQuotationData(''));
    }

    return (
        <div className="lg:p-8 lg:px-10 p-2 px-3 lg:mx-25 xl:mx-50 rounded border-gray-200">
            <h2 className="justify-left font-medium text-3xl">{OrganizationName}</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
                <section className="px-10">
                    <p className="text-black-500 text-2xl mt-8">Client Information</p>
                    <div>
                        <div className="mt-8 gap-5">
                            <Input label="Name"
                                value={nameClient}
                                onChange={(e) => { setNameClient(e.target.value) }}
                                onClear={(value) => { setNameClient(value) }}
                                customClass="fullWidth input-select-mui-css"
                                inputLabelClass="text-sm font-medium"
                                required={true}
                                className="bg-gray-100 text-black-700 w-full" />
                        </div>
                        <div className="mt-8 gap-5">
                            <Input label="Address"
                                value={addressClient}
                                onChange={(e) => { setAddressClient(e.target.value) }}
                                onClear={(value) => { setAddressClient(value) }}
                                customClass="fullWidth input-select-mui-css"
                                inputLabelClass="text-sm font-medium"
                                required={true}
                                className="bg-gray-100 text-black-700 w-full" />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <div className="mt-8">
                                <Input label="Phone"
                                    value={phoneClient}
                                    onChange={(e) => { setPhoneClient(e.target.value) }}
                                    onClear={(value) => { setPhoneClient(value) }}
                                    customClass="fullWidth input-select-mui-css"
                                    inputLabelClass="text-sm font-medium"
                                    required={true}
                                    className="bg-gray-100 text-black-700 w-full" />
                            </div>
                            <div className="mt-8">
                                <Input label="Email address"
                                    value={emailAddressClient}
                                    onChange={(e) => { setEmailAddressClient(e.target.value) }}
                                    onClear={(value) => { setEmailAddressClient(value) }}
                                    customClass="fullWidth input-select-mui-css"
                                    inputLabelClass="text-sm font-medium"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    title="Enter a valid email address"
                                    required={true}
                                    className="bg-gray-100 text-black-700 w-full" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-10">
                    <p className="text-black-500 text-2xl pt-5 mt-10">Service Detail</p>
                    <div>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <div className="mt-8">
                                <Input type="select"
                                    value={salesRep}
                                    labelId="salesRep"
                                    label="Sales Representative"
                                    required={true}
                                    options={SalesRepresentativeOptions}
                                    customClass="fullWidth input-select-mui-css"
                                    className="bg-gray-100 text-black-700 w-full"
                                    inputLabelClass="text-sm font-medium"
                                    onChange={(e) => { setSalesRep(e.target.value) }} />
                            </div>
                            <div className="mt-8">
                                <Input type="select"
                                    value={systemSelection}
                                    labelId="systemSelection"
                                    label="System Selection"
                                    options={SystemSelectionOptions}
                                    customClass="fullWidth input-select-mui-css"
                                    className="bg-gray-100 text-black-700 w-full"
                                    inputLabelClass="text-sm font-medium"
                                    onChange={(e) => { setSystemSelection(e.target.value) }} />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <div className="mt-8">
                                <Input type="select"
                                    value={installationType}
                                    labelId="installationType"
                                    label="InstallationType"
                                    options={InstallationTypeOptions}
                                    customClass="fullWidth input-select-mui-css"
                                    className="bg-gray-100 text-black-700 w-full"
                                    inputLabelClass="text-sm font-medium"
                                    onChange={(e) => { setInstallationType(e.target.value) }} />
                            </div>
                            <div className="mt-8">
                                <Input label="Quantity"
                                    value={quantity}
                                    required={true}
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                    onClear={(value) => { setQuantity(value) }}
                                    customClass="fullWidth input-select-mui-css"
                                    dataType="number"
                                    inputLabelClass="text-sm font-medium"
                                    className="bg-gray-100 text-black-700 w-full" />
                            </div>
                        </div>
                        <div className="mt-8 gap-5">
                            <div>
                                <Input label="Site Notes"
                                    type="textarea"
                                    value={siteNotes}
                                    onChange={(e) => { setSiteNotes(e.target.value) }}
                                    onClear={(value) => { setSiteNotes(value) }}
                                    customClass="fullWidth"
                                    inputLabelClass="text-sm font-medium"
                                    className="bg-gray-100 text-black-700 w-full" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-8">
                    <div>
                        <div className="grid lg:grid-cols-2 gap-3">
                            <div className="mt-8 text-center flex flex-wrap justify-center">
                                <SignaturePad
                                    signRef={salesRepSignRef}
                                    onEnd={() => {
                                        setSalesRepSign(salesRepSignRef?.current?.toDataURL('image/png'))
                                    }}
                                    labelText="Sales Representative Sign"
                                    labelClass="flex text-left"
                                    customClass="!w-49/50"
                                    onClearClick={() => {
                                        setSalesRepSign('');
                                    }}
                                    className="bg-gray-100 text-black-700 w-full rounded" />
                            </div>
                            <div className="mt-8 text-center flex flex-wrap justify-center">
                                <SignaturePad
                                    signRef={clientSignRef}
                                    onEnd={() => {
                                        setClientSign(clientSignRef?.current?.toDataURL('image/png'))
                                    }}
                                    labelText="Client Sign"
                                    labelClass="flex text-left"
                                    customClass="!w-49/50"
                                    onClearClick={() => {
                                        setClientSign('');
                                    }}
                                    className="bg-gray-100 text-black-700 w-full rounded" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-8">
                    <div className="grid lg:grid-cols-3 my-10 gap-3 flex justify-right float-right">
                        <button
                            data-type="GeneratePDF"
                            name="Generate PDF"
                            id="GeneratePDF"
                            type="submit"
                            className="py-1 my-1 px-4 !bg-gray-900 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 buttonCss buttonfont">
                            Generate PDF
                        </button>
                        <button
                            data-type="SendEmail"
                            name="Send Email"
                            id="SendEmail"
                            type="submit"
                            className="py-1 my-1 px-4 !bg-gray-900 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 buttonCss buttonfont">
                            Send Email
                        </button>
                        <button
                            data-type="Cancel"
                            onClick={handleCancel}
                            className="py-1 my-1 px-4 !bg-gray-900 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 buttonCss buttonfont">
                            Cancel
                        </button>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default QuotationForm;