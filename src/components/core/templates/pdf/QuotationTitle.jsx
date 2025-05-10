import { Image, Text, View } from '@react-pdf/renderer';
import { OrganizationName } from '../../../../Constants';
import logo from './../../../../assets/logo.png';
import { QuotationStyles } from './QuotationStyles';

function QuotationTitle() {
    return (
        <View style={QuotationStyles.titleContainer}>
            <View style={QuotationStyles.spaceBetween}>
                <Image style={QuotationStyles.logo} src={logo} />
                <Text style={QuotationStyles.reportTitle}>{OrganizationName}</Text>
            </View>
        </View>
    )
}

export default QuotationTitle