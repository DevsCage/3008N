import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStudent } from "../../reduxStore/actions/student_op_actions";
import axios from "axios";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CHeader,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Toaster from "src/component/ui/toaster";

const AddStudent = () => {
  const [stud_fname, setFirstname] = useState("");
  const [stud_lname, setLastname] = useState("");
  const [stud_reg_num, setRegNum] = useState("");
  const [stud_dob, setDOB] = useState("");
  const [stud_email, setEmail] = useState("");
  const [stud_contact_no, setContact] = useState("");
  const [stud_branch, setBranch] = useState("");
  const [stud_ac_year, setAcYear] = useState("");
  const [stud_sem, setSemister] = useState("");
  const [stud_qouta, setQouta] = useState("");
  const [stud_class_div, setDivision] = useState("");
  const [stud_adharno, setAdhaar] = useState("");
  const [stud_religion, setReligion] = useState("hindu");
  const [stud_caste, setCaste] = useState("");
  const [stud_cat, setCat] = useState("");
  const [stud_subcaste, setSubcaste] = useState("");
  const [stud_branch_year, setBranchYear] = useState("");
  const [stud_total_fee, setTotalFee] = useState("");
  const [stud_paid_fee, setpaidFee] = useState("");
  const [stud_pending_fee, setPendingFee] = useState("");
  const [stud_address, setAddress] = useState("");
  const [stud_city, setCity] = useState("");
  const [stud_state, setSState] = useState("");
  const [stud_zip, setZip] = useState("");
  const [stud_gender, setGender] = useState("Male");
  const [stud_photo, setPhoto] = useState("");

  const religions = ["hindu", "muslim", "christian"];
  const casteHindu = ["gowda", "sc", "other"];
  const casteMuslim = ["sha", "siya", "kis", "other"];
  const casteChristian = ["roman", "protestents", "other"];

  const errors = useSelector((state) => state.studentReducer.message);

  const dispatch = useDispatch();
  console.log(stud_dob);
  const handleSubmit = (e) => {
    e.preventDefault();
    let student_data = new FormData();

    student_data.append("stud_reg_num", stud_reg_num);
    student_data.append("stud_fname", stud_fname);
    student_data.append("stud_lname", stud_lname);

    student_data.append("stud_email", stud_email);
    student_data.append("stud_dob", stud_dob);
    student_data.append("stud_contact_no", stud_contact_no);
    student_data.append("stud_branch", stud_branch);
    student_data.append("stud_qouta", stud_qouta);
    student_data.append("stud_cat", stud_cat);
    student_data.append("stud_ac_year", stud_ac_year);
    student_data.append("stud_branch_year", stud_branch_year);
    student_data.append("stud_religion", stud_religion);
    student_data.append("stud_caste", stud_caste);
    student_data.append("stud_subcaste", stud_subcaste);
    student_data.append("stud_class_div", stud_class_div);
    student_data.append("stud_sem", stud_sem);
    student_data.append("stud_address", stud_address);
    student_data.append("stud_city", stud_city);
    student_data.append("stud_zip", stud_zip);
    student_data.append("stud_state", stud_state);
    student_data.append("stud_gender", stud_gender);
    student_data.append("stud_adharno", stud_adharno);
    student_data.append("stud_sys_init_password", stud_adharno);
    student_data.append("stud_sys_username", stud_reg_num);

    dispatch(addStudent(student_data));
  };

  return (
    <>
      <CRow>
        <CCol xs="12" md="6" lg="8">
          <CCard>
            <CCardHeader style={{ fontSize: "1rem" }}>
              Add Student Form{" "}
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal" onSubmit={handleSubmit}>
                <CFormGroup row>
                  <CCol xs="12">
                    <CLabel>Registration Number</CLabel>
                    <CInput
                      value={stud_reg_num}
                      onChange={(e) => {
                        setRegNum(e.target.value);
                      }}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12">
                    <CLabel>Admission Qouta </CLabel>

                    <CSelect
                      value={stud_qouta}
                      onChange={(e) => {
                        setQouta(e.target.value);
                      }}
                    >
                      <option value="Government">Government </option>
                      <option value="Management">Management </option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>First Name</CLabel>
                    <CInput
                      value={stud_fname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel>Last Name</CLabel>
                    <CInput
                      value={stud_lname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Date of Birth</CLabel>
                    <CInput
                      type="date"
                      id="date-input"
                      name="date-input"
                      placeholder="date"
                      value={stud_dob}
                      onChange={(e) => {
                        setDOB(e.target.value);
                      }}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel>Gender</CLabel>
                    <CSelect
                      value={stud_gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Religion</CLabel>
                    <CSelect
                      style={{
                        textTransform: "capitalize",
                      }}
                      value={stud_religion}
                      onChange={(e) => {
                        setReligion(e.target.value);
                      }}
                    >
                      {religions.map((religion) => (
                        <option value={religion}>{religion}</option>
                      ))}
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>Caste</CLabel>
                    <CSelect
                      style={{
                        textTransform: "capitalize",
                      }}
                      value={stud_caste}
                      onChange={(e) => {
                        setCaste(e.target.value);
                      }}
                    >
                      {stud_religion === "hindu" ? (
                        casteHindu.map((caste) => (
                          <option value={caste}>{caste}</option>
                        ))
                      ) : stud_religion === "muslim" ? (
                        casteMuslim.map((caste) => (
                          <option value={caste}>{caste}</option>
                        ))
                      ) : stud_religion === "christian" ? (
                        casteChristian.map((caste) => (
                          <option value={caste}>{caste}</option>
                        ))
                      ) : (
                        <option value="">Select</option>
                      )}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Sub Caste</CLabel>
                    <CSelect
                      value={stud_subcaste}
                      onChange={(e) => {
                        setSubcaste(e.target.value);
                      }}
                    >
                      <option value="Subcaste1">Subcaste1</option>
                      <option value="Subcaste2">Subcaste2</option>
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>Category</CLabel>
                    <CSelect
                      value={stud_cat}
                      onChange={(e) => {
                        setCat(e.target.value);
                      }}
                    >
                      <option value="Category1">Category1</option>
                      <option value="Category2">Category2</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel>Branch</CLabel>
                    <CSelect
                      value={stud_branch}
                      onChange={(e) => {
                        setBranch(e.target.value);
                      }}
                    >
                      <option value="Computer Science and Engineering">
                        Computer Science and Engineering
                      </option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Academic Year</CLabel>
                    <CSelect
                      value={stud_ac_year}
                      onChange={(e) => {
                        setAcYear(e.target.value);
                      }}
                    >
                      <option value="2021-2022">2021-2022</option>
                      <option value="2020-2021">2020-2021</option>
                      <option value="2019-2020">2020-2021</option>
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>Semister</CLabel>
                    <CSelect
                      value={stud_sem}
                      onChange={(e) => {
                        setSemister(e.target.value);
                      }}
                    >
                      <option value="Sem-1">Sem-1</option>
                      <option value="Sem-2">Sem-2</option>
                      <option value="Sem-3">Sem-3</option>
                      <option value="Sem-4">Sem-4</option>
                      <option value="Sem-5">Sem-5</option>
                      <option value="Sem-6">Sem-6</option>
                      <option value="Sem-7">Sem-7</option>
                      <option value="Sem-8">Sem-8</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Branch Year</CLabel>
                    <CSelect
                      value={stud_branch_year}
                      onChange={(e) => {
                        setBranchYear(e.target.value);
                      }}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>Division</CLabel>
                    <CSelect
                      value={stud_class_div}
                      onChange={(e) => {
                        setDivision(e.target.value);
                      }}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Email ID</CLabel>
                    <CInput
                      value={stud_email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel>Mobile Number</CLabel>
                    <CInput
                      value={stud_contact_no}
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Adhar Number</CLabel>
                    <CInput
                      value={stud_adharno}
                      onChange={(e) => {
                        setAdhaar(e.target.value);
                      }}
                    />
                  </CCol>
                </CFormGroup>

                <CCardFooter>
                  <CButton type="submit" size="sm" color="primary">
                    Submit
                  </CButton>
                </CCardFooter>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        {errors && (
          <Toaster message={errors} title={"ERROR"} color={"255, 0, 0"}>
            {errors && errors}
          </Toaster>
        )}
      </CRow>
    </>
  );
};

export default AddStudent;
