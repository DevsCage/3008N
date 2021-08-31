import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CForm,
  CInput,
  CInputCheckbox,
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import { DocsLink } from "src/reusable";

const Toaster = (props) => {
  const positions = [
    "static",
    "top-left",
    "top-center",
    "top-right",
    "top-full",
    "bottom-left",
    "bottom-center",
    "bottom-right",
    "bottom-full",
  ];

  const [toasts, setToasts] = useState([
    { position: "bottom-right", autohide: 3000 },
  ]);

  const [position, setPosition] = useState("top-right");
  const [autohide, setAutohide] = useState(true);
  const [autohideValue, setAutohideValue] = useState(5000);
  const [closeButton, setCloseButton] = useState(true);
  const [fade, setFade] = useState(true);

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade },
    ]);
  };

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  return (
    <CCol sm="12" lg="6">
      {Object.keys(toasters).map((toasterKey) => (
        <CToaster position={toasterKey} key={"toaster" + toasterKey}>
          {toasters[toasterKey].map((toast, key) => {
            return (
              <CToast
                key={"toast" + key}
                show={true}
                autohide={toast.autohide}
                fade={toast.fade}
                style={{
                  backgroundColor: `rgba(${props.color}, 0.3)`,
                }}
              >
                <CToastHeader closeButton={toast.closeButton}>
                  {props.title}
                </CToastHeader>
                <CToastBody>{props.message}</CToastBody>
              </CToast>
            );
          })}
        </CToaster>
      ))}
    </CCol>
  );
};

export default Toaster;
