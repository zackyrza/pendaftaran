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
                  Pastikan koneksi Internet stabil.
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  Pendaftaran dilakukan oleh perwakilan masing – masing <br />
                  cabang olahraga.
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  Persiapan email perwakilan cabang olahraga.
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  Persiapkan data identitas atlet yang akan didaftarkan <br />{" "}
                  dalam format jpg, .png (Pas Foto, KTP dan Ijazah).
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  Isi dan selesaikan Form pendaftaran sesuai petunjuk.
                </p>
              </li>
              <li>
                <p className={Styles["text"]}>
                  File yang di upload maksimal 10 MB <br /> ( Kompres file
                  terlebih dahulu jika melebihi kapasitas maksimal ).
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
