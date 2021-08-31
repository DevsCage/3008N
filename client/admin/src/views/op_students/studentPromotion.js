import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CInputCheckbox,
  CCardHeader,
  CTextarea,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import axios from "axios";
import { getStudents } from "../../reduxStore/actions/student_op_actions";
import { addExamFee } from "src/reduxStore/actions/examFeeAction";

const ViewAllStudents = () => {
  const dispatch = useDispatch();

  const [tableState, setTableState] = useState(false);
  const [studentList, setStudentList] = useState("");
  const [academic, setAcademic] = useState("2021-2022");
  const [branch, setBranch] = useState("CSE");
  const [semister, setSemister] = useState("sem-1");
  const [error, setErrorData] = useState("");
  const state = useSelector((state) => state.studentReducer.studentData);

  //checkbox state management

  const [cb1, setCb1] = useState(false);
  const [cb2, setCb2] = useState(false);
  const [cb3, setCb3] = useState(false);

  // input box state managed based on checkbox values

  const [ip1, setIp1] = useState(null);
  const [ip2, setIp2] = useState(null);
  const [ip3, setIp3] = useState(null);

  // table state managed
  const [selectedAllData, setSelectedAllData] = useState([]);

  // onClick dispatch event

  function submitHandler(event) {
    const data = {
      examFeeData: {
        ip1,
        ip2,
        ip3,
      },
      selectedAllData,
    };
    console.log(data, "data");
    dispatch(addExamFee(data.selectedAllData, data.examFeeData));
  }

  const resetInputData = () => {
    setIp1(null);
  };

  useEffect(() => {
    if (state) setStudentList(state);
  }, [state]);

  /* Fetching Data or State from ReduxStore*/

  const handleSubmit = (e) => {
    const data = {
      stud_ac_year: academic,
      stud_branch: branch,
      stud_sem: semister,
    };
    e.preventDefault();

    dispatch(getStudents(data));
  };

  /*  TABLE CODE DO NOT ALTER*/
  const columns = [
    { dataField: "stud_reg_num", text: "ID" },
    {
      dataField: "stud_fname",
      text: "First Name",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "stud_lname", text: "Last Name" },
    { dataField: "stud_ac_year", text: "Academic Year" },
    { dataField: "stud_branch", text: "Branch" },
    { dataField: "stud_sem", text: "Semister" },
    { dataField: "stud_city", text: "City" },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: "Last",
    firstPageText: "First",
    nextPageText: "Next",
    prePageText: "Previous",
    showTotal: true,
    alwaysShowAllBtns: true,

    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,

    //Case1: Working
    onSelectAll: (isSelect, rows, e) => {
      setSelectedAllData(rows);
      if (!isSelect) {
        setSelectedAllData(null);
      }
    },

    // Case2: Working

    onSelect: (row, isSelect, rowIndex, e) => {
      if (!isSelect) {
        let filterData = selectedAllData.filter((data) => {
          return data._id !== row._id;
        });

        setSelectedAllData(filterData);
      } else {
        setSelectedAllData((pS) => [...pS, row]);
      }

      if (
        selectedAllData.length < 1 ||
        selectedAllData == undefined ||
        selectedAllData == null
      ) {
        setSelectedAllData([row]);
      }
    },
  };
  const showTable = (
    <CRow style={{ marginTop: "14px" }}>
      <BootstrapTable
        bootstrap4
        keyField="stud_reg_num"
        columns={columns}
        data={studentList && studentList.students}
        pagination={pagination}
        filter={filterFactory()}
        selectRow={selectRow}
      />
      <CButton
        style={{ marginTop: "8px" }}
        color="success"
        onClick={() => submitHandler()}
      >
        {" "}
        Add Fee
      </CButton>
    </CRow>
  );
  return (
    <>
      <CRow>
        <CCol xs="6" lg="12">
          <CForm onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel>Select Academic Year</CLabel>
              <CSelect
                id="acyear"
                value={academic}
                onChange={(e) => {
                  setAcademic(e.target.value);
                }}
              >
                <option value="2020-2021">2020-2021</option>
                <option value="2019-2020">2019-2020</option>
              </CSelect>
            </CFormGroup>

            <CFormGroup>
              <CLabel>Select Branch</CLabel>
              <CSelect
                id="branch"
                custom
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
              >
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
              </CSelect>
            </CFormGroup>
            <CFormGroup>
              <CLabel>Select Semister</CLabel>
              <CSelect
                custom
                id="sem"
                value={semister}
                onChange={(e) => {
                  setSemister(e.target.value);
                }}
              >
                <option value="sem-1">Sem-1</option>
                <option value="sem-2">Sem-2</option>
              </CSelect>
            </CFormGroup>
            <CButton
              type="submit"
              color="success"
              style={{ textTransform: "uppercase" }}
            >
              Search
            </CButton>
          </CForm>
          <CCard
            style={{
              marginTop: "24px",
              padding: "12px 12px 12px 12px",
            }}
          >
            <CForm>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Select Fee Particular</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      id="inline-checkbox1"
                      name="inline-checkbox1"
                      value={cb1}
                      onChange={() => setCb1(!cb1)}
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor="inline-checkbox1"
                    >
                      Exam Fee
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      id="inline-checkbox2"
                      name="inline-checkbox2"
                      value={cb2}
                      onChange={() => setCb2(!cb2)}
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor="inline-checkbox2"
                    >
                      Suplimentary Fee
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      id="inline-checkbox3"
                      name="inline-checkbox3"
                      value={cb3}
                      onChange={() => setCb3(!cb3)}
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor="inline-checkbox3"
                    >
                      Misc.. Fee
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="4">
                  {cb1 && (
                    <CInput
                      placeholder="Exam Fee"
                      value={ip1}
                      type="Number"
                      onChange={(e) => setIp1(e.target.value)}
                    />
                  )}
                </CCol>
                <CCol xs="4">
                  {cb2 && (
                    <CInput
                      placeholder="Suplimentary Fee"
                      value={ip2}
                      type="Number"
                      onChange={
                        (e) => setIp2(e.target.value)
                        //   console.log(e.target.value)
                      }
                    />
                  )}
                </CCol>
                <CCol xs="4">
                  {cb3 && (
                    <CInput
                      placeholder="Misc Fee"
                      value={ip3}
                      type="Number"
                      onChange={
                        (e) => setIp3(e.target.value)
                        //   console.log(e.target.value)
                      }
                    />
                  )}
                </CCol>
              </CFormGroup>

              <CFormGroup>
                <CButton
                  onClick={resetInputData}
                  color="primary"
                  style={{ marginRight: "12px" }}
                >
                  Reset
                </CButton>
              </CFormGroup>
            </CForm>
          </CCard>
          <div>{showTable}</div>
        </CCol>
      </CRow>
    </>
  );
};

export default ViewAllStudents;
