import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import "./modalData.css";

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
} from "@coreui/react";
import axios from "axios";
import { getStudents } from "../../reduxStore/actions/student_op_actions";

const ViewAllStudents = () => {
  const dispatch = useDispatch();

  const [tableState, setTableState] = useState(false);
  const [studentList, setStudentList] = useState("");
  const [academic, setAcademic] = useState("2021-2022");
  const [branch, setBranch] = useState("CSE");
  const [semister, setSemister] = useState("sem-1");
  const [error, setErrorData] = useState("");
  const state = useSelector((state) => state.studentReducer.studentData);
  console.log(studentList, "aaaaa ");

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

    console.log(data);
    dispatch(getStudents(data));

    // axios
    //   .post("http://localhost:5000/api/get-students", {
    //     ...data,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setStudentList(res.data);
    //     setErrorData(null);
    //   })
    //   .catch((error) => {
    //     setStudentList(null);
    //     setErrorData(error.response.data.message);
    //     console.log(error);
    //   });
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

  // Modal data
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rowEvents = {
    onClick: (e, row) => {
      setModalInfo(row);
      toggleTrueFalse();
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  const ModalContent = () => {
    return (
      <Modal show={show} onhide={handleClose}>
        <Modal.Header>
          <Modal.Title>Student Information</Modal.Title>
          <Button variant="primary" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <section className="rt-container">
            <div className="rt-container">
              <div className="col-rt-12">
                <div className="Scriptcontent">
                  <div className="student-profile py-4">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="card shadow-sm">
                            <div className="card-header bg-transparent text-center">
                              <img
                                className="profile_img"
                                src="https://source.unsplash.com/600x300/?student"
                                alt="student dp"
                              />
                              <h3>{modalInfo.stud_fname}</h3>
                            </div>
                            <div className="card-body">
                              <p className="mb-0">
                                <strong className="pr-1">Student ID:</strong>
                                {modalInfo.stud_reg_num}
                              </p>
                              <p className="mb-0">
                                <strong className="pr-1">Semister:</strong>
                                {modalInfo.stud_sem}
                              </p>
                              <p className="mb-0">
                                <strong className="pr-1">Section:</strong>A
                              </p>
                            </div>
                          </div>

                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0">General Information</h3>
                          </div>

                          <table
                            class="table table-bordered"
                            style={{ marginBottom: "0px" }}
                          >
                            <tr>
                              <th width="30%">Year</th>
                              <td width="2%">:</td>
                              <td>{modalInfo.stud_ac_year}</td>
                            </tr>
                            <tr>
                              <th width="30%">Gender</th>
                              <td width="2%">:</td>
                              <td>{modalInfo.stud_gender}</td>
                            </tr>
                            <tr>
                              <th width="30%">Religion</th>
                              <td width="2%">:</td>
                              <td>Group</td>
                            </tr>
                            <tr>
                              <th width="30%">Blood</th>
                              <td width="2%">:</td>
                              <td>B+</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
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
  /*  TABLE CODE DO NOT ALTER*/

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/students/get-student")
  //     .then((response) => response.json())
  //     .then((result) => setStudentList(result));
  // }, []);

  const showTable = (
    <CRow style={{ marginTop: "14px" }}>
      {tableState === false ? (
        <div>
          <BootstrapTable
            bootstrap4
            keyField="id"
            columns={columns}
            data={studentList && studentList.students}
            pagination={pagination}
            filter={filterFactory()}
            rowEvents={rowEvents}
          />
          , {show ? <ModalContent /> : null}
        </div>
      ) : (
        <h2>2</h2>
      )}
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

          <div>{showTable}</div>
        </CCol>
      </CRow>
    </>
  );
};

export default ViewAllStudents;
