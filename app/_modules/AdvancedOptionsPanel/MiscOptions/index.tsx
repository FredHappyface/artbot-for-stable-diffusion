import FlexibleRow from 'app/_components/FlexibleRow'
import FlexibleUnit from 'app/_components/FlexibleUnit'
import Section from 'app/_components/Section'
import HiresFix from '../HiresFix'
import AllowNsfwImages from '../AllowNsfwImages'
import ReplacementFilterToggle from '../ReplacementFilterToggle'
import Panel from 'app/_components/Panel'
import SubSectionTitle from 'app/_components/SubSectionTitle'
import InputSwitchV2 from '../InputSwitchV2'
import SlowWorkers from '../SlowWorkers'
import { useInput } from 'app/_modules/InputProvider/context'

export default function MiscOptions() {
  const { input, setInput } = useInput()

  return (
    <Section>
      <Panel style={{ borderWidth: '1px', padding: '8px' }}>
        <SubSectionTitle>Additional Options</SubSectionTitle>
        <FlexibleRow>
          <FlexibleUnit style={{ rowGap: '8px' }}>
            <InputSwitchV2
              label="Karras"
              tooltip="Denoising magic. Dramatically improves image generation using fewer steps."
              handleSwitchToggle={() => {
                if (!input.karras) {
                  setInput({ karras: true })
                } else {
                  setInput({ karras: false })
                }
              }}
              checked={input.karras}
            />
            <HiresFix />
            <SlowWorkers />
            <InputSwitchV2
              label="Tiling"
              disabled={input.source_image ? true : false}
              tooltip="Attempt to create seamless, repeatable textures. Note: This will not work for img2img or inpainting requests."
              handleSwitchToggle={() => {
                if (!input.tiling) {
                  setInput({ tiling: true })
                } else {
                  setInput({ tiling: false })
                }
              }}
              checked={input.tiling}
              moreInfoLink={
                input.source_image ? (
                  <div className="text-slate-500 dark:text-slate-400">
                    This option cannot be used with img2img requests.
                  </div>
                ) : null
              }
            />
          </FlexibleUnit>
          <FlexibleUnit style={{ rowGap: '8px' }}>
            <AllowNsfwImages />
            <ReplacementFilterToggle />
          </FlexibleUnit>
        </FlexibleRow>
      </Panel>
    </Section>
  )
}
