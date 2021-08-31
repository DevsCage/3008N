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
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";

const AddMarksABCD = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [stud_fname, setFirstname] = useState("");
  const [stud_lname, setLastname] = useState("");
  const [stud_reg_num, setRegNum] = useState("");
  const [stud_dob, setDOB] = useState("");
  const [stud_email, setEmail] = useState("");
  const [stud_address, setAddress] = useState("");
  const [stud_city, setCity] = useState("");
  const [stud_state, setSState] = useState("");
  const [stud_zip, setZip] = useState("");
  const [stud_gender, setGender] = useState("");
  const [stud_photo, setPhoto] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let student_data = new FormData();

    student_data.append("stud_fname", stud_fname);
    student_data.append("stud_lname", stud_lname);
    student_data.append("stud_photo", stud_photo);
    // let new_student_data = {
    //   stud_fname: stud_fname,
    //   stud_lname: stud_lname,
    //   stud_reg_num: stud_reg_num,
    //   stud_dob: stud_dob,
    //   stud_email: stud_email,
    //   stud_address: stud_address,
    //   stud_city: stud_city,
    //   stud_state: stud_state,
    //   stud_zip: stud_zip,
    //   stud_gender: stud_gender,
    //   stud_photo: stud_photo,
    // };
    dispatch(addStudent(student_data));
    // axios({
    //   method: "post",
    //   url: "http://localhost:5000/api/students/create",
    //   data: student_data,
    // }).then(console.log(student_data));
    //axios.post("http://localhost:5000/api/students/create", student_data);
  };

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Add New Student
                <small> Form</small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="form-horizontal"
                  encType="multipart/form-data"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">First Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        value={stud_fname}
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Last Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        value={stud_lname}
                        onChange={(e) => {
                          setLastname(e.target.value);
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="password-input">
                        University Seat Number
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        placeholder="USN / Reg. Number"
                        value={stud_reg_num}
                        onChange={(e) => {
                          setRegNum(e.target.value);
                        }}
                      />
                      <CFormText className="help-block">Alphanumeric</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Email Input</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="email"
                        id="email-input"
                        name="email-input"
                        autoComplete="email"
                        value={stud_email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Date of Birth</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        id="date-input"
                        name="date-input"
                        value={stud_dob}
                        onChange={(e) => {
                          setDOB(e.target.value);
                        }}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Gender</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        custom
                        name="select"
                        id="select"
                        value={stud_gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      >
                        <option value="0">Please select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup md="9" sx="12">
                    <CLabel htmlFor="street">Address</CLabel>
                    <CInput
                      id="street"
                      value={stud_address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </CFormGroup>
                  <CFormGroup row className="my-0">
                    <CCol xs="4">
                      <CFormGroup>
                        <CLabel htmlFor="city">City</CLabel>
                        <CInput
                          id="city"
                          value={stud_city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="4">
                      <CFormGroup>
                        <CLabel htmlFor="postal-code">Postal Code</CLabel>
                        <CInput
                          id="postal-code"
                          value={stud_zip}
                          onChange={(e) => {
                            setZip(e.target.value);
                          }}
                        />
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="country">State</CLabel>
                    <CInput
                      value={stud_state}
                      onChange={(e) => {
                        setSState(e.target.value);
                      }}
                    />
                  </CFormGroup>
                  <CFormGroup row>
                    <CLabel col md="3" htmlFor="file">
                      Student Photo
                    </CLabel>
                    <CCol xs="12" md="9">
                      <CInputFile
                        id="file-input"
                        name="file-input"
                        type="file"
                        onChange={(e) => {
                          const stud_photo = e.target.files[0];
                          setPhoto(stud_photo);
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
                <CButton type="reset" size="sm" color="danger">
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CForm>
    </>
  );
};

export default AddMarksABCD;
