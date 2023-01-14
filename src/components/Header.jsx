import React from 'react'
import Typed from 'typed.js'

const Header = () => {
  const el = React.useRef(null)
  const typed = React.useRef(null)

  React.useEffect(() => {
    const options = {
      strings: [
        '<h1>cover • letter • bot</h1>'
      ],
      typeSpeed: 50,
      showCursor: false
    }

    typed.current = new Typed(el.current, options)

    return () => {
      typed.current.destroy()
    }
  }, [])

  return (
    <span style={{ whiteSpace: 'normal' }} ref={el} />
  )
}

export default Header
