import React from "react";
import Styles from "./Pendaftaran.module.scss";

import { IPendaftaranProps } from "./Pendaftaran.d";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3/Step3";

function Pendaftaran({}: IPendaftaranProps) {
  const [step, setStep] = React.useState(1);
  const [registrationId, setRegistrationId] = React.useState(0);
  const [city, setCity] = React.useState<string>("Barito Selatan");
  const [candidates, setCandidates] = React.useState<string[]>([]);
  const [photo, setPhoto] = React.useState<string[]>([]);

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
            onSuccessfulSubmit={(city, candidatesName, photo) => {
              setStep(3);
              setCity(city);
              setCandidates(candidatesName);
              setPhoto(photo);
            }}
          />
        );
      case 3:
        return <Step3 photo={photo} city={city} candidates={candidates} />;
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
