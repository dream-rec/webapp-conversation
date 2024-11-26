import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import cn from 'classnames'
import NodePanel from './node'
import type { WorkflowProcess } from '@/types/app'
import CheckCircle from '@/app/components/base/icons/solid/general/check-circle'
import AlertCircle from '@/app/components/base/icons/solid/alert-circle'
import Loading02 from '@/app/components/base/icons/line/loading-02'
import ChevronRight from '@/app/components/base/icons/line/chevron-right'
import { WorkflowRunningStatus } from '@/types/app'

type WorkflowProcessProps = {
  data: WorkflowProcess
  grayBg?: boolean
  expand?: boolean
  hideInfo?: boolean
}
const WorkflowProcessItem = ({
  data,
  grayBg,
  expand = false,
  hideInfo = true,
}: WorkflowProcessProps) => {
  const [collapse, setCollapse] = useState(!expand)
  const running = data.status === WorkflowRunningStatus.Running
  const succeeded = data.status === WorkflowRunningStatus.Succeeded
  const failed = data.status === WorkflowRunningStatus.Failed || data.status === WorkflowRunningStatus.Stopped

  const background = useMemo(() => {
    if (running && !collapse)
      return 'linear-gradient(180deg, #E1E4EA 0%, #EAECF0 100%)'

    if (succeeded && !collapse)
      return 'linear-gradient(180deg, #ECFDF3 0%, #F6FEF9 100%)'

    if (failed && !collapse)
      return 'linear-gradient(180deg, #FEE4E2 0%, #FEF3F2 100%)'
  }, [running, succeeded, failed, collapse])

  useEffect(() => {
    setCollapse(!expand)
  }, [expand])

  return (
    <div
      className={cn(
        hideInfo ? 'mx-[-8px] px-1' : 'w-full px-3',
      )}
      style={{
        background,
      }}
    >
      <div

        onClick={() => setCollapse(!collapse)}
      >

      </div>
      {
        !collapse && (
          <div className='mt-1.5'>
            {
              data.tracing.map(node => (
                <div key={node.id} className='mb-0.5 last-of-type:mb-0'>
                  <NodePanel
                    nodeInfo={node}
                    hideInfo={hideInfo}
                  />
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default WorkflowProcessItem
