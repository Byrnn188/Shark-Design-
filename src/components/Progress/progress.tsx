import React, { type FC } from 'react'
export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight= 15,
    showText= true,
    styles,
  } = props
  return (
    <div className="viking-progress-bar" style={styles}>
      <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div 
          className={`viking-progress-bar-inner color-red` }
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

export default Progress;
