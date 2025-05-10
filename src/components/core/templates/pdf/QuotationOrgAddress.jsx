import { Text, View } from '@react-pdf/renderer';
import { OrganisationAddressCity, OrganisationAddressLine1, OrganisationAddressState } from "../../../../Constants";
import { QuotationStyles } from "./QuotationStyles";

function QuotationOrgAddress(props) {
    const { quotationData } = props;
    return (
        <View style={QuotationStyles.titleContainer}>
            <View style={QuotationStyles.spaceBetween}>
                <View>
                    <Text style={QuotationStyles.quotation}>
                        Quotation
                    </Text>
                    <Text style={QuotationStyles.quotationNumber}>
                        Quotation number: {quotationData?.quotationNo ?? "[Quotation Number]"}
                    </Text>
                </View>
                <View>
                    <Text style={QuotationStyles.orgDetailTitle}>
                        {OrganisationAddressLine1}
                    </Text>
                    <Text style={QuotationStyles.orgDetailTitle}>
                        {OrganisationAddressCity}
                    </Text>
                    <Text style={QuotationStyles.orgDetailTitle}>
                        {OrganisationAddressState}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default QuotationOrgAddress