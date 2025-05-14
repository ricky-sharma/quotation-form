import { Text, View } from '@react-pdf/renderer';
import { QuotationStyles } from "./QuotationStyles";

function QuotationServiceDetail({ quotationData }) {
    const { salesRep, systemSelection, installationType } = quotationData?.serviceDetail || {};

    const renderField = (label, value) => {
        if (!value) return null;

        return (
            <View style={QuotationStyles.serviceDetailContainer}>
                <View style={QuotationStyles.serviceDetailSpaceBetween}>
                    <View style={{ maxWidth: 200 }}>
                        <Text style={QuotationStyles.serviceDetailTitle}>{label}</Text>
                    </View>
                    <Text style={QuotationStyles.serviceDetail}>{value}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ marginTop: 30 }}>
            {renderField('Sales Representative:', salesRep)}
            {renderField('System Selection:', systemSelection)}
            {renderField('Installation Type:', installationType)}
        </View>
    );
}

export default QuotationServiceDetail;