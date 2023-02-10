import React from "react";
import Styles from "./Step2.module.scss";

import dayjs from "dayjs";
import { Button, DatePickerProps } from "antd";
import {
  Input,
  PaginationProps,
  Pagination,
  DatePicker,
  Select,
  message,
} from "antd";

import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";

import { IStep2Props } from "./Step2.d";
import { usePendaftaran } from "Helpers/Hooks/Api/usePendaftaran";
import { IKandidatPost } from "Helpers/Interface/Kandidat";
import { useKandidat } from "Helpers/Hooks/Api/useKandidat";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { API_URL, IMAGE_URL } from "Config";

type candidateKey =
  | "name"
  | "registrationId"
  | "status"
  | "nik"
  | "gender"
  | "placeOfBirth"
  | "birthDate"
  | "age"
  | "education"
  | "bloodType"
  | "rhesusType"
  | "weight"
  | "height"
  | "handphone"
  | "religion"
  | "occupation"
  | "maritalStatus"
  | "photo"
  | "email";

function Step2({ registrationId, onSuccessfulSubmit }: IStep2Props) {
  const { getPendaftaranById, pendaftaranDetail } = usePendaftaran();
  const { createKandidat } = useKandidat();
  const [messageApi, contextHolder] = message.useMessage();

  const [loadingUpload, setLoading] = React.useState<boolean>(false);
  const [photo, setPhoto] = React.useState<string[]>([]);
  const [current, setCurrent] = React.useState(1);
  const [candidates, setCandidates] = React.useState<IKandidatPost[]>([]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("File yang bisa dipakai hanyalah file JPG atau PNG!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Foto harus lebih kecil dari 10MB!");
    }
    return isJpgOrPng && isLt10M;
  };

  const handleUpload: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      const newPhoto = [...photo];
      newPhoto[current - 1] = `${API_URL}${info.file.response.data}`;
      setPhoto(newPhoto);
    }
  };

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  React.useEffect(() => {
    getPendaftaranById(registrationId).then((res) => {
      const newPhoto = new Array(res.quantity).fill("");
      const newCandidates = new Array(res.quantity).fill({
        name: "",
        registrationId,
        status: "Atlet",
        nik: "",
        gender: "",
        placeOfBirth: "",
        birthDate: new Date(),
        age: 0,
        education: "",
        bloodType: "",
        rhesusType: "",
        weight: 0,
        height: 0,
        handphone: "",
        religion: "",
        occupation: "",
        maritalStatus: "",
        email: "",
        photo: "",
      });
      setCandidates(newCandidates);
      setPhoto(newPhoto);
    });
  }, [registrationId]);

  const onSubmit = async () => {
    try {
      let anyEmpty = false;
      await candidates.forEach(async (element) => {
        const keys = Object.keys(element);
        await keys.forEach((key) => {
          if (
            element[key as candidateKey] === "" ||
            (!element[key as candidateKey] &&
              key !== "rhesusType" &&
              key !== "photo")
          ) {
            anyEmpty = true;
          }
        });
      });
      if (anyEmpty) {
        messageApi.error("Mohon isi semua data");
        return;
      }
      await candidates.forEach(async (element) => {
        await createKandidat(element);
      });
      messageApi.success("Para peserta berhasil didaftarkan");
      setTimeout(() => {
        onSuccessfulSubmit();
      }, 1000);
    } catch (error) {
      messageApi.error("Terjadi kesalahan saat mengirim data");
    }
  };

  const renderForm = () => {
    const currIndex = current - 1;
    const currentCandidate = candidates[currIndex];

    const uploadButton = (
      <div>
        {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      key: candidateKey
    ) => {
      const newCandidates = [...candidates];
      newCandidates[currIndex] = {
        ...newCandidates[currIndex],
        [key]: e.target.value,
      };
      setCandidates(newCandidates);
    };

    const handleChange = (value: string) => {
      const newCandidates = [...candidates];
      newCandidates[currIndex] = {
        ...newCandidates[currIndex],
        gender: value,
      };
      setCandidates(newCandidates);
    };

    const handleChangeMarital = (value: string) => {
      const newCandidates = [...candidates];
      newCandidates[currIndex] = {
        ...newCandidates[currIndex],
        maritalStatus: value,
      };
      setCandidates(newCandidates);
    };

    const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
      if (!date) return;
      const newCandidates = [...candidates];
      newCandidates[currIndex] = {
        ...newCandidates[currIndex],
        birthDate: date?.toDate(),
        age: dayjs().diff(date, "year"),
      };
      setCandidates(newCandidates);
    };

    return (
      <div className={Styles["form"]}>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Nama Lengkap</p>
          <Input
            placeholder="Masukkan Nama lengkap peserta"
            value={currentCandidate?.name}
            onChange={(e) => onChange(e, "name")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Email</p>
          <Input
            type="email"
            placeholder="Masukkan Email peserta"
            value={currentCandidate?.email}
            onChange={(e) => onChange(e, "email")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>NIK</p>
          <Input
            type="number"
            placeholder="Masukkan Nomor Induk Kependudukan (KTP) peserta"
            value={currentCandidate?.nik}
            onChange={(e) => onChange(e, "nik")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Status pada Kontingen</p>
          <Input
            placeholder="Masukkan status peserta"
            value={currentCandidate?.status}
            onChange={(e) => onChange(e, "status")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Jenis Kelamin</p>
          <Select
            placeholder={"Masukkan Jenis Kelamin peserta"}
            value={currentCandidate?.gender}
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              { value: "laki-laki", label: "Laki - Laki" },
              { value: "perempuan", label: "Perempuan" },
            ]}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Tempat Lahir</p>
          <Input
            placeholder="Masukkan tempat lahir peserta"
            value={currentCandidate?.placeOfBirth}
            onChange={(e) => onChange(e, "placeOfBirth")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Tanggal Lahir</p>
          <DatePicker
            style={{ width: "100%" }}
            onChange={onChangeDate}
            value={dayjs(currentCandidate?.birthDate)}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Umur</p>
          <Input
            type="number"
            placeholder="Masukkan umur peserta"
            value={currentCandidate?.age}
            onChange={(e) => onChange(e, "age")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Pendidikan Terakhir</p>
          <Input
            placeholder="Masukkan pendidikan terakhir peserta"
            value={currentCandidate?.education}
            onChange={(e) => onChange(e, "education")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Golongan Darah</p>
          <Input
            placeholder="Masukkan golongan darah peserta"
            value={currentCandidate?.bloodType}
            onChange={(e) => onChange(e, "bloodType")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Rhesus</p>
          <Input
            placeholder="Masukkan tipe rhesus peserta"
            value={currentCandidate?.rhesusType}
            onChange={(e) => onChange(e, "rhesusType")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Berat Badan</p>
          <Input
            placeholder="Masukkan berat badan peserta"
            value={currentCandidate?.weight}
            onChange={(e) => onChange(e, "weight")}
            suffix="kg"
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Tinggi badan</p>
          <Input
            placeholder="Masukkan tinggi badan peserta"
            value={currentCandidate?.height}
            onChange={(e) => onChange(e, "height")}
            suffix="cm"
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>No. Handphone</p>
          <Input
            type="number"
            placeholder="Masukkan nomor telepon peserta"
            value={currentCandidate?.handphone}
            onChange={(e) => onChange(e, "handphone")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Agama</p>
          <Input
            placeholder="Masukkan agama peserta"
            value={currentCandidate?.religion}
            onChange={(e) => onChange(e, "religion")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Pekerjaan</p>
          <Input
            placeholder="Masukkan pekerjaan peserta"
            value={currentCandidate?.occupation}
            onChange={(e) => onChange(e, "occupation")}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Status Kawin</p>
          <Select
            placeholder={"Masukkan Status perkawinan peserta"}
            value={currentCandidate?.maritalStatus}
            style={{ width: "100%" }}
            onChange={handleChangeMarital}
            options={[
              { value: "kawin", label: "Kawin" },
              { value: "belum kawin", label: "Belum Kawin" },
            ]}
          />
        </div>
        <div className={Styles["form-item"]}>
          <p className={Styles["title"]}>Pas Foto</p>
          <Upload
            action={API_URL + "/uploads"}
            name="file"
            listType="picture-card"
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            showUploadList={false}
          >
            {photo[current] ? (
              <img
                src={`${IMAGE_URL}${photo[current]}`}
                alt="avatar"
                style={{ width: 100, height: 100, objectFit: "contain" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className={Styles["form-item"]}>
          <Button
            type="primary"
            block
            onClick={() => {
              if (current !== pendaftaranDetail.quantity) {
                setCurrent(current + 1);
              } else {
                onSubmit();
              }
            }}
          >
            {current !== pendaftaranDetail.quantity
              ? "Peserta selanjutnya"
              : "Input Data"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={Styles["wrapper"]}>
      {contextHolder}
      <div className={Styles["page-title"]}>
        <p>Pendaftaran Tahap 2</p>
      </div>
      <div className={Styles["page-content"]}>
        {renderForm()}
        <Pagination
          current={current}
          total={pendaftaranDetail.quantity}
          pageSize={1}
          onChange={onChangePage}
        />
      </div>
    </div>
  );
}

export default Step2;
