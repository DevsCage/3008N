import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CTextarea,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const UpdateStudent = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" md="6" lg="6">
          <CCard>
            <CCardBody>
              <CFormGroup>
                <CCol>
                  <CLabel>Search Student</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput placeholder="Enter Student ID" type="text" value="" />
                </CCol>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="6" lg="8">
          <CCard>
            <CCardHeader style={{ fontSize: "1rem" }}>
              Update Student Form{" "}
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  <CCol xs="12">
                    <CLabel>Registration Number</CLabel>
                    <CInput />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>First Name</CLabel>
                    <CInput />
                  </CCol>
                  <CCol md="6">
                    <CLabel>Last Name</CLabel>
                    <CInput />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Date of Birth</CLabel>
                    <CInput />
                  </CCol>
                  <CCol md="6">
                    <CLabel>Gender</CLabel>
                    <CSelect>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel>Branch</CLabel>
                    <CSelect>
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
                    <CSelect>
                      <option value="2021-2022">2021-2022</option>
                      <option value="2020-2021">2020-2021</option>
                      <option value="2019-2020">2020-2021</option>
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>Semister</CLabel>
                    <CSelect>
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
                    <CLabel>Division</CLabel>
                    <CSelect>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>Adhar Number</CLabel>
                    <CInput />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel>Email ID</CLabel>
                    <CInput />
                  </CCol>
                  <CCol md="6">
                    <CLabel>Mobile Number</CLabel>
                    <CInput />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="4">
                    <CLabel>Current Total Fee</CLabel>
                    <CInput />
                  </CCol>
                  <CCol md="4">
                    <CLabel>Paid Fee</CLabel>
                    <CInput />
                  </CCol>
                  <CCol md="4">
                    <CLabel>Pending Fee</CLabel>
                    <CInput />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                Submit
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default UpdateStudent;
