import { Text, View } from '@react-pdf/renderer';
import { QuotationStyles } from "./QuotationStyles";

function QuotationItems({ quotationData }) {
    const items = Array.isArray(quotationData?.items) ? quotationData.items : [];
    const isValidQty = (qty) => typeof qty === 'number' && qty > 0;
    const total = items.reduce((sum, item) =>
        isValidQty(item?.qty) ? sum + (item.price * item.qty) : sum, 0
    );

    return (
        <View>
            {/* Table header */}
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 40 }}>
                <View style={[QuotationStyles.theader, QuotationStyles.theader2]}>
                    <Text>Items</Text>
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

            {/* Table rows */}
            {items.map((item, index) =>
                isValidQty(item?.qty) ? (
                    <View key={index} style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={[QuotationStyles.tbody, QuotationStyles.tbody2]}>
                            <Text>{item?.description ?? " "}</Text>
                        </View>
                        <View style={QuotationStyles.tbody}>
                            <Text>{item?.price ?? " "}</Text>
                        </View>
                        <View style={QuotationStyles.tbody}>
                            <Text>{item?.qty}</Text>
                        </View>
                        <View style={QuotationStyles.tbody}>
                            <Text>{(item.price * item.qty).toFixed(2)}</Text>
                        </View>
                    </View>
                ) : null
            )}

            {/* Total row */}
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={QuotationStyles.total}><Text></Text></View>
                <View style={QuotationStyles.total}><Text></Text></View>
                <View style={QuotationStyles.tbody}><Text>Total</Text></View>
                <View style={QuotationStyles.tbody}>
                    <Text>{total.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
}

export default QuotationItems;