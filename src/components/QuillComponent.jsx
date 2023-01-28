import { useState } from 'react'
import ReactQuill from 'react-quill'

const QuillComponent = ({result}) => {
  console.log("result", result)
  const [value, setValue] = useState(result.trimStart().replaceAll(/\n/g, "<br />"))
  console.log("value", value)
  return <ReactQuill theme="bubble" value={value} onChange={setValue} className="mt-4 mb-5" />
}

export default QuillComponent
