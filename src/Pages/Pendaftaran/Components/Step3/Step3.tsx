import React from "react";
import Styles from "./Step3.module.scss";

import { Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

import { IStep3Props } from "./Step3.d";
import { IMAGE_URL } from "Config";
import background from "Images/id-card-bg.png";

function Step3({ candidates, city, photo }: IStep3Props) {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const renderCard = () => {
    return candidates.map((candidate, index) => {
      return (
        <div className={Styles["card"]} key={index}>
          <div className={Styles["card__photo"]}>
            <img src={`${IMAGE_URL}${photo[index]}`} alt="candidate" />
          </div>
          <div className={Styles["card__name"]}>
            <p>{candidate}</p>
            <div className={Styles["divider"]} />
            <p>{city}</p>
          </div>
          <div className={Styles["card__position"]}>
            <p>ATLET</p>
          </div>
          <div className={Styles["card__location"]}>
            <p>Kotawaringin Timur - 19 Juni 2023</p>
          </div>
        </div>
      );
    });
  };

  const renderCardPrint = () => {
    return candidates.map((candidate, index) => {
      return (
        <>
          <div
            style={{
              width: 210,
              height: 357,
              backgroundImage: `url(${background})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: index % 8 === 0 && index !== 0 ? 60 : 0,
            }}
            key={index}
          >
            <div
              style={{
                width: 80,
                height: 80,
                marginTop: 100,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  border: "2px solid dimgray",
                  backgroundImage: `url(${IMAGE_URL}${photo[index]})`,
                  backgroundSize: "contain",
                }}
              />
            </div>
            <div
              style={{
                width: "82%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#000",
                  margin: 0,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {candidate}
              </p>
              <div
                style={{
                  width: "80%",
                  height: 3,
                  backgroundColor: "#000",
                  margin: "5px 0px",
                }}
              />
              <p
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#000",
                  margin: 0,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {city}
              </p>
            </div>
            <div
              style={{
                width: "82%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontWeight: "800",
                  color: "#000",
                  margin: 0,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                ATLET
              </p>
            </div>
            <div
              style={{
                width: "82%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <p
                style={{
                  fontSize: 9,
                  fontWeight: "800",
                  color: "#000",
                  margin: 0,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Kotawaringin Timur - 19 Juni 2023
              </p>
            </div>
          </div>
        </>
      );
    });
  };

  const renderPrint = () => {
    return (
      <div className={Styles["for-printing"]}>
        <div
          id="print"
          ref={componentRef}
          style={{
            width: "210mm",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            backgroundColor: "#fff",
            marginTop: 25,
          }}
        >
          {renderCardPrint()}
        </div>
      </div>
    );
  };

  return (
    <div className={Styles["wrapper"]}>
      <div className={Styles["page-title"]}>
        <p>Pencetakan Kartu Peserta</p>
      </div>
      {renderPrint()}
      <div className={Styles["render"]}>{renderCard()}</div>
      <div className={Styles["print-button"]}>
        <Button
          type="primary"
          icon={<PrinterOutlined />}
          size={"large"}
          onClick={handlePrint}
        >
          Cetak
        </Button>
      </div>
    </div>
  );
}

export default Step3;
