import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMarksCard } from "../../reduxStore/actions/marksActions";
import {
  CBadge,
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CForm,
  CSelect,
  CLabel,
  CFormGroup,
} from "@coreui/react";

const fields = ["Subject Name", "Internal", "External", "Total", "Result"];

const MarksView = () => {
  const dispatch = useDispatch();

  const [semister, setSemister] = useState("sem-1");
  const [IA_type, setIA] = useState("IA-1");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { semister, IA_type, student_id: "1234" };
    console.log(data);

    dispatch(getMarksCard(data));
  };

  const state = useSelector((state) => state.marksCard);
  console.log(state);
  const showMarksCardList = (
    <CCol style={{ marginTop: "16px" }}>
      <CCard>
        <CCardHeader style={{ textTransform: "uppercase" }}>
          {state.studentCard && state.studentCard !== null
            ? state.studentCard.student.semister
            : null}
        </CCardHeader>

        <CCardBody>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Subject </th>
                <th scope="col">Marks</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {state.studentCard !== null
                ? state.studentCard.student.IA.marks.map((el) => {
                    return (
                      <tr>
                        <th scope="row">1</th>
                        <td>{el.subject}</td>
                        <td>{el.marks}</td>
                        <td>{el.isCompleted}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </CCardBody>
        {/* <CCardBody>
          <CBadge style={{ fontSize: "18px" }} className="mr-5" color="info">
            Subject
          </CBadge>
          <CBadge className="mr-5" style={{ fontSize: "18px" }} color="info">
            Marks
          </CBadge>
        </CCardBody> */}
        {/* <CCardBody>
          {state.semCard !== null
            ? state.studentCard.student.IA.marks.map((el) => {
                return (
                  <div>
                    <span>{el.subject}. </span>
                    <span>{el.marks} </span>
                  </div>
                );
              })
            : null}
        </CCardBody> */}
      </CCard>
    </CCol>
  );

  return (
    <>
      <CRow>
        <CCol xs="6" lg="12">
          <CForm onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel>Select Semester</CLabel>
              <CSelect
                custom
                name="select"
                id="select"
                value={semister}
                onChange={(e) => {
                  setSemister(e.target.value);
                }}
              >
                <option value="sem-1">Sem 1</option>
                <option value="sem-2">Sem 2</option>
                <option value="sem-3">Sem 3</option>
                <option value="sem-4">Sem 4</option>
                <option value="sem-5">Sem 5</option>
                <option value="sem-6">Sem 6</option>
                <option value="sem-7">Sem 7</option>
                <option value="sem-8">Sem 8</option>
              </CSelect>
            </CFormGroup>

            <CFormGroup>
              <CLabel>Select IA</CLabel>
              <CSelect
                custom
                value={IA_type}
                onChange={(e) => {
                  setIA(e.target.value);
                }}
              >
                <option value="IA-1">IA 1</option>
                <option value="IA-2">IA 2</option>
                <option value="IA-3">IA 3</option>
                <option value="IA-4">IA 4</option>
              </CSelect>
            </CFormGroup>
            <CButton
              type="submit"
              color="success"
              style={{ textTransform: "uppercase" }}
            >
              {`GET ${semister} MARKSCARD`}
            </CButton>
          </CForm>
          <div>
            {state.semCard !== null && state.errorMessage == null
              ? showMarksCardList
              : state.errorMessage !== null
              ? state.errorMessage !== null
                ? JSON.stringify(state.errorMessage)
                : null
              : null}
          </div>
        </CCol>
      </CRow>
    </>
  );
};
export default MarksView;
