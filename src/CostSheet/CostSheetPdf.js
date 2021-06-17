import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const BORDER_COLOR = "#000000";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 40;
const COLN_WIDTH = (100 - COL1_WIDTH) / 3;

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: "12pt",
    marginTop: "20px",
    marginLeft: "15px",
  },
  table: {
    display: "table",
    width: "auto",
    // borderStyle: BORDER_STYLE,
    // borderColor: BORDER_COLOR,
    // borderWidth: 1,
    // borderRightWidth: 0,
    // borderBottomWidth: 0
  },
  tableRow: {
    margin: 0,
    flexDirection: "row",
    width: "96%",
  },
  bordered: {
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
  },
  tableCol: {
    //width: COLN_WIDTH + "%",
    width: "100%",
    padding: "3px",
    margin: 0,
    // borderStyle: BORDER_STYLE,
    // borderColor: BORDER_COLOR,
    // borderWidth: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0
  },
});
// Create Document Component
const CostSheetPdf = ({costSheet}) => (
  
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.table}>
        <View style={{ ...styles.tableRow,...styles.bordered }}>
          <View style={styles.tableCol}>
            <Text style={{ textAlign: "center" }}> NORMA GENERAL </Text>
          </View>
        </View>
        
        <View style={{ ...styles.tableRow,...styles.bordered }}>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text> FICHA DE COSTO </Text>
          </View>
          <View style={{ ...styles.tableCol, textAlign: "right" }}>
            <Text>{JSON.parse(localStorage.getItem('user')).enterpriseName}</Text>
          </View>
        </View>
        
        <View style={{ ...styles.tableRow,...styles.bordered }}>
          <View style={styles.tableCol}>
            <Text> Ministerio de comercio interior </Text>
          </View>
        </View>
        
        <View style={{ ...styles.tableRow,...styles.bordered, borderBottom: "1px solid black"}}>
          <View style={styles.tableCol}>
            <Text> Nombre: {`${costSheet.name} ${costSheet.qty}${costSheet.measureUnit}` } </Text>
          </View>
        </View>
        
        {/* Elements header */}
        <View style={{ ...styles.tableRow, border: "1px solid black", marginTop:"10px" }}>
          <View
            style={{
              ...styles.tableCol,
              width: "45%",
              borderRight: "1px solid black",
            }}
          >
            <Text> COSTOS Y GASTOS </Text>
          </View>
          <View
            style={{
              ...styles.tableCol,
              width: "10%",
              textAlign: "right",
              borderRight: "1px solid black",
            }}
          >
            <Text> UM </Text>
          </View>
          <View
            style={{
              ...styles.tableCol,
              width: "15%",
              textAlign: "right",
              borderRight: "1px solid black",
            }}
          >
            <Text> CANTIDAD </Text>
          </View>
          <View
            style={{
              ...styles.tableCol,
              width: "15%",
              textAlign: "right",
              borderRight: "1px solid black",
            }}
          >
            <Text> PRECIO </Text>
          </View>
          <View
            style={{ ...styles.tableCol, width: "15%", textAlign: "right" }}
          >
            <Text> IMPORTE </Text>
          </View>
        </View>
        
        {/* Elements */}
        {costSheet.elements &&
          costSheet.elements.map(el=>(

            <View style={{ ...styles.tableRow, paddingTop: "5px"}} key={el._id}>
              <View
                style={{
                  ...styles.tableCol,
                  width: "45%",
                }}
              >
                <Text> {el.name} </Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "10%",
                  textAlign: "right",
                }}
              >
                <Text> {el.measureUnit} </Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "15%",
                  textAlign: "right",
                }}
              >
                <Text> {el.qty} </Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "15%",
                  textAlign: "right",
                }}
              >
                <Text> {el.price} </Text>
              </View>
              <View
                style={{ ...styles.tableCol, width: "15%", textAlign: "right" }}
              >
                <Text> {el.amount && el.amount.toFixed(2)} </Text>
              </View>
            </View>
 
          ))
        }

        {/* Totals */}
        <View style={{ ...styles.tableRow, borderTop: "1px solid black", paddingTop: "5px"}}>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text>Total</Text>
          </View>
          <View style={{ ...styles.tableCol, textAlign: "right" }}>
            <Text>{costSheet._total && costSheet._total.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ ...styles.tableRow}}>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text>Margen comercial ({costSheet.comercialMargin}%)</Text>
          </View>
          <View style={{ ...styles.tableCol, textAlign: "right" }}>
            <Text>{costSheet._comercialMargin && costSheet._comercialMargin.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ ...styles.tableRow }}>
          <View style={{ ...styles.tableCol, width: "60%" }}>
            <Text>Sub total</Text>
          </View>
          <View style={{ ...styles.tableCol, textAlign: "right" }}>
            <Text>{costSheet._subTotal && costSheet._subTotal.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ ...styles.tableRow}}>
          <View style={{ ...styles.tableCol, width: "60%" }}>
            <Text>Impuesto sobre las ventas ({costSheet.salesTaxes}%)</Text>
          </View>
          <View style={{ ...styles.tableCol, textAlign: "right" }}>
            <Text>{costSheet._salesTaxes && costSheet._salesTaxes.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ ...styles.tableRow}}>
          <View style={{ ...styles.tableCol, width: "60%" }}>
            <Text>Precio impuesto</Text>
          </View>
          <View style={{ ...styles.tableCol, textAlign: "right" }}>
            <Text>{costSheet._imposedPrice && costSheet._imposedPrice.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ ...styles.tableRow}}>
          <View style={{ ...styles.tableCol, width: "60%" }}>
            <Text>Precio minorista</Text>
          </View>
          <View style={{ ...styles.tableCol, textAlign: "right" }}>
            <Text>{costSheet.minoristPrice && costSheet.minoristPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CostSheetPdf;
