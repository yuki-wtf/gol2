import * as React from "react";
import styled from "styled-components";
import Typography from "../../Typography/Typography";

const StyledContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
  gap: 16px;
`;
const StyledLogo = styled.div`
  max-width: 78px;
`;
const StyledPageTitle = styled.div`
  position: relative;
  top: -1px;
  height: 20px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.creatorPrimary};
  &:before {
    content: "";
    width: 1px;
    height: 17px;
    background-color: black;
    position: absolute;
    top: 3px;
    left: -1px;
  }
  @media (max-width: 960px) {
    display: none;
  }
`;

const CreatorLogo = (props) => {
  return (
    <StyledContainer>
      <StyledLogo>
        <svg
          width={78}
          height={27}
          viewBox="0 0 78 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 19.093v-8.341c0-1.09.58-2.099 1.52-2.643l2.768-1.603a2.49 2.49 0 012.496 0l3.437 1.989 3.415-1.985a2.49 2.49 0 012.503 0l2.763 1.603a3.053 3.053 0 011.519 2.642v8.34c0 1.085-.575 2.089-1.508 2.635l-7.974 4.668c-.44.258-.985.258-1.426.001l-8-4.668A3.054 3.054 0 010 19.093z"
            fill="#8AED9B"
          />
          <path
            d="M2.177 10.297c-.753-.436-.753-1.144 0-1.58l2.412-1.398c.502-.291 1.316-.291 1.818 0l3.775 2.188-4.684 2.715-3.321-1.925z"
            fill="#7CD68B"
          />
          <path
            d="M5.498 12.222l4.684-2.715 4.684 2.715-4.23 2.45a1 1 0 01-.908 0l-4.23-2.45z"
            fill="#70C87F"
          />
          <path
            d="M10.182 9.507l3.775-2.188c.502-.291 1.316-.291 1.818 0l2.412 1.398c.753.436.753 1.144 0 1.58l-3.32 1.925-4.685-2.715z"
            fill="#62AB6F"
          />
          <path
            d="M2.177 21.16c-.753-.436-.753-1.143 0-1.58l2.412-1.398c.502-.29 1.316-.29 1.818 0l3.775 2.188-4.684 2.715-3.321-1.925z"
            fill="#82E693"
          />
          <path
            d="M5.498 23.085l4.684-2.715 4.684 2.715-4.23 2.451a1.001 1.001 0 01-.908 0l-4.23-2.451z"
            fill="#83DE93"
          />
          <path
            d="M10.182 20.37l3.775-2.188c.502-.29 1.316-.29 1.818 0l2.412 1.398c.753.437.753 1.144 0 1.58l-3.32 1.925-4.685-2.715z"
            fill="#77D186"
          />
          <path
            opacity={0.3}
            d="M10.79 16.74c0-.29.204-.643.455-.788l6.67-3.865c.753-.436 1.363-.084 1.363.786v5.878c0 .58-.406 1.286-.908 1.577l-7.125 4.133c-.251.146-.455.029-.455-.261v-7.46z"
            fill="#E3FCE7"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M53.45 7.283v14.981H64.1V15.67h-1.634v4.962h-7.383V7.283h-1.634zm.69.69v13.6h9.268-9.268v-13.6zm9.017 8.387v4.962-4.962zm14.036 5.214h-8.79v-3.93c0-.62.1-1.074.302-1.36.202-.302.563-.537 1.083-.705-.518.167-.877.401-1.08.7l-.003.006-.001.002c-.2.285-.301.738-.301 1.358v3.929h8.79zm-8.311-13.6v.251h5.062c.756 0 1.352.135 1.788.403.437.252.655.764.655 1.537v2.291c0 .32-.067.58-.201.781-.135.185-.311.32-.53.403h.002l.021-.009c.208-.084.377-.216.506-.394l.007-.01.006-.01c.126-.198.189-.452.189-.76v-2.293c0-.734-.197-1.233-.592-1.497l-.005-.003a1.112 1.112 0 00-.058-.036c-.436-.268-1.032-.403-1.788-.403H68.88v-.252zm-1.17 9.67c0-.662.102-1.289.424-1.75.322-.478.845-.78 1.438-.971l.002-.001 5.845-1.932a.455.455 0 00.197-.147c.036-.06.078-.175.078-.387v-2.291c0-.668-.186-.867-.31-.939l-.008-.004-.008-.006c-.288-.177-.742-.3-1.426-.3H68.19V7.283h5.753c.925 0 1.742.17 2.37.593.75.485 1.016 1.343 1.016 2.288v2.292c0 .473-.101.937-.385 1.314-.23.327-.543.569-.91.73l-.03.013-5.891 1.946c-.406.146-.583.294-.65.385l-.007.01-.007.009c-.035.043-.13.245-.13.782v2.986h8.564v1.633H67.712v-4.62z"
            fill="#fff"
          />
          <path
            d="M28.024 21.214h0l.008.007c.39.293.907.493 1.525.616.618.124 1.399.183 2.334.183h5.358v-5.753h-.943v4.811h-4.415c-.834 0-1.52-.056-2.06-.164-.544-.108-.918-.263-1.152-.443-.453-.36-.724-1.006-.724-2.045v-7.052c0-1.068.253-1.725.662-2.082h0l.005-.004c.201-.182.52-.339.987-.449.465-.11 1.056-.167 1.779-.167h4.702v-.943h-4.702c-.822 0-1.522.064-2.094.198-.57.134-1.037.342-1.366.651-.64.6-.916 1.566-.916 2.796v7.052c0 .61.061 1.146.19 1.604l.002.008.002.009c.156.466.43.858.818 1.167zm20.569-.02h0l.003-.003c.594-.526.891-1.21.891-2.024v-5.314c0-.814-.296-1.494-.893-2.008-.619-.545-1.695-.77-3.109-.77-1.412 0-2.485.224-3.094.773-.583.515-.871 1.194-.871 2.005v5.314c0 .811.288 1.495.87 2.02h0l.003.004c.31.273.735.459 1.244.577.512.119 1.13.176 1.848.176 1.415 0 2.49-.218 3.108-.75zm.023-2.027c0 .574-.204 1.023-.615 1.374-.392.324-1.193.532-2.516.532-.65 0-1.183-.05-1.603-.145-.422-.095-.709-.23-.891-.384-.4-.35-.6-.8-.6-1.377v-5.314c0-.579.2-1.02.598-1.358h0l.004-.003c.182-.16.47-.299.89-.397.42-.097.952-.148 1.602-.148 1.324 0 2.123.214 2.514.547h0l.004.004c.408.338.613.78.613 1.355v5.314z"
            fill="#8AED9B"
            stroke="#8AED9B"
            strokeWidth={0.690748}
          />
        </svg>
      </StyledLogo>
      <StyledPageTitle>
        <Typography.GolRegular>Creator</Typography.GolRegular>
      </StyledPageTitle>
    </StyledContainer>
  );
};

export default CreatorLogo;
