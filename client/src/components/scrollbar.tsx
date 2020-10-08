import * as React from 'react'
import { Link as ScrollLink } from 'react-scroll'

import '../assets/scss/scrollbar.scss'

interface ScrollbarProps {
  sections: string[]
}

export default function Scrollbar({ sections }: ScrollbarProps) {
  const [active, setActive] = React.useState(0) //eslint-disable-line

  React.useEffect(() => {
    window.addEventListener('scroll', ((win: Window, ev: Event) => {
      setActive(window.pageYOffset / window.innerHeight)
    }) as () => {})
  })

  return (
    <div className='scrollbar'>
      <ul>
        {sections.map((section, i) => {
          return (
            <li
              key={i}
              onClick={() => window.scroll({ top: window.innerHeight * i, behavior: 'smooth' })}
              className={
                window.scrollY >= window.innerHeight * (i - 1 / 2) && window.scrollY <= window.innerHeight * (i + 1 / 2)
                  ? 'active'
                  : ''
              }
            >
              <ScrollLink
                className='scrollbar-label'
                activeClass='active'
                to={section.toLowerCase()}
                spy={true}
                smooth={true}
                duration={1000}
              >
                {section}
              </ScrollLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
