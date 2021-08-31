import React, { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";
import "../component/ui/modalData.css";

import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = () => {
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

  const onClickProfile = () => {
    <ModalContent />;
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

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>

        <CDropdownItem onClick={onClickProfile} rowEvents={rowEvents}>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Sign Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
