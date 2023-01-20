import { Configuration, OpenAIApi } from 'openai'
import { useState } from 'react'
import Header from './components/Header'
import { ClockLoader } from 'react-spinners'
import './stylesheets/PromptForm.scss'
import '/App.scss'


const App = () => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  })
  const openai = new OpenAIApi(configuration)
  const [promptInput, setPromptInput] = useState("")
  const [oneWordDesc, setOneWordDesc] = useState("")
  const [currentJob, setCurrentJob] = useState("")
  const [futureJob, setFutureJob] = useState("")
  const [company, setCompany] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const fetchResponse = async (e) => {
    e.preventDefault()
    setLoading(true)
    let object = {
      model: "text-davinci-003",
      prompt: promptInput,
      temperature: 0.8,
      max_tokens: 400,
    }

    const response = await openai.createCompletion(object)
    setTimeout(() => {
      setResult(response.data.choices[0].text)
      setLoading(false)}, 4000)
      console.log(response)
  }

  // const onSubmit = (e) => {
  //   e.preventDefault()
  // }

  return (
    <div className="container d-flex flex-column align-items-center">
        <div className="headerContainer">
          <img src="/bot.png" style={{width:"100px", height:"100px"}} alt="bot icon"/>
          <Header />
          <p className="intro text-center">If the robots are taking over, I say, <b>let them!</b> Recruiters admit, their robots will do a first scan of your CV and cover letter before they do.
          So why not generate a cover letter for a robot written by a robot! Give it a go 😉 </p>
        </div>

          <form className="formContainer" onSubmit = {fetchResponse}>
            <div className="formInputRow">
              <input
                type="text"
                name="oneWordDescription"
                placeholder="Write one word that describes you."
                value={oneWordDesc}
                onChange={(e) => setOneWordDesc(e.target.value)}
              />
              <input
                type="text"
                name="currentPosition"
                placeholder="What is your current position?"
                value={currentJob}
                onChange={(e) => setCurrentJob(e.target.value)}
              />
              <input
                type="text"
                name="futurePosiiton"
                placeholder="What job title are you applying to?"
                value={futureJob}
                onChange={(e) => setFutureJob(e.target.value)}
              />
              <input
                type="text"
                name="company"
                placeholder="With which company?"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <input className="btn-info" type="submit" value="Generate letter"
              onClick={(e) => setPromptInput(`Write a 200-word or less cover letter for a ${oneWordDesc} ${currentJob} who is applying to a ${futureJob} posiiton at ${company}.`)}
            />
          </form>

        <div className="pt-2">
          {
            loading ? (
              <div className="d-flex flex-column align-items-center">
                <p className="text-center fs-6">* This app was created for fun.
                Please don't use this for your actual cover letters unless you like the content! 🤖<br />
                </p>
                <ClockLoader
                  size={40}
                  color={'black'}
                  loading={loading}/>
          </div>):
          (<p className="mb-4"><span style={{whiteSpace: 'pre-line'}}>{result}</span></p>)
          }
        </div>
        <p className="footer fs-6 text-center">Built by <a href="https://www.dari.codes">Dari</a> with
          <span style={{color: '#2FD2F2'}}> ♥</span>, React, Node.js & <a href="https://beta.openai.com/">OpenAI</a>.</p>
    </div>
  )
}

export default App
