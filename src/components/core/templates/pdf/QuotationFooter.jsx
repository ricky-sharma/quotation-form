import { Image, Text, View } from '@react-pdf/renderer';
import { QuotationStyles } from "./QuotationStyles";

function QuotationFooter(props) {
    const { quotationData } = props;
    return (
        <>
            <View style={{ flexDirection: 'row', marginTop: 70 }}>
                <View style={{ maxWidth: 400 }}>
                    <Text style={QuotationStyles.serviceDetailTitle}>
                        {quotationData?.serviceDetail?.siteNotes ? 'Sales Notes:' : ''}
                    </Text>
                    <Text style={QuotationStyles.serviceDetail}>
                        {quotationData?.serviceDetail?.siteNotes ?? ""}
                    </Text>
                </View>
            </View>
            <View style={QuotationStyles.titleContainer}>
                <View style={QuotationStyles.footerSpaceBetween}>
                    <View style={{ maxWidth: 200, marginTop: 20 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>
                            Sales Representative Sign:
                        </Text>
                        {quotationData?.salesRepSign !== null && quotationData?.salesRepSign !== undefined
                            && quotationData?.salesRepSign !== "" ?
                            <Image style={QuotationStyles.logo} src={quotationData?.salesRepSign} />
                            :''}
                    </View>
                    <View style={{ maxWidth: 200, marginTop: 20 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>
                            Client Sign:
                        </Text>
                        {quotationData?.clientSign !== null && quotationData?.clientSign !== undefined
                            && quotationData?.clientSign !== "" ?
                            <Image style={QuotationStyles.logo} src={quotationData?.clientSign} />
                            : ''}
                    </View>
                </View>
            </View>
        </>
    )
}

export default QuotationFooter;