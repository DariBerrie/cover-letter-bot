import { Configuration, OpenAIApi } from 'openai'
import { useState } from 'react'
import Header from './components/Header'
import './stylesheets/PromptForm.scss'
import '/App.scss'


const App = () => {
  const configuration = new Configuration({
    apiKey: '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'
  })
  const openai = new OpenAIApi()
  const [promptInput, setPromptInput] = useState("")
  const [result, setResult] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 7,
    })

    console.log(response)
    // const response = await openai.complete({
    //     model: 'text-davinci-003',
    //     prompt: 'Will using a third party package save time?',
    //     maxTokens: 5,
    //     temperature: 0
    // })
    // console.log(response.data)
    // response.then((result) => {
    //   console.log(result.data.choices[0].text)
    // })

    // const data = gptResponse.data
    // setResult(data.result)
    // setPromptInput("")

  }

  return (
    <div className="container d-flex justify-content-center">
      <main>
        <div className="headerContainer">
          <img src="/bot.png" style={{width:"100px", height:"100px"}} alt="bot icon"/>
          <Header />
          <p className="text-center">If the robots are taking over, I say, <b>let them!</b> Recruiters admit, their robots will do a first scan of your CV and cover letter before they do.
          So why not generate a cover letter for a robot written by a robot! Give it a go 😉 </p>
        </div>

        {/* <PromptForm onSubmit={onSubmit} promptInput = {promptInput} /> */}
        <div className="formContainer">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="coverPrompt"
              placeholder="Tell us your needs"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
            />
            <input className="btn-info" type="submit" value="Generate letter" />
          </form>
        </div>

        <div className={result}>{result}</div>

        <div className="disclaimer pt-5">
          <p className="fs-6">* This app was created for fun. Please don't use this for your actual cover letters unless you like the content! 🤖<br />
          If you like this, check out <a href="https://www.dari.codes">my portfolio</a>!</p>
        </div>
      </main>
    </div>
  )
}

export default App
