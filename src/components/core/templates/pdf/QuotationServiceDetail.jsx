import { Text, View } from '@react-pdf/renderer';
import { QuotationStyles } from "./QuotationStyles";

function QuotationServiceDetail(props) {
    const { quotationData } = props;

    return (
        <>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <View style={QuotationStyles.serviceDetailSpaceBetween}>
                    <View style={{ maxWidth: 200 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>
                            {quotationData?.serviceDetail?.salesRep ? 'Sales Representative:' : ''}
                        </Text>
                    </View>
                    <Text style={QuotationStyles.serviceDetail}>
                        {quotationData?.serviceDetail?.salesRep ?? ""}
                    </Text>
                </View>
            </View>
            <View style={QuotationStyles.serviceDetailContainer}>
                <View style={QuotationStyles.serviceDetailSpaceBetween}>
                    <View style={{ maxWidth: 200 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>
                            {quotationData?.serviceDetail?.systemSelection ? 'System Selection:' : ''}
                        </Text>
                    </View>
                    <Text style={QuotationStyles.serviceDetail}>
                        {quotationData?.serviceDetail?.systemSelection ?? ""}
                    </Text>
                </View>
            </View>
            <View style={QuotationStyles.serviceDetailContainer}>
                <View style={QuotationStyles.serviceDetailSpaceBetween}>
                    <View style={{ maxWidth: 200 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>
                            {quotationData?.serviceDetail?.installationType ? 'Installation Type:' : ''}
                        </Text>
                    </View>
                    <Text style={QuotationStyles.serviceDetail}>
                        {quotationData?.serviceDetail?.installationType ?? ""}
                    </Text>
                </View>
            </View>
        </>
    )
}

export default QuotationServiceDetail;