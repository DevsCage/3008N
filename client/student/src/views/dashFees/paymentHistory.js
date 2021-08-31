import React from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CButton,
  CCol,
  CRow,
  CCollapse,
  CFade,
  CLabel,
  CSwitch,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import axios from "axios";

const PaymentHistory = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);
  const [USN, setUSN] = React.useState("1234");
  const [FeeData, setFeeData] = React.useState("");
  const fetchFee = () => {
    axios
      .post("http://localhost:5000/api/fee-by-id", {
        USN,
      })
      .then((res) => {
        console.log(res, "aa");
        setFeeData(res.data);
      });
  };
  React.useEffect(() => {
    if (USN.length >= 4) {
      fetchFee();
    }
  }, [USN]);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="8">
          <CFade in={showCard}>
            <CCard>
              <CCardHeader>Payment History</CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Transaction Date</th>
                        <th scope="col"> Mode</th>
                        <th scope="col"> Amount</th>
                        <th scope="col"> Status</th>
                        <th scope="col">Clearance </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>

                  <CRow>
                    <CCol>
                      <CButton style={{ marginRight: "2rem" }} color="primary">
                        View Pending Fees
                      </CButton>
                      <CButton color="info">Make a Payment</CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default PaymentHistory;
