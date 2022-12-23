import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import Word from "./Word"

export default function Day() {
  const days = useFetch('http://localhost:3001/days')
  console.log(days)
  const { day } = useParams()
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


  function deleteDay() {

    if (window.confirm(`Day${day}를 삭제 하시겠습니까?`)) {
      fetch(`http://localhost:3001/day/${day}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.ok) {
            console.log('삭제 완')
            history('/')
          }
        })
    }
  }

  return (
    <div>
      <h2>Day {day} <button onClick={deleteDay}>Day 삭제</button></h2>

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