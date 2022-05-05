import styled from "styled-components";

const Typography = {
  H1: styled.h1`
    font-size: 36px;
    font-family: "Mulish";
    font-weight: 400;
    font-style: normal;
    line-height: 120%;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  H2: styled.h2`
    font-size: 24px;
    font-weight: 800;
    font-family: "Mulish";
    line-height: 26px;
    text-decoration: none;
    /* text-transform: uppercase; */
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  H3: styled.h3`
    font-size: 21px;
    font-family: "Mulish";
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0.08em;
    text-decoration: none;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  H4SemiBold: styled.h4`
    font-size: 16px;
    font-family: "Mulish";
    font-weight: 600;
    font-style: normal;
    line-height: 170%;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  H4Bold: styled.h4`
    font-size: 16px;
    font-family: "Mulish";
    font-weight: 700;
    font-style: normal;
    line-height: 26px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,

  BaseRegular: styled.p`
    font-size: 14px;
    font-family: "Mulish";
    font-weight: 400;
    font-style: normal;
    line-height: 140%;
    text-decoration: none;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  BaseSemiBold: styled.p`
    font-size: 14px;
    font-family: "Mulish";
    font-weight: 600;
    font-style: normal;
    line-height: 170%;
    text-decoration: none;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  BaseBold: styled.p`
    font-size: 14px;
    font-family: "Mulish";
    font-weight: 700;
    font-style: normal;
    line-height: 100%;
    text-decoration: none;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  BaseExtraBold: styled.p`
    font-size: 14px;
    font-family: "Mulish";
    line-height: 170%;
    text-decoration: none;
    font-weight: 800;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  XS1: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-decoration: none;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  XS2Semibold: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 100%;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  XS2Bold: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 100%;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  XL1Semibold: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 26px;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  XL1Extrabold: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 26px;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  Button: styled.p`
    font-family: "Mulish";
    font-style: normal;

    font-size: 14px;
    line-height: 100%;
    /* text-transform: uppercase; */
    letter-spacing: 0.1em;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  Caption: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    text-transform: uppercase;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  CreditCount: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    text-transform: uppercase;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  GolRegular: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
  GolExtraBold: styled.p`
    font-family: "Mulish";
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 26px;
    text-transform: uppercase;
    color: ${(props) => (props.color ? props.color : "inherit")};
  `,
};

export default Typography;
