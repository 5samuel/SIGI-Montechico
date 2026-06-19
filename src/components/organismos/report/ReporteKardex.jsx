import styled from "styled-components";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },

  
});

export function ReporteKardex({ data = [] }) {

    const renderTableRow = (rowData, isHeader=false) => (
        <View key={rowData.id}>
            <Text >
                {rowData.fecha}
            </Text>
        </View>
    );

    const currentDate = new Date();
    const formattedDate =`${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    return (
        <Document>
            <Page size="A4" style={styles.page}orientation="landscape" >

                <View style={styles.section}>
                    <Text>
                        Movimiento de Kardex
                    </Text>
                    <Text>
                        Fecha y Hora de Impresión: {formattedDate}
                    </Text>
                    <View>

                        {renderTableRow({fecha: "Fecha", descripcion: "Producto"}, true )}
                        {Array.isArray(data) &&
                            data.map((item, index) => (
                                <View key={index}>
                                    {renderTableRow(item)}
                                </View>
                            ))
                        }

                    </View>
                </View>
            </Page>
        </Document>
    );
}

const Container = styled.div``;