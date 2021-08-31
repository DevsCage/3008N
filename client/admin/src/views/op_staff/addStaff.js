import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStaff } from "../../reduxStore/actions/staff_op_actions";
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

const AddStaff = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [staff_fname, setFirstname] = useState("");
  const [staff_lname, setLastname] = useState("");
  const [staff_mobno, setMobNum] = useState("");
  const [staff_dob, setDOB] = useState("");
  const [staff_email, setEmail] = useState("");
  const [staff_type, setStaffType] = useState("");
  const [staff_gender, setGender] = useState("");
  const [staff_address, setAddress] = useState("");
  const [staff_city, setCity] = useState("");
  const [staff_state, setSState] = useState("");
  const [staff_postcode, setZip] = useState("");

  // const [stud_photo, setPhoto] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let staff_data = new FormData();

    staff_data.append("staff_fname", staff_fname);
    staff_data.append("staff_lname", staff_lname);
    staff_data.append("staff_mobno", staff_mobno);

    //dispatch(addStaff(staff_data));
    axios.post("http://localhost:5000/api/newstaff", staff_data);
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Add New Staff
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal" encType="multipart/form-data">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      value={staff_fname}
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
                      value={staff_lname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Contact No</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      value={staff_mobno}
                      onChange={(e) => {
                        setMobNum(e.target.value);
                      }}
                    />
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
                      value={staff_email}
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
                      value={staff_dob}
                      onChange={(e) => {
                        setDOB(e.target.value);
                      }}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Type</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      value={staff_type}
                      onChange={(e) => {
                        setStaffType(e.target.value);
                      }}
                    >
                      <option value="0">Please select</option>
                      <option value="Teaching">Teaching Staff</option>
                      <option value="Teaching">Teaching</option>
                      <option value="Teaching">Teaching</option>
                      <option value="Teaching">Teaching</option>
                    </CSelect>
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
                      value={staff_gender}
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
                    value={staff_address}
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
                        value={staff_city}
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
                        value={staff_postcode}
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
                    value={staff_state}
                    onChange={(e) => {
                      setSState(e.target.value);
                    }}
                  />
                </CFormGroup>
                {/* <CFormGroup row>
                    <CLabel col md="3" htmlFor="file">
                      Staff Photo
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
                  </CFormGroup> */}
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
  );
};

export default AddStaff;
