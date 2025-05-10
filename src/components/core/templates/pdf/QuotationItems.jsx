import { Text, View } from '@react-pdf/renderer';
import { Fragment } from 'react';
import { QuotationStyles } from "./QuotationStyles";

function QuotationItems(props) {
    const { quotationData } = props;

    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 40 }}>
            <View style={[QuotationStyles.theader, QuotationStyles.theader2]}>
                <Text >Items</Text>
            </View>
            <View style={QuotationStyles.theader}>
                <Text>Price</Text>
            </View>
            <View style={QuotationStyles.theader}>
                <Text>Qty</Text>
            </View>
            <View style={QuotationStyles.theader}>
                <Text>Amount</Text>
            </View>
        </View>
    );

    const TableBody = () => (
        quotationData?.items?.map((item) => (
            <Fragment key={Math.random()}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={[QuotationStyles.tbody, QuotationStyles.tbody2]}>
                        <Text >{item?.desc}</Text>
                    </View>
                    <View style={QuotationStyles.tbody}>
                        <Text>{item?.price} </Text>
                    </View>
                    <View style={QuotationStyles.tbody}>
                        <Text>{item?.qty}</Text>
                    </View>
                    <View style={QuotationStyles.tbody}>
                        <Text>{(item?.price * item?.qty)?.toFixed(2)}</Text>
                    </View>
                </View>
            </Fragment>
        ))
    );

    const TableTotal = () => (
        <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={QuotationStyles.total}>
                <Text></Text>
            </View>
            <View style={QuotationStyles.total}>
                <Text> </Text>
            </View>
            <View style={QuotationStyles.tbody}>
                <Text>Total</Text>
            </View>
            <View style={QuotationStyles.tbody}>
                <Text>
                    {quotationData?.items?.reduce((sum, item) => sum + (item?.price * item?.qty), 0)}
                </Text>
            </View>
        </View>
    );

    return (
        <>
            <TableHead />
            <TableBody />
            <TableTotal />
        </>
    )
}

export default QuotationItems;