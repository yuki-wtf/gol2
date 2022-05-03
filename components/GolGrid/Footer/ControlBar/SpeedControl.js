import { HiCheck, HiChevronDown, HiChevronRight } from "react-icons/hi";
import { useState } from "react";
import DropUpMenu from "../../../DropUpMenu/DropUpMenu";

const SpeedControl = (props) => {
  const [speed, setSpeed] = useState("1");
  return (
    <DropUpMenu.Root>
      <DropUpMenu.Trigger {...props}>
        x{speed}
        <div>
          <HiChevronRight size={18} />
        </div>
      </DropUpMenu.Trigger>

      <DropUpMenu.Content side="top" align="center" sideOffset={5}>
        <DropUpMenu.RadioGroup value={speed} onValueChange={setSpeed}>
          <DropUpMenu.RadioItem value="1">
            x1 Normal Speed
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value="2">
            x2
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value="3">
            x3
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value="4">
            x4
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
        </DropUpMenu.RadioGroup>
      </DropUpMenu.Content>
    </DropUpMenu.Root>
  );
};

export default SpeedControl;
