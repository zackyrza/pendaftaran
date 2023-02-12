import React from "react";
import Styles from "./Home.module.scss";

import { IHomeProps } from "./Home.d";
import { useNavigate } from "react-router-dom";
import { joinClassNames } from "Helpers/Functionality/string";
import { CloseCircleOutlined } from "@ant-design/icons";

function Home({}: IHomeProps) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOnClick = () => {
    navigate("/masuk");
  };

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  }, []);

  return (
    <div className={Styles["wrapper"]}>
      <div className={Styles["button"]} onClick={handleOnClick}>
        <p>Pendaftaran</p>
      </div>
      <div
        className={joinClassNames(
          Styles["modal"],
          open ? Styles["isOpen"] : Styles["isClosed"]
        )}
      >
        <div className={Styles["modal__content"]}>
          <div
            className={Styles["modal__close"]}
            onClick={() => setOpen(false)}
          >
            <CloseCircleOutlined className={Styles["icon"]} />
          </div>
          <div className={Styles["modal__title"]}>
            <p className={Styles["text"]}>Panduan Pendaftaran</p>
          </div>
          <div className={Styles["modal__body"]}>
            <ul>
              <li>
                <p className={Styles["text"]}>
                  Pendaftaran dilakukan oleh perwakilan
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  Persiapkan email perwakilan dengan format (Cabang # Daerah)
                  ex: pobsikotim@gmail.com
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  Persiapkan data identitas atlet yang akan didaftarkan (Pas
                  foto + Foto KTP + Ijazah)
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  Selesaikan dan isi form pendaftaran sesuai petunjuk
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
