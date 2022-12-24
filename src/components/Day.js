// import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import Word from "./Word"

export default function Day() {

  // const [delDay, setDelDay] = useState(false)
  // console.log(delDay)
  // console.log(setDelDay)
  // function 
  // const days = useFetch('http://localhost:3001/days')
  // console.log(days)
  let { day } = useParams()
  // const [chooseDay, setChooseDay] = useState(day)
  const history = useNavigate()
  const words = useFetch(`http://localhost:3001/words?day=${day}`)
  // console.log(words)

  // const wordList = dummy.words.filter(word => word.day === Number(day))
  // const [words, setWords] = useState([])

  // useEffect(() => {
  //   fetch(`http://localhost:3001/words?day=${day}`)
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {
  //       setWords(data)
  //     })
  // }, [day])

  function beforeDay() {
    day = day - 1
    history(`/day/${day}`)
  }
  function nextDay() {
    day = Number(day) + 1
    history(`/day/${day}`)
  }

  function deleteWords() {
    words.forEach(word => {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: 'DELETE'
      })
        .then(res => {
          console.log('단어 삭제 완')
        })
    })
  }


  function deleteDay() {
    if (window.confirm(`Day${day}를 삭제 하시겠습니까?`)) {
      fetch(`http://localhost:3001/days/${day}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.ok) {
            console.log(res)
            console.log('삭제 완')
            deleteWords()
            history('/')
          }
        })
    }
  }

  return (
    <div>
      <button onClick={beforeDay}>이전</button>
      <h2>Day {day}
        <button onClick={deleteDay}>Day 삭제</button>
      </h2>
      <button onClick={nextDay}>다음</button>

      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map(word => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}