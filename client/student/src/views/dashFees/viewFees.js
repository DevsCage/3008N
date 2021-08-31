import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CFormGroup,
  CButton,
  CCol,
  CForm,
  CRow,
  CSelect,
  CCollapse,
  CFade,
  CLabel,
  CSwitch,
  CLink,
  CInputGroup,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import axios from "axios";

const ViewFees = () => {
  const [ID, setID] = React.useState("");
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);
  const [FeeData, setFeeData] = React.useState("");

  const stud_fetched_id = localStorage.getItem("student");
  const studentFeeData = JSON.parse(stud_fetched_id);
  console.log(studentFeeData, "feedata");
  // const stud_fetched_id = useSelector(
  //   (state) => state.auth.USN && state.auth.USN.stud_reg_num
  // );

  const handleBtnSubmit = () => {
    alert("hi");
  };
  useEffect(() => {
    if (studentFeeData) {
      setID(studentFeeData.stud_reg_num);
    }
  }, [stud_fetched_id]);

  const fetchFee = () => {
    axios
      .post("http://localhost:5000/api/fee-by-id", {
        ID,
      })
      .then((res) => {
        console.log(res, "aa");
        setFeeData(res.data);
      });
  };
  React.useEffect(() => {
    if (ID && ID.length >= 4) {
      fetchFee();
    }
  }, [ID]);
  return (
    <>
      <CRow>
        <CCol lg="4">
          <CCard>
            <CCardHeader>Select Academic Year</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleBtnSubmit}>
                <CFormGroup>
                  {" "}
                  <CSelect>
                    <option value="Test"> Test</option>
                    <option value="Test"> Test</option>
                    <option value="Test"> Test</option>
                    <option value="Test"> Test</option>
                    <option value="Test"> Test</option>
                    <option value="Test"> Test</option>
                  </CSelect>{" "}
                </CFormGroup>

                <CFormGroup>
                  {" "}
                  <CButton color="info"> Check</CButton>{" "}
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6" md="8">
          <CFade in={showCard}>
            <CCard>
              <CCardHeader>Pending Fee Details</CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Fee Particular</th>
                        <th scope="col">Pending Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Admission Fee</td>
                        <td>{FeeData && FeeData.fee.stud_addmission_fee}</td>
                      </tr>
                      <tr>
                        <td>Tution Fee</td>
                        <td>{FeeData && FeeData.fee.stud_tution_fee}</td>
                      </tr>
                      <tr>
                        <td>Hostel Fee</td>
                        <td>{FeeData && FeeData.fee.stud_hostel_fee}</td>
                      </tr>
                      <tr>
                        <td>Sports Fee</td>
                        <td>{FeeData && FeeData.fee.stud_sports_fee}</td>
                      </tr>
                      <tr>
                        <td>Lab Fee</td>
                        <td>{FeeData && FeeData.fee.stud_lab_fee}</td>
                      </tr>

                      <tr>
                        <td>Transportation Fee</td>
                        <td>
                          {FeeData && FeeData.fee.stud_transportation_fee}
                        </td>
                      </tr>
                      <tr>
                        <td>Other Fee</td>
                        <td>{FeeData && FeeData.fee.stud_other_fee}</td>
                      </tr>
                      <tr>
                        <td>Other Fee Description</td>
                        <td>
                          {FeeData && FeeData.fee.stud_other_fee_description}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <CCard>
                    <table class="table">
                      <thead>
                        <tr>
                          <td>
                            {" "}
                            Total Fee : {FeeData && FeeData.fee.stud_total_fee}
                          </td>
                        </tr>{" "}
                        <tr>
                          <td>
                            {" "}
                            Paid Fee : {FeeData && FeeData.fee.stud_paid_fee}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: "0px" }}>
                            Pending Fee :
                            {FeeData && FeeData.fee.stud_pending_fee}
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </CCard>
                  <CRow>
                    <CCol>
                      <CButton style={{ marginRight: "2rem" }} color="primary">
                        View Payment History
                      </CButton>
                      <CButton color="info">Make Payment</CButton>
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

export default ViewFees;
