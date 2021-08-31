import React, { useState, useEffect } from "react";
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
import axios from "axios";

const BasicForms = () => {
  // const [collapsed, setCollapsed] = useState(true);
  // const [showElements, setShowElements] = useState(true);

  const [regNo, setRegNo] = useState("");
  const [semister, setSemister] = useState("");

  const [subject1, setSubject1] = useState("");
  const [subject2, setSubject2] = useState("");
  const [subject3, setSubject3] = useState("");
  const [subject4, setSubject4] = useState("");
  const [subject5, setSubject5] = useState("");
  const [subject6, setSubject6] = useState("");
  const [subject7, setSubject7] = useState("");

  const [marks1, setMarks1] = useState(0);
  const [marks2, setMarks2] = useState(0);
  const [marks3, setMarks3] = useState(0);
  const [marks4, setMarks4] = useState(0);
  const [marks5, setMarks5] = useState(0);
  const [marks6, setMarks6] = useState(0);
  const [marks7, setMarks7] = useState(0);

  const [result, setResult] = useState("");
  const [remarks, setRemarks] = useState("");
  const [totalMarks, setTotalMarks] = useState(tM);

  let marks = [
    {
      subject: subject1,
      marks: marks1,
    },
    {
      subject: subject2,
      marks: marks2,
    },
    {
      subject: subject3,
      marks: marks3,
    },
    {
      subject: subject4,
      marks: marks4,
    },
    {
      subject: subject5,
      marks: marks5,
    },
  ];

  const eachmarks = marks.map((el) => {
    return parseInt(el.marks);
  });

  let tM = eachmarks.reduce((acc, cV) => parseInt(acc) + parseInt(cV));
  console.log(tM);

  useEffect(() => {
    setTotalMarks(tM);
  }, [marks1, marks2, marks3, marks4]);

  let marksCard = {
    semister: semister,
    marks: marks,
  };

  const mC = {
    student_id: regNo,
    updated_by: "123123",
    marksCard_list: marksCard,
    totalMarks: totalMarks,
    result: result,
    remarks: remarks,
  };

  const submitFormHandler = () => {
    axios
      .post("http://localhost:5000/api/addmarks-card", mC)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Add Fee Structure
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Registration Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Enter Valid USN"
                      onChange={(e) => setRegNo(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select Semister</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setSemister(e.target.value)}
                    >
                      <option value="0">Select Semister</option>
                      <option value="sem-1">Sem 1</option>
                      <option value="sem-2">Sem 2</option>
                      <option value="sem-3">Sem 3</option>
                      <option value="sem-4">Sem 4</option>
                      <option value="sem-5">Sem 5</option>
                      <option value="sem-6">Sem 6</option>
                      <option value="sem-7">Sem 7</option>
                      <option value="sem-8">Sem 8</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select Subject 1</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setSubject1(e.target.value)}
                    >
                      <option value="0">Select Subject-1</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="3">Option #4</option>
                      <option value="3">Option #5</option>
                      <option value="3">Option #6</option>
                    </CSelect>
                  </CCol>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Subject-1 Marks</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Enter Subject-1 Marks"
                      onChange={(e) => setMarks1(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select Subject 2</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setSubject2(e.target.value)}
                    >
                      <option value="0">Select Subject-2</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="3">Option #4</option>
                      <option value="3">Option #5</option>
                      <option value="3">Option #6</option>
                    </CSelect>
                  </CCol>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Subject-2 Marks</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Enter Subject-2 Marks"
                      onChange={(e) => setMarks2(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select Subject 3</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setSubject3(e.target.value)}
                    >
                      <option value="0">Select Subject-3</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="3">Option #4</option>
                      <option value="3">Option #5</option>
                      <option value="3">Option #6</option>
                    </CSelect>
                  </CCol>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Subject-1 Marks</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Enter Subject-3 Marks"
                      onChange={(e) => setMarks3(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select Subject 4</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setSubject4(e.target.value)}
                    >
                      <option value="0">Select Subject-4</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="3">Option #4</option>
                      <option value="3">Option #5</option>
                      <option value="3">Option #6</option>
                    </CSelect>
                  </CCol>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Subject-4 Marks</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Enter Subject-4 Marks"
                      onChange={(e) => setMarks4(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select Subject 5</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setSubject5(e.target.value)}
                    >
                      <option value="0">Select Subject-5</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="3">Option #4</option>
                      <option value="3">Option #5</option>
                      <option value="3">Option #6</option>
                    </CSelect>
                  </CCol>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Subject-5 Marks</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Enter Subject-5 Marks"
                      onChange={(e) => setMarks5(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Total Marks</CLabel>
                  </CCol>

                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      value={totalMarks}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select Result</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setResult(e.target.value)}
                    >
                      <option value="">Select Result</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Remarks</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="If any..."
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitFormHandler}
              >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>{" "}
              &nbsp;
              <CButton type="reset" size="sm" color="danger">
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default BasicForms;
