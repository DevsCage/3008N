import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFee } from "../../reduxStore/actions/student_op_actions";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CTextarea,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CBadge,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Toaster from "src/component/ui/toaster";

const AddFee = () => {
  const [errorData, setErrorData] = useState();
  const [studentData, setStudentData] = useState("");

  const [USN, setUSN] = useState("");
  const [stud_reg_num, setRegNum] = useState("");
  const [stud_fname, setFirstname] = useState("");
  const [stud_lname, setLastname] = useState("");
  const [stud_tution_fee, setTutionFee] = useState(0);
  const [stud_addmission_fee, SetAdmissionFee] = useState(0);
  const [stud_hostel_fee, setHostelFee] = useState(0);
  const [stud_sports_fee, setSportsFee] = useState(0);
  const [stud_lab_fee, setLabFee] = useState(0);
  const [stud_transportation_fee, setTransFee] = useState(0);
  const [stud_other_fee, setOtherFee] = useState(0);
  const [stud_other_fee_description, setOtherFeeDesc] = useState("");
  const [stud_total_fee, setTotalFee] = useState(0);
  const [stud_paid_fee, setPaidFee] = useState(0);
  const [stud_pending_fee, setPendingFee] = useState(0);
  const [stud_academic_year, setAcademicYear] = useState();
  const [stud_branch_year, setBranchYear] = useState();
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.feeReducer.message);
  // Calc pending fee
  let pF;
  if (parseInt(stud_total_fee) - parseInt(stud_paid_fee) < 0) {
    pF = 0;
    console.log("object-0");
  } else {
    console.log("object-1");
    pF = parseInt(stud_total_fee) - parseInt(stud_paid_fee);
  }

  // Set total fee
  useEffect(() => {
    setTotalFee(
      parseInt(stud_tution_fee) +
        parseInt(stud_addmission_fee) +
        parseInt(stud_hostel_fee) +
        parseInt(stud_lab_fee) +
        parseInt(stud_transportation_fee) +
        parseInt(stud_sports_fee) +
        parseInt(stud_other_fee)
    );
  }, [
    stud_addmission_fee,
    stud_tution_fee,
    stud_hostel_fee,
    stud_lab_fee,
    stud_transportation_fee,
    stud_sports_fee,
    stud_other_fee,
  ]);

  useEffect(() => {
    setPendingFee(pF);
  }, [stud_total_fee, stud_paid_fee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      stud_reg_num: studentData.student && studentData.student.stud_reg_num,
      stud_fname: studentData.student && studentData.student.stud_fname,
      stud_lname: studentData.student && studentData.student.stud_lname,
      stud_id: studentData.student && studentData.student._id,
      stud_academic_year: stud_academic_year,
      stud_branch_year: stud_branch_year,
      stud_tution_fee: stud_tution_fee,
      stud_addmission_fee: stud_addmission_fee,
      stud_hostel_fee: stud_hostel_fee,
      stud_sports_fee: stud_sports_fee,
      stud_lab_fee: stud_lab_fee,
      stud_transportation_fee: stud_transportation_fee,
      stud_other_fee: stud_other_fee,
      stud_total_fee: stud_total_fee,
      stud_paid_fee: stud_paid_fee,
      stud_pending_fee: stud_pending_fee,
      stud_other_fee_description: stud_other_fee_description,
    };

    dispatch(addFee(data));
  };

  const fetchStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:5000/api/get-student-by-USN", {
        USN,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setStudentData(res.data);
        setErrorData(null);
      })
      .catch((error) => {
        setLoading(false);
        setStudentData(null);
        setErrorData(error.response.data.message);
      });
  };

  const resetForm = (e) => {
    e.preventDefault();
    setRegNum("");
    setFirstname("");
    setLastname("");
    setTutionFee("");
    SetAdmissionFee("");
    setSportsFee("");
    setLabFee("");
    setTransFee("");
    setOtherFee("");
    setOtherFeeDesc("");
    setTotalFee("");
    setHostelFee("");
    setPendingFee("");
    setPaidFee("");
    setUSN("");
    setPaymentMode("");
  };
  // useEffect(() => {
  //   if (USN.length >= 4) {

  //   }
  // }, [USN]);

  return (
    <>
      <CRow>
        <CCol xs="12" md="6" lg="6">
          <CCard>
            <CCardBody>
              <Toaster color={"255, 0, 0"} title="ERROR" message={errors} />
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Search Student </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    placeholder="Enter Student ID"
                    type="text"
                    value={USN}
                    onChange={(e) => setUSN(e.target.value)}
                  />
                </CCol>
              </CFormGroup>
              <CButton color="info" onClick={(e) => fetchStudent(e)}>
                GET STUDENT
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xs="12" md="6" lg="6">
            <CCard>
              <CCardHeader>
                Add Fee to Student Profile
                <small> Form</small>
              </CCardHeader>
              {loading ? (
                <CBadge color="warning">Loading</CBadge>
              ) : errorData ? (
                <CBadge color="danger">{errorData && errorData}</CBadge>
              ) : (
                <>
                  <CCardBody>
                    <CForm
                      className="form-horizontal"
                      encType="multipart/form-data"
                    >
                      {" "}
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Registration Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="text"
                            value={
                              studentData && studentData.student.stud_reg_num
                            }
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">First Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            value={
                              studentData && studentData.student.stud_fname
                            }
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Last Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            value={
                              studentData && studentData.student.stud_lname
                            }
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Academic Year</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            value={stud_academic_year}
                            onChange={(e) => setAcademicYear(e.target.value)}
                          >
                            <option value={null}> Please Select</option>
                            <option value="2021-22"> 2021-22</option>
                            <option value="2022-23"> 2022-23</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Branch Year</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            value={stud_branch_year}
                            onChange={(e) => setBranchYear(e.target.value)}
                          >
                            <option value={null}> Please Select</option>
                            <option value={1}> 1st Year</option>
                            <option value={2}> 2nd Year</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Tution Fee</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            onWheel={(e) => e.target.blur()}
                            type="number"
                            value={
                              stud_tution_fee == 0 ? null : stud_tution_fee
                            }
                            onChange={(e) => {
                              setTutionFee(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Admission Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="number"
                            value={
                              stud_addmission_fee == 0
                                ? null
                                : stud_addmission_fee
                            }
                            onChange={(e) => {
                              SetAdmissionFee(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Hostel Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="number"
                            value={
                              stud_hostel_fee == 0 ? null : stud_hostel_fee
                            }
                            onChange={(e) => {
                              setHostelFee(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Sports Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="number"
                            value={
                              stud_sports_fee == 0 ? null : stud_sports_fee
                            }
                            onChange={(e) => {
                              setSportsFee(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Lab Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="number"
                            value={stud_lab_fee == 0 ? null : stud_lab_fee}
                            onChange={(e) => {
                              setLabFee(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Transportation Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="Number"
                            value={
                              stud_transportation_fee == 0
                                ? null
                                : stud_transportation_fee
                            }
                            onChange={(e) => {
                              setTransFee(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Other Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="number"
                            value={stud_other_fee == 0 ? null : stud_other_fee}
                            onChange={(e) => {
                              setOtherFee(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel value="2500">
                            Description for Other Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            type="textarea-input"
                            value={stud_other_fee_description}
                            onChange={(e) => {
                              setOtherFeeDesc(e.target.value);
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Total Fee</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="number"
                            value={stud_total_fee == 0 ? null : stud_total_fee}
                            onChange={(e) => {
                              if (!e.target.value) {
                                setTotalFee(0);
                              } else {
                                setTotalFee(e.target.value);
                              }
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                      {/* <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Fee Paid
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="number"
                            value={0}
                            onChange={(e) => {
                              if (!e.target.value) {
                                setPaidFee(0);
                              } else {
                                setPaidFee(e.target.value);
                              }
                            }}
                            required
                          />
                        </CCol>
                      </CFormGroup> */}
                      {/* <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Payment Mode
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            value={paymentMode}
                            onChange={(e) => {
                              setPaymentMode(e.target.value);
                            }}
                            required
                          >
                            <option value="">Select payment mode</option>
                            <option value="cash">Cash</option>
                            <option value="online">Online</option>
                            <option value="cheque">Cheque</option>
                            <option value="through_bank">Through Bank</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup> */}
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input" value="2500">
                            Pending Fee
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput type="number" value={stud_total_fee} />
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>

                  <CCardFooter>
                    <CButton type="submit" size="sm" color="primary">
                      <CIcon name="cil-scrubber" /> Submit
                    </CButton>
                    <CButton
                      type="reset"
                      size="sm"
                      color="danger"
                      onClick={(e) => resetForm(e)}
                    >
                      <CIcon name="cil-ban" /> Reset
                    </CButton>
                  </CCardFooter>
                </>
              )}
            </CCard>
          </CCol>
        </CRow>
      </CForm>
    </>
  );
};

export default AddFee;
