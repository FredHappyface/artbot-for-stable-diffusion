import NumericInputSlider from '../NumericInputSlider'
import FlexRow from 'app/_components/FlexRow'
import { Button } from 'app/_components/Button'
import { IconSettings } from '@tabler/icons-react'
import { useState } from 'react'
import DropdownOptions from 'app/_modules/DropdownOptions'
import Checkbox from 'app/_components/Checkbox'
import Input from 'app/_components/Input'
import SubSectionTitle from 'app/_components/SubSectionTitle'
import TextTooltipRow from 'app/_components/TextTooltipRow'
import TooltipComponent from 'app/_components/TooltipComponent'
import { useInput } from 'app/_modules/InputProvider/context'

interface ClipSkipOptions {
  hideOptions?: boolean
}

export default function ClipSkip({ hideOptions = false }: ClipSkipOptions) {
  const { input, setInput } = useInput()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <FlexRow gap={4} style={{ position: 'relative' }}>
      {input.useMultiClip && (
        <div className="mb-4 w-full">
          <SubSectionTitle>
            <TextTooltipRow>
              CLIP skip
              <span
                className="text-xs w-full font-[400]"
                style={{ paddingRight: '4px', width: 'auto' }}
              >
                &nbsp;(1 - 12 )
              </span>
              <TooltipComponent tooltipId="multi-steps-tooltip">
                Comma separated values to create a series of images using
                multiple CLIP skip settings. Example: 3,6,9,12
              </TooltipComponent>
            </TextTooltipRow>
          </SubSectionTitle>
          <Input
            // @ts-ignore
            type="text"
            name="multiClip"
            onChange={(e: any) => {
              setInput({ multiClip: e.target.value })
            }}
            placeholder="3,5,7,9"
            // @ts-ignore
            value={input.multiClip}
            width="100%"
          />
        </div>
      )}
      {!input.useMultiClip && (
        <NumericInputSlider
          label="CLIP skip"
          tooltip="Determine how early to stop processing a prompt using CLIP. Higher
          values stop processing earlier. Default is 1 (no skip)."
          from={1}
          to={12}
          step={1}
          input={input}
          setInput={setInput}
          fieldName="clipskip"
          fullWidth
          enforceStepValue
        />
      )}
      <div>
        <div
          className="label_padding"
          style={{ height: '16px', width: '1px' }}
        />
        {showDropdown && (
          <DropdownOptions
            handleClose={() => setShowDropdown(false)}
            title="CLIP options"
            top="80px"
          >
            <div style={{ padding: '8px 0' }}>
              <Checkbox
                label="Use multi-CLIP skip?"
                checked={input.useMultiClip}
                onChange={(bool: boolean) => {
                  setInput({ useMultiClip: bool })
                }}
              />
            </div>
          </DropdownOptions>
        )}
        {!hideOptions && (
          <Button onClick={() => setShowDropdown(true)}>
            <IconSettings stroke={1.5} />
          </Button>
        )}
      </div>
    </FlexRow>
  )
}
