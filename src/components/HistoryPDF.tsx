import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import { useTranslation } from "react-i18next"

import { formatDate } from "@/lib/date-fns"

import { Transaction } from "@/types/types"

import MontserratFont from "@/assets/fonts/Montserrat-Regular.ttf"

Font.register({ family: "Montserrat", src: MontserratFont })

const HistoryPDF = ({ data }: { data: Transaction[] }) => {
  const { t, i18n } = useTranslation("modals")

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRowHead}>
            <View style={[styles.tableCol, { width: "35%" }]}>
              <Text style={styles.tableHead}>{t("history.th-desc")}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableHead}>{t("history.th-date")}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableHead}>{t("history.th-price")}</Text>
            </View>
            <View style={[styles.tableCol, { width: "15%" }]}>
              <Text style={styles.tableHead}>{t("history.th-status")}</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableHead}>{t("history.th-txid")}</Text>
            </View>
          </View>
          {data.map((tx, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={[styles.tableCol, { width: "35%" }]}>
                <Text style={styles.tableCell}>
                  {tx.description || "no description"}
                </Text>
              </View>
              <View style={[styles.tableCol, { width: "15%" }]}>
                <Text style={styles.tableCell}>
                  {formatDate(
                    tx.createdDatetime,
                    i18n.language as "ru" | "en"
                  ) || "no date"}
                </Text>
              </View>
              <View style={[styles.tableCol, { width: "15%" }]}>
                <Text style={styles.tableCell}>
                  {tx.totalAmount ? `$${tx.totalAmount}` : "no amount"}
                </Text>
              </View>
              <View style={[styles.tableCol, { width: "15%" }]}>
                <Text
                  style={[
                    styles.tableCell,
                    {
                      color:
                        tx.status !== null && tx.status === "PENDING"
                          ? "orange"
                          : tx.status === "COMPLETED"
                          ? "green"
                          : "red",
                    },
                  ]}
                >
                  {tx.status || "no status"}
                </Text>
              </View>
              <View style={[styles.tableCol, { width: "20%" }]}>
                <Text style={styles.tableCell}>{tx.txId || "no tx id"}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: "Montserrat",
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRowHead: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "#D1CDC9",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableHead: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    textAlign: "center",
    fontSize: 10,
  },
  tableCell: {
    padding: 6,
    fontSize: 8,
  },
})

export default HistoryPDF
