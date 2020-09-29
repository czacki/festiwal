import * as React from 'react'

import '../assets/scss/scrollbar.scss'

interface ScrollbarProps {
  sections: string[]
}

export default function Scrollbar({ sections }: ScrollbarProps) {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    window.addEventListener('scroll', ((win: Window, ev: Event) => {
      setActive(window.pageYOffset / window.innerHeight)
    }) as () => {})
  })

  return (
    <div className='scrollbar'>
      <ul>
        {Object.keys(sections).map((section, i) => {
          return (
            <li
              key={i}
              onClick={() => window.scrollTo(0, window.innerHeight * i)}
              className={
                window.scrollY >= window.innerHeight * (i - 1 / 2) && window.scrollY <= window.innerHeight * (i + 1 / 2)
                  ? 'active'
                  : ''
              }
            >
              <span>{sections[i]}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
