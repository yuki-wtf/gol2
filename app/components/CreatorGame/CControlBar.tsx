import styled from 'styled-components'
import ControlButtons from '../GolGrid/Footer/ControlBar/ControlButtons'
import SpeedDropdownMenu from '../GolGrid/Footer/ControlBar/SpeedControl'

const StyledControlbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  width: 100%;
  gap: 15px;
`
const StyledGenerationLabel = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
  color: #f3e9e1;
  margin-right: 26px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 100%;
  & span {
    font-size: 14px;
  }
`

const CControlBar = ({ gameId }) => {
  //   const dispatch = useDispatch();
  //   const intervalId = useRef();
  //   const { selected_generation, latest_generation } = useSelector(
  //     (state) => state.generations
  //   );
  //   const { playbackMode, isPlaying, playbackSpeed } = useSelector(
  //     (state) => state.playback
  //   );
  //   useEffect(() => {
  //     const clear = () => {
  //       if (intervalId.current) {
  //         clearInterval(intervalId.current);
  //       }
  //     };
  //     if (isPlaying) {
  //       intervalId.current = setInterval(() => {
  //         dispatch(togglePlayback(true));
  //         dispatch(updatePlaybackProgress());
  //       }, playbackSpeed && playbackSpeed);
  //       if (selected_generation === latest_generation) {
  //         clear();
  //         dispatch(togglePlayPause());
  //         dispatch(togglePlayback(false));
  //       }
  //     } else {
  //       clear();
  //     }
  //     return clear;
  //   }, [
  //     dispatch,
  //     isPlaying,
  //     playbackMode,
  //     playbackSpeed,
  //     selected_generation,
  //     latest_generation,
  //   ]);
  return (
    <StyledControlbar>
      <ControlButtons.ToStartBtn onClick={() => {}} />
      <ControlButtons.PlayPauseBtn disabled={true} />
      <ControlButtons.StepForwardBtn disabled={true} />
      <ControlButtons.ToEndBtn disabled={true} />
      <SpeedDropdownMenu disabled={true} />

      <StyledGenerationLabel>
        Generation # <span>{`${gameId}`}</span>
      </StyledGenerationLabel>
    </StyledControlbar>
  )
}

export default CControlBar
