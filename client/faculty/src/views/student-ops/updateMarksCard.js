import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMarksCardFaculty,
  updateMarksFaculty,
} from "../../reduxStore/actions/updateMarks.actions";
import {
  CBadge,
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CSelect,
  CLabel,
  CFormGroup,
  CInput,
} from "@coreui/react";

const fields = ["Subject Name", "Internal", "External", "Total", "Result"];

const MarksView = () => {
  const dispatch = useDispatch();

  const [semister, setSemister] = useState("sem-1");
  const [IA, setIA] = useState("IA-1");
  const [student_id, setStudentId] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [isCompleted, setCompleted] = useState();
  // const [seletedMarksCard, setSeletedMarksCard] = useState();
  const [seletedMarksCard, setSeletedMarksCard] = useState();

  // let sub = seletedMarksCard && seletedMarksCard[0].marks;

  // let marksArray = seletedMarksCard && seletedMarksCard;

  // const addToMaksArr = (e, marks) => {
  //   e.preventDefault();
  //   setShowEdit(!showEdit);
  //   setSeletedMarksCard(marks);
  //   console.log(
  //     marks.map((el) => {
  //       return {
  //         ...el,
  //       };
  //     })
  //   );
  // marksArray = marks.map((el) => {
  //   return {
  //     ...el,
  //   };
  // });
  // };

  // console.log(marksArray);

  // console.log(seletedMarksCard && seletedMarksCard[0].marks, sub);

  const data = {
    reg: student_id,
    sem: semister,
    IA_Type: IA,
    marks: seletedMarksCard,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEdit(false);
    dispatch(getMarksCardFaculty(semister, student_id, IA));
  };

  const handleSubmitForUpdate = (event) => {
    event.preventDefault();
    dispatch(updateMarksFaculty(data));
  };
  const addMarksToState = (e, marks) => {
    e.preventDefault();
    setShowEdit(!showEdit);
    setSeletedMarksCard(marks);
  };
  console.log(seletedMarksCard);
  const state = useSelector((state) => state.marksCard);

  //Marks card display
  const showMarksCardList = (
    <CCol style={{ marginTop: "16px" }}>
      <CCard>
        <CCardHeader style={{ textTransform: "uppercase" }}>
          {state.semCard !== null ? state.semCard.student.semister : null}
        </CCardHeader>
        {showEdit === false ? (
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
                {state.semCard !== null
                  ? state.semCard.student.IA.marks.map((el) => {
                      return (
                        <tr>
                          <th scope="row">1</th>
                          <td>{el.subject}</td>
                          <td>{el.marks}</td>
                          <td>{el.result}</td>
                        </tr>
                      );
                    })
                  : null}
                <CButton
                  type="submit"
                  onClick={(event) =>
                    addMarksToState(event, state.semCard.student.IA.marks)
                  }
                >
                  {" "}
                  Edit
                  {/*  {---------------------------------EDIT} */}
                </CButton>
              </tbody>
            </table>
          </CCardBody>
        ) : (
          <CForm onSubmit={handleSubmitForUpdate}>
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
                  {seletedMarksCard !== undefined
                    ? seletedMarksCard.map((el) => {
                        return (
                          <tr>
                            <th scope="row">1</th>
                            <td>{el.subject}</td>
                            <td>
                              <CInput
                                type="number"
                                defaultValue={el.marks}
                                onChange={(e) => {
                                  if (el._id) {
                                    let findID = seletedMarksCard.findIndex(
                                      (sub) => {
                                        return el._id === sub._id;
                                      }
                                    );
                                    let newArr = [...seletedMarksCard];
                                    newArr[findID] = {
                                      ...newArr[findID],
                                      marks: parseInt(e.target.value),
                                    };
                                    console.log(seletedMarksCard[findID].marks);
                                    setSeletedMarksCard(newArr);
                                  }
                                }}
                              />
                            </td>
                            <td>
                              {" "}
                              <CSelect
                                defaultValue={el.isCompleted}
                                onChange={(e) => {
                                  if (el._id) {
                                    let findID = seletedMarksCard.findIndex(
                                      (sub) => {
                                        return el._id === sub._id;
                                      }
                                    );
                                    let newArr = [...seletedMarksCard];
                                    newArr[findID] = {
                                      ...newArr[findID],
                                      isCompleted: e.target.value,
                                    };
                                    console.log(
                                      seletedMarksCard[findID].isCompleted
                                    );
                                    setSeletedMarksCard(newArr);
                                  }
                                }}
                              >
                                {" "}
                                <option value="pass">Pass</option>
                                <option value="fail">Fail</option>
                              </CSelect>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </CCardBody>
            {/* <input type="text" value={0} /> */}
            <CButton color="danger" onClick={() => setShowEdit(!showEdit)}>
              Cancel
            </CButton>{" "}
            <CInput type="submit" value="Submit" />
          </CForm>
        )}
      </CCard>
    </CCol>
  );

  return (
    <>
      <CRow>
        <CCol xs="6" lg="12">
          <CForm onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel>Enter Student USN</CLabel>
              <CInput
                type="text"
                value={student_id}
                onChange={(e) => {
                  setStudentId(e.target.value);
                }}
              ></CInput>
            </CFormGroup>
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
                <option value="sem-3">3</option>
                <option value="sem-4">4</option>
                <option value="sem-5">5</option>
                <option value="sem-6">6</option>
                <option value="sem-7">7</option>
                <option value="sem-8">8</option>
              </CSelect>
            </CFormGroup>
            <CFormGroup>
              <CLabel>Select IA</CLabel>
              <CSelect
                custom
                value={IA}
                onChange={(e) => {
                  setIA(e.target.value);
                }}
              >
                <option value="IA-1">IA 1</option>
                <option value="IA-2">IA 2</option>
                <option value="IA-3">3</option>
                <option value="IA-4">4</option>
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
