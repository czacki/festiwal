import * as React from 'react'

import { Scrollbar, Program } from '../components'

import '../assets/scss/home.scss'

export default function App() {
  const sections = ['', 'Program']

  return (
    <>
      <Scrollbar sections={sections} />
      <div className='fullscreen center' id={sections[0].toLowerCase()}>
        <div className='splash-text'>
          <div className='splash-date'>
            2-5 <span className='small'>grudnia 2020</span>
          </div>
          <div className='splash-title'>
            33 Festiwal Teatralny <span className='small'>XXVII LO im. Tadeusza Czackiego</span>
          </div>
        </div>
      </div>

      <div className='fullscreen center' id={sections[1].toLowerCase()}>
        <Program/>
      </div>
    </>
  )
}
