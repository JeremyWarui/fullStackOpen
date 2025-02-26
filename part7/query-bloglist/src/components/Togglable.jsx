import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return toggleVisibility
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="mb-4 border-y-indigo-300 bg-blue-900 text-white py-2 px-6 rounded"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableVisible">
        {props.children}
        <button
          className="mb-4 border border-y-indigo-900 text-black py-2 px-6 rounded"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  )
})

Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired }
Togglable.displayName = 'Togglable'

export default Togglable
