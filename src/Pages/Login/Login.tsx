import React from "react";
import Styles from "./Login.module.scss";
import { Button, message, Form, Input } from "antd";

import { ILoginProps } from "./Login.d";
import { useNavigate } from "react-router-dom";
import { useAuth } from "Helpers/Hooks/Api/useAuth";

function Login({}: ILoginProps) {
  const navigate = useNavigate();
  const [formType, setFormType] = React.useState<"login" | "register">("login");
  const { createUser, login } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinishLogin = (values: any) => {
    // login(values.email, values.password)
    //   .then(() => {
    //     messageApi.success("Login berhasil!");
    //     setTimeout(() => {
    //       navigate("/pendaftaran");
    //     }, 1000);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     messageApi.error("Email atau password salah!");
    //   });
    localStorage.setItem("email", values.email);
    navigate("/pendaftaran");
  };

  const onFinishLoginFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishRegister = (values: any) => {
    createUser({
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      role: "pendaftar",
    })
      .then(() => {
        messageApi.success("Pendaftaran berhasil!");
        login(values.email, values.password)
          .then(() => {
            navigate("/pendaftaran");
          })
          .catch((err) => {
            messageApi.error(
              "Login otomatis gagal! Silahkan login secara manual."
            );
            setFormType("login");
          });
      })
      .catch((err) => {
        console.log(err);
        messageApi.error("Email atau password salah!");
      });
  };

  const onFinishRegisterFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const renderForm = () => {
    if (formType === "login") {
      return (
        <Form
          name="login"
          onFinish={onFinishLogin}
          onFinishFailed={onFinishLoginFailed}
          autoComplete="off"
          className={Styles["form-wrapper"]}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Tolong masukkan email anda!" },
              { type: "email", message: "Email tidak valid!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <p className={Styles["notes"]}>
            *Pastikan alamat email anda harus benar sesuai dengan cabor masing"
            dan kabupaten/kota karena data yg anda masukkan akan masuk ke dalam
            email dan dapat di download serta di print
          </p>

          {/* <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Tolong masukkan password anda!" },
            ]}
          >
            <Input.Password />
          </Form.Item> */}

          {/* <Form.Item>
            <Button type="text" block onClick={() => setFormType("register")}>
              Belum punya akun? Daftar sekarang!
            </Button>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lanjut
            </Button>
          </Form.Item>
        </Form>
      );
    }
    return (
      <Form
        name="register"
        onFinish={onFinishRegister}
        onFinishFailed={onFinishRegisterFailed}
        autoComplete="off"
        className={Styles["form-wrapper"]}
      >
        <Form.Item
          label="Nama Lengkap"
          name="fullName"
          rules={[
            { required: true, message: "Tolong masukkan nama lengkap anda!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Tolong masukkan email anda!" },
            { type: "email", message: "Email tidak valid!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Tolong masukkan password anda!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="text" block onClick={() => setFormType("login")}>
            Sudah punya akun? Masuk sekarang!
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className={Styles["wrapper"]}>
      {contextHolder}
      <div className={Styles["form"]}>{renderForm()}</div>
    </div>
  );
}

export default Login;
