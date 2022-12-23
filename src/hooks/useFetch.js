import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setData(data)
      })
  }, [url]) // -> url이 변경될 때 마다 실행

  return data
}