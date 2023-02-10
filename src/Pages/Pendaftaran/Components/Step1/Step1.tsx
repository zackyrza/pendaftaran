import React from "react";
import Styles from "./Step1.module.scss";

import { Select, Input, Button, message } from "antd";

import { IStep1Props } from "./Step1.d";
import { useKabupaten } from "Helpers/Hooks/Api/useKabupaten";
import { useCabor } from "Helpers/Hooks/Api/useCabor";
import { useKategori } from "Helpers/Hooks/Api/useKategori";
import { usePendaftaran } from "Helpers/Hooks/Api/usePendaftaran";
import { useGender } from "Helpers/Hooks/Api/useGender";
import { IMAGE_URL } from "Config";
import { useMail } from "Helpers/Hooks/Api/useMail";

function Step1({ goToStep2 }: IStep1Props) {
  const [messageApi, contextHolder] = message.useMessage();

  const { getKabupaten, kabupaten } = useKabupaten();
  const { getCabor, cabor, getCaborById, caborDetail } = useCabor();
  const { getKategoriBySportId, kategori } = useKategori();
  const { getGender, gender } = useGender();
  const { createPendaftaran } = usePendaftaran();
  const { sendFirstStepMail } = useMail();

  const [quantity, setQuantity] = React.useState<number>();
  const [cityId, setCityId] = React.useState<number | undefined>(undefined);
  const [caborId, setCaborId] = React.useState<number | undefined>(undefined);
  const [classId, setClassId] = React.useState<number | undefined>(undefined);
  const [sportGenderId, setSportGenderId] = React.useState<number | undefined>(
    undefined
  );

  const onClickDaftar = () => {
    if (!quantity) {
      messageApi.error("Jumlah peserta harus diisi");
      return;
    }
    if (!cityId) {
      messageApi.error("Kabupaten / Kota harus diisi");
      return;
    }
    if (!caborId) {
      messageApi.error("Cabang olahraga harus diisi");
      return;
    }
    if (!classId) {
      messageApi.error("Kategori harus diisi");
      return;
    }
    if (!sportGenderId) {
      messageApi.error("Jenis kelamin harus diisi");
      return;
    }
    createPendaftaran({
      quantity,
      cityId,
      classId,
      email: localStorage.getItem("email") ?? "",
      sportGenderId,
    })
      .then((res) => {
        sendFirstStepMail(caborId, cityId);
        messageApi.success("Pendaftaran berhasil");
        setTimeout(() => goToStep2(res.id), 1000);
      })
      .catch((err) => {
        messageApi.error("Pendaftaran gagal");
      });
  };

  React.useEffect(() => {
    getKabupaten();
    getCabor();
    getGender();
  }, []);

  React.useEffect(() => {
    if (caborId) {
      getCaborById(caborId);
      getKategoriBySportId(caborId);
    }
  }, [caborId]);

  const onChangeCity = (value: string) => {
    setCityId(Number(value));
  };

  const onSearchCity = (value: string) => {
    setCityId(Number(value));
  };

  const onChangeSport = (value: string) => {
    setCaborId(Number(value));
  };

  const onSearchSport = (value: string) => {
    setCaborId(Number(value));
  };

  const onChangeClass = (value: string) => {
    setClassId(Number(value));
  };

  const onSearchClass = (value: string) => {
    setClassId(Number(value));
  };

  const onChangeSportGender = (value: string) => {
    setSportGenderId(Number(value));
  };

  const onSearchSportGender = (value: string) => {
    setSportGenderId(Number(value));
  };

  const renderJuknis = () => {
    if (caborDetail?.noteUrl) {
      return (
        <div className={Styles["info-juknis"]}>
          <p>
            Petunjuk Teknis cabor: <b>{caborDetail?.name}</b>
          </p>
          <iframe src={`${IMAGE_URL}${caborDetail?.noteUrl}`}></iframe>
        </div>
      );
    }
    return null;
  };

  const renderLogo = () => {
    if (caborDetail?.imageUrl) {
      return (
        <div className={Styles["info-logo"]}>
          <img src={`${IMAGE_URL}${caborDetail?.imageUrl}`} alt="logo" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={Styles["wrapper"]}>
      {contextHolder}
      <div className={Styles["page-title"]}>
        <p>Pendaftaran Tahap 1</p>
      </div>
      <div className={Styles["body-step-1"]}>
        <div className={Styles["form"]}>
          <div className={Styles["form-item"]}>
            <p className={Styles["title"]}>Kabupaten / Kota</p>
            <Select
              className={Styles["select"]}
              showSearch
              placeholder="Pilih Kabupaten / Kota"
              optionFilterProp="children"
              onChange={onChangeCity}
              onSearch={onSearchCity}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={kabupaten.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
          <div className={Styles["form-item"]}>
            <p className={Styles["title"]}>Cabang Olahraga</p>
            <Select
              className={Styles["select"]}
              showSearch
              placeholder="Pilih Cabang olahraga"
              optionFilterProp="children"
              onChange={onChangeSport}
              onSearch={onSearchSport}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={cabor.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
          <div className={Styles["form-item"]}>
            <p className={Styles["title"]}>Kategori</p>
            <Select
              className={Styles["select"]}
              showSearch
              placeholder="Pilih kategori cabang olahraga"
              optionFilterProp="children"
              onChange={onChangeClass}
              onSearch={onSearchClass}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={kategori.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
          <div className={Styles["form-item"]}>
            <p className={Styles["title"]}>Gender</p>
            <Select
              className={Styles["select"]}
              showSearch
              placeholder="Pilih gender cabang olahraga"
              optionFilterProp="children"
              onChange={onChangeSportGender}
              onSearch={onSearchSportGender}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={gender.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
          <div className={Styles["form-item"]}>
            <p className={Styles["title"]}>Jumlah</p>
            <Input
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
              placeholder="Jumlah peserta"
              type="number"
            />
          </div>
          <div className={Styles["form-item"]}>
            <Button
              block
              type="primary"
              onClick={onClickDaftar}
              style={{ marginTop: 20 }}
            >
              Daftar
            </Button>
          </div>
        </div>
        <div className={Styles["right-info"]}>
          {renderLogo()}
          {renderJuknis()}
        </div>
      </div>
    </div>
  );
}

export default Step1;
