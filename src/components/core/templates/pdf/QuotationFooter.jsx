import { Image, Text, View } from '@react-pdf/renderer';
import { QuotationStyles } from "./QuotationStyles";

function QuotationFooter({ quotationData }) {
    const siteNotes = quotationData?.serviceDetail?.siteNotes ?? "";
    const salesRepSign = quotationData?.salesRepSign;
    const clientSign = quotationData?.clientSign;

    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 70 }}>
                <View style={{ maxWidth: 400 }}>
                    {siteNotes ? (
                        <>
                            <Text style={QuotationStyles.serviceDetailTitle}>Sales Notes:</Text>
                            <Text style={QuotationStyles.serviceDetail}>{siteNotes}</Text>
                        </>
                    ) : null}
                </View>
            </View>

            <View style={QuotationStyles.titleContainer}>
                <View style={QuotationStyles.footerSpaceBetween}>
                    <View style={{ maxWidth: 200, marginTop: 20 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>Sales Representative Sign:</Text>
                        {salesRepSign ? (
                            <Image style={QuotationStyles.logo} src={salesRepSign} />
                        ) : null}
                    </View>
                    <View style={{ maxWidth: 200, marginTop: 20 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>Client Sign:</Text>
                        {clientSign ? (
                            <Image style={QuotationStyles.logo} src={clientSign} />
                        ) : null}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default QuotationFooter;