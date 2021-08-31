import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFee } from "../../reduxStore/actions/student_op_actions";
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
  CSelect,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const UpdateFee = () => {
  //FormFeilds State Management
  const [USN, setUSN] = useState();
  const [studentData, setStudentData] = useState("");
  const [errorData, setErrorData] = useState();
  const [loading, setLoading] = useState(false);

  const [stud_reg_num, setStudRegNum] = useState("");
  const [student_id, setStudId] = useState("");
  const [stud_fname, setFname] = useState("");
  const [stud_lname, setLname] = useState("");
  const [stud_tution_fee, setTutionFee] = useState(0);
  const [stud_addmission_fee, setAdmissionFee] = useState(0);
  const [stud_hostel_fee, setHostelFee] = useState(0);
  const [stud_sports_fee, setSportsFee] = useState(0);
  const [stud_lab_fee, setLabFee] = useState(0);
  const [stud_transportation_fee, setTransFee] = useState(0);
  const [stud_other_fee, setOtherFee] = useState(0);
  const [stud_other_fee_description, setOtherFeeDesc] = useState("");
  const [stud_total_fee, setTotalFee] = useState(0);
  const [stud_paid_fee, setPaidFee] = useState(0);
  const [stud_pending_fee, setPendingFee] = useState(0);
  const [currentFee, setCurrnetFee] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");

  const [stud_academic_year, setAcademicYear] = useState();
  const [stud_branch_year, setBranchYear] = useState();
  console.log(stud_total_fee, "a");
  console.log(stud_tution_fee, "v");
  console.log(stud_pending_fee, "ff");
  // Redux variables
  const dispatch = useDispatch();

  // Auto calculated value
  let tF =
    parseInt(stud_tution_fee) +
    parseInt(stud_addmission_fee) +
    parseInt(stud_hostel_fee) +
    parseInt(stud_lab_fee) +
    parseInt(stud_transportation_fee) +
    parseInt(stud_sports_fee) +
    parseInt(stud_other_fee);

  // let pF;
  // let pF =
  //   currentFee && stud_total_fee && stud_paid_fee
  //     ? (pF =
  //         parseInt(stud_total_fee) -
  //         parseInt(stud_paid_fee) -
  //         parseInt(currentFee))
  //     : (pF = stud_pending_fee && stud_pending_fee);

  useEffect(() => {
    setPendingFee(
      parseInt(stud_total_fee) - parseInt(stud_paid_fee) - parseInt(currentFee)
    );
  }, [stud_total_fee, currentFee, stud_paid_fee]);

  // if (
  //   parseInt(stud_total_fee) - parseInt(stud_paid_fee) - parseInt(currentFee) <
  //   0
  // ) {
  //   pF = 0;
  // } else if (currentFee) {
  //   pF =
  //     parseInt(stud_total_fee) - parseInt(stud_paid_fee) - parseInt(currentFee);
  // } else {
  //   pF = parseInt(stud_total_fee) - parseInt(stud_paid_fee);
  // }

  // useEffect(() => {
  //   setPendingFee(pF);
  // }, [stud_total_fee, stud_paid_fee, currentFee]);

  useEffect(() => {
    setTotalFee(tF);
  }, [
    stud_addmission_fee,
    stud_tution_fee,
    stud_hostel_fee,
    stud_lab_fee,
    stud_transportation_fee,
    stud_sports_fee,
    stud_other_fee,
  ]);

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      stud_reg_num: stud_reg_num,
      stud_id: student_id,
      stud_hostel_fee: parseInt(stud_hostel_fee),
      stud_tution_fee: parseInt(stud_tution_fee),
      stud_addmission_fee: parseInt(stud_addmission_fee),
      stud_sports_fee: parseInt(stud_sports_fee),
      stud_lab_fee: parseInt(stud_lab_fee),
      stud_transportation_fee: parseInt(stud_transportation_fee),
      stud_other_fee: parseInt(stud_other_fee),
      stud_total_fee: parseInt(stud_total_fee),
      stud_paid_fee: parseInt(stud_paid_fee) + parseInt(currentFee),
      stud_pending_fee: parseInt(stud_pending_fee),
      academic_year: stud_academic_year,
      stud_branch_year: stud_branch_year,
      stud_payment_list: {
        stud_academic_year: stud_academic_year,
        stud_branch_year: stud_branch_year,
        feePaid: parseInt(currentFee),
        payment_mode: paymentMode,
        payment_details: {
          utr: "fucku",
          trans_id: "motherfuckers",
        },
      },
    };

    // const formd = new FormData();

    // formd.append("tution", stud_tution_fee);

    console.log(data);
    dispatch(updateFee(data));
  };

  const fetchFee = async () => {
    if (!stud_academic_year && !stud_branch_year && !USN) {
      alert("Please enter neccessary information");
      setLoading(false);
    } else {
      setLoading(true);
      await axios
        .post("http://localhost:5000/api/fee-by-id", {
          USN,
          stud_academic_year,
          stud_branch_year,
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);

          setStudRegNum(res.data.student.stud_reg_num);
          setFname(res.data.student.stud_fname);
          setLname(res.data.student.stud_lname);

          setTutionFee(res.data.filterData.stud_tution_fee);
          setAdmissionFee(res.data.filterData.stud_addmission_fee);
          setSportsFee(res.data.filterData.stud_sports_fee);
          setLabFee(res.data.filterData.stud_lab_fee);
          setTransFee(res.data.filterData.stud_transportation_fee);
          setOtherFee(res.data.filterData.stud_other_fee);
          setOtherFeeDesc(res.data.filterData.stud_other_fee_description);
          setTotalFee(res.data.filterData.stud_total_fee);
          setHostelFee(res.data.filterData.stud_hostel_fee);
          setPendingFee(res.data.filterData.stud_pending_fee);
          setPaidFee(res.data.filterData.stud_paid_fee);
          setStudId(res.data.student.stud_id);
          setAcademicYear(res.data.data.filterData.academic_year);
          setBranchYear(res.data.data.filterData.stud_branch_year);
          setErrorData(null);
        })
        .catch((error) => {
          setLoading(false);
          setStudentData(null);
          setErrorData(error.response && error.response.data.message);
          // console.log(error.response.data.message);
        });
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    setStudRegNum("");
    setLname("");
    setTutionFee("");
    setFname("");
    setAdmissionFee("");
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
  //     fetchFee();
  //   }
  // }, [USN]);
  const [openChequeForm, setOpenChequeForm] = useState(false);
  const [openDD, setOpenDD] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);

  useEffect(() => {
    if (paymentMode === "cheque") {
      setOpenChequeForm(true);
      setOpenDD(false);
      setOpenOnline(false);
    } else if (paymentMode === "cash") {
      setOpenChequeForm(false);
      setOpenDD(false);
      setOpenOnline(false);
    } else if (paymentMode === "dd") {
      setOpenChequeForm(false);
      setOpenDD(true);
      setOpenOnline(false);
    } else if (paymentMode === "online") {
      setOpenChequeForm(false);
      setOpenDD(false);
      setOpenOnline(true);
    }
  }, [paymentMode]);

  return (
    <>
      <CRow>
        <CCol xs="12" md="6" lg="6">
          {" "}
          <CCard>
            <CCardBody>
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
              {/* <CFormGroup row>
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
              </CFormGroup> */}
              <CCol>
                <CButton color="info" onClick={(e) => fetchFee(e)}>
                  GET STUDENT
                </CButton>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {loading ? (
        <div>Loading...</div>
      ) : errorData ? (
        <CBadge color="danger">{errorData}</CBadge>
      ) : (
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol xs="12" md="6" lg="6">
              <CCard>
                <CCardHeader style={{ fontSize: "1.2rem" }}>
                  Form for Fee Update-Manually
                </CCardHeader>
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
                          readOnly="true"
                          value={stud_reg_num}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">First Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput value={stud_fname} readOnly="true" />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Last Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput value={stud_lname} readOnly="true" />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Academic Year</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        {/* <CSelect
                          value={stud_academic_year}
                          onChange={(e) => setAcademicYear(e.target.value)}
                        >
                          <option value={null}> Please Select</option>
                          <option value="2021-22"> 2021-22</option>
                          <option value="2021-22"> 2022-23</option>
                        </CSelect> */}

                        <CInput value={stud_academic_year} readOnly="true" />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Branch Year</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput value={stud_branch_year} readOnly="true" />
                        {/* <CSelect
                          value={stud_branch_year}
                          onChange={(e) => setBranchYear(e.target.value)}
                        >
                          <option value={null}> Please Select</option>
                          <option value={1}> 1st Year</option>
                          <option value={2}> 2nd Year</option>
                        </CSelect> */}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Tution Fee</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="Number"
                          value={stud_tution_fee}
                          onChange={(e) => setTutionFee(e.target.value)}
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
                          type="Number"
                          value={stud_addmission_fee}
                          onChange={(e) => setAdmissionFee(e.target.value)}
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
                          type="Number"
                          value={stud_hostel_fee}
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
                          type="Number"
                          value={stud_sports_fee}
                          onChange={(e) => setSportsFee(e.target.value)}
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
                          type="Number"
                          value={stud_lab_fee}
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
                          value={stud_transportation_fee}
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
                          type="Number"
                          value={stud_other_fee}
                          onChange={(e) => {
                            setOtherFee(e.target.value);
                          }}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel value="2500">Description for Other Fee</CLabel>
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
                          type="Number"
                          value={stud_total_fee}
                          readOnly="true"
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input" value="2500">
                          Fee Paid
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput value={stud_paid_fee} readOnly="true" />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input" value="2500">
                          Add New Fee
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          value={currentFee}
                          onChange={(e) => {
                            setCurrnetFee(e.target.value);
                          }}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
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
                          <option value="dd">DD</option>
                        </CSelect>
                      </CCol>
                      <CCol>
                        {openChequeForm ? (
                          <>
                            <CInput type="text" placeholder="Bank Name" />
                            <CInput type="text" placeholder="IFSC Code" />
                            <CInput type="text" placeholder="Cheque No" />
                            <CInput type="text" placeholder="MICR Code" />
                            <CInput type="text" placeholder="short A/c No" />
                            <CInput
                              type="text"
                              placeholder="Transaction Code"
                            />
                          </>
                        ) : null}
                        {openDD ? (
                          <>
                            <CInput type="text" placeholder="Bank Name" />
                            <CInput type="text" placeholder="IFSC Code" />
                            <CInput type="text" placeholder="DD No" />
                            <CInput type="text" placeholder="MICR Code" />
                            <CInput type="text" placeholder="short A/c No" />
                            <CInput
                              type="text"
                              placeholder="Transaction Code"
                            />
                          </>
                        ) : null}
                        {openOnline ? (
                          <>
                            <CInput type="text" placeholder="Receipt No" />
                            <CInput type="text" placeholder="Transaction ID" />
                            <CInput type="text" placeholder="Name" />
                            <CInput
                              type="text"
                              placeholder="Payment Through (DEBIT/CREDIT/UPI)"
                            />
                          </>
                        ) : null}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Pending Fee</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="number"
                          value={stud_pending_fee}
                          onChange={(e) => {
                            setPendingFee(e.target.value);
                          }}
                        />
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
              </CCard>
            </CCol>
          </CRow>
        </CForm>
      )}
    </>
  );
};

export default UpdateFee;
