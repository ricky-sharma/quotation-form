import { Text, View } from '@react-pdf/renderer';
import { QuotationStyles } from './QuotationStyles';

function QuotationUserAddress(props) {
    const { quotationData } = props;

    // Handle case where quotationData might be undefined or null
    if (!quotationData) {
        return (
            <View style={QuotationStyles.titleContainer}>
                <Text style={QuotationStyles.clientDetail}>Quotation data is missing.</Text>
            </View>
        );
    }
    const { clientDetail, currentDate } = quotationData;
    return (
        <View style={QuotationStyles.titleContainer}>
            <View style={QuotationStyles.spaceBetween}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={QuotationStyles.clientDetailTitle}>Bill to </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {clientDetail?.name ?? " "}
                    </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {clientDetail?.address ?? " "}
                    </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {clientDetail?.phone ?? " "}
                    </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {clientDetail?.emailAddress ?? " "}
                    </Text>
                </View>
                <Text style={QuotationStyles.clientDetailTitle}>
                    {`Date: ${currentDate ?? " "}`}
                </Text>
            </View>
        </View>
    );
}

export default QuotationUserAddress;