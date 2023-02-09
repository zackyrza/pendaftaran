import React from "react";
import Styles from "./Pendaftaran.module.scss";

import { IPendaftaranProps } from "./Pendaftaran.d";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";

function Pendaftaran({}: IPendaftaranProps) {
  const [step, setStep] = React.useState(1);
  const [registrationId, setRegistrationId] = React.useState(0);

  const handleToStep2 = (regId: number) => {
    setRegistrationId(regId);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 goToStep2={handleToStep2} />;
      case 2:
        return (
          <Step2
            registrationId={registrationId}
            onSuccessfulSubmit={() => {
              setStep(1);
              setRegistrationId(0);
            }}
          />
        );
      default:
        return <Step1 goToStep2={handleToStep2} />;
    }
  };

  return (
    <div className={Styles["wrapper"]}>
      <div className={Styles["frame"]}>{renderStep()}</div>
    </div>
  );
}

export default Pendaftaran;
