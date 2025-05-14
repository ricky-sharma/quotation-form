import { Text, View } from '@react-pdf/renderer';
import {
    OrganisationAddressCity,
    OrganisationAddressLine1,
    OrganisationAddressState
} from "../../../../Constants";
import { QuotationStyles } from "./QuotationStyles";

function QuotationOrgAddress({ quotationData }) {
    const quotationNo = quotationData?.quotationNo ?? 'N/A';
    const line1 = OrganisationAddressLine1 || ' ';
    const city = OrganisationAddressCity || ' ';
    const state = OrganisationAddressState || ' ';

    return (
        <View style={QuotationStyles.titleContainer}>
            <View style={QuotationStyles.spaceBetween}>
                <View>
                    <Text style={QuotationStyles.quotation}>Quotation</Text>
                    <Text style={QuotationStyles.quotationNumber}>
                        Quotation number: {quotationNo}
                    </Text>
                </View>
                <View>
                    <Text style={QuotationStyles.orgDetailTitle}>{line1}</Text>
                    <Text style={QuotationStyles.orgDetailTitle}>{city}</Text>
                    <Text style={QuotationStyles.orgDetailTitle}>{state}</Text>
                </View>
            </View>
        </View>
    );
}

export default QuotationOrgAddress;