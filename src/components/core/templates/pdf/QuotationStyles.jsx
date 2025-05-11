import { StyleSheet } from '@react-pdf/renderer';

export const QuotationStyles = StyleSheet.create({

    page: { fontSize: 11, paddingTop: 20, paddingLeft: 20, paddingRight: 20, margin: 0, lineHeight: 1.5, flexDirection: 'column' },

    spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },

    serviceDetailSpaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', color: "#3E3E3E" },

    titleContainer: { flexDirection: 'row', marginTop: 24 },

    serviceDetailContainer: { flexDirection: 'row', marginTop: 1, marginBottom: 1 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: 'center' },

    orgDetailTitle: { fontSize: 11, fontWeight: '900' },

    clientDetailTitle: { fontSize: 12, fontWeight: '900' },

    serviceDetailTitle: { fontSize: 12, fontWeight: '900', paddingRight: 5 },

    quotation: { fontWeight: '900', fontSize: 20 },

    quotationNumber: { fontSize: 11, fontWeight: '400', paddingTop: 10 },

    clientDetail: { fontWeight: 400, fontSize: 10 },

    serviceDetail: { fontWeight: 400, fontSize: 10, paddingTop: 3 },

    theader: { marginTop: 2, fontSize: 12, fontWeight: '400', paddingTop: 2, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

    total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },

    tbody2: { flex: 2, borderRightWidth: 1, }
});