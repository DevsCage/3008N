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

import { CRow } from "@coreui/react";
import axios from "axios";
import { paymentLogVFetchRequest } from "../../reduxStore/actions/paymentLog.actions";

const PaymentLogUV = () => {
  const dispatch = useDispatch();

  const [tableState, setTableState] = useState(false);
  const [paymentLogList, setPaymentLogList] = useState("");

  const [error, setErrorData] = useState("");
  const state = useSelector((state) => state.paymentLog.data);

  useEffect(() => {
    dispatch(paymentLogVFetchRequest());
  }, []);

  useEffect(() => {
    if (state) setPaymentLogList(state);
    console.log(state);
  }, [state]);

  /*  TABLE CODE DO NOT ALTER*/
  const columns = [
    {
      dataField: "stud_id.stud_reg_num",
      text: "USN",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "stud_payment_list.date", text: "Txn Date", sort: true },
    {
      dataField: "stud_id.stud_fullName",
      text: "Name",
      sort: true,
      filter: textFilter(),
    },

    {
      dataField: "stud_payment_list.stud_academic_year",
      text: "Academic Year",
      sort: true,
    },

    { dataField: "stud_payment_list.verified", text: "Status", sort: true },
  ];

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

  return (
    <>
      <CRow style={{ marginTop: "14px" }}>
        {tableState === false ? (
          <div>
            <BootstrapTable
              bootstrap4
              keyField="id"
              columns={columns}
              data={paymentLogList && paymentLogList}
              pagination={pagination}
              filter={filterFactory()}
              rowEvents={rowEvents}
            />
            {show ? <ModalContent /> : null}
          </div>
        ) : (
          <h2>2</h2>
        )}
      </CRow>
    </>
  );
};

export default PaymentLogUV;
