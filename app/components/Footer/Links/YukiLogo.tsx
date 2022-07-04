import styled from 'styled-components'

const StyledContainer = styled.span`
  display: inline-flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
  gap: 16px;
`
const StyledLogo = styled.a`
  max-width: 78px;
  svg {
    filter: grayscale(1);
  }
  &:hover {
    svg {
      filter: grayscale(0);
    }
  }
  &:active {
    svg {
      filter: grayscale(0.5);
    }
  }
`

const YukiLogoLink = (props) => {
  return (
    <StyledContainer>
      <StyledLogo>
        <svg
          height={30}
          viewBox="0 0 185 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'relative',
            left: 4,
            top: 10,
          }}
          {...props}
        >
          <path
            d="M166.656 51.542a8.586 8.586 0 018.587-8.587h6.635c.431 0 .78.35.78.78v47.226a.78.78 0 01-.78.781h-14.441a.78.78 0 01-.781-.78v-39.42zM16.002 44.516a.78.78 0 00-.78-.78H8.585A8.586 8.586 0 000 52.322V68.13c0 13.257 10.747 24.003 24.003 24.003 2.605 0 5.112-.414 7.46-1.181a.412.412 0 01.541.387v.367c0 .02-.016.037-.037.037a.037.037 0 00-.037.037 23.736 23.736 0 01-15.333 22.161c-4.436 1.678-8.4 5.381-8.4 10.123v6.709c0 .431.349.781.78.773a39.826 39.826 0 0027.37-11.653 39.811 39.811 0 0011.66-28.15V44.516a.78.78 0 00-.781-.78H40.59a8.586 8.586 0 00-8.587 8.586V68.13a8.001 8.001 0 11-16.002 0V44.516zM55.812 26.953a8.586 8.586 0 018.587-8.586h38.639c.431 0 .78.35.78.78v6.245a8.586 8.586 0 01-8.586 8.586h-38.64a.78.78 0 01-.78-.78v-6.245zM111.624 9.39a8.586 8.586 0 018.587-8.587h7.025c.431 0 .78.35.78.781v52.48c0 .532.522.908 1.019.719a25.382 25.382 0 0010.538-7.544c2.026-2.447 4.853-4.284 8.03-4.284h10.368c.524 0 .9.507.734 1.005a40.782 40.782 0 01-11.082 17.113.806.806 0 00-.03 1.155 40.781 40.781 0 0111.643 27.985.769.769 0 01-.777.776l-13.837-.077a.8.8 0 01-.788-.785 25.387 25.387 0 00-10.756-20.113.774.774 0 00-.682-.101 40.9 40.9 0 01-3.753 1.001.791.791 0 00-.627.77v18.497a.78.78 0 01-.78.78h-14.831a.781.781 0 01-.781-.78V9.39z"
            fill="#fff"
          />
          <rect x={164.314} y={13.293} width={20.6856} height={20.6856} rx={10.3428} fill="#fff" />
          <path
            d="M71.814 43.931a.78.78 0 00-.78-.78H56.593a.78.78 0 00-.78.78v23.808c0 13.257 10.746 24.003 24.002 24.003 13.257 0 24.003-10.746 24.003-24.003V43.931a.78.78 0 00-.78-.78h-6.635a8.586 8.586 0 00-8.587 8.586v16.002a8.001 8.001 0 01-16.002 0V43.931z"
            fill="#fff"
          />
        </svg>
      </StyledLogo>
    </StyledContainer>
  )
}

export default YukiLogoLink
