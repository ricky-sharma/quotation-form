import { Text, View } from '@react-pdf/renderer';
import { QuotationStyles } from './QuotationStyles';

function QuotationUserAddress(props) {
    const { quotationData } = props;
    return (
        <View style={QuotationStyles.titleContainer}>
            <View style={QuotationStyles.spaceBetween}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={QuotationStyles.clientDetailTitle}>Bill to </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {quotationData?.clientDetail?.name ?? "[Client Name]"}
                    </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {quotationData?.clientDetail?.address ?? "[Client Address]"}
                    </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {quotationData?.clientDetail?.phone ?? ""}
                    </Text>
                    <Text style={QuotationStyles.clientDetail}>
                        {quotationData?.clientDetail?.emailAddress ?? ""}
                    </Text>
                </View>
                <Text style={QuotationStyles.clientDetailTitle}>
                    {`Date: ${quotationData?.currentDate}`}
                </Text>
            </View>
        </View>
    );
}

export default QuotationUserAddress