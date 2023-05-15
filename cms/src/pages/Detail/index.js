import { http } from "@/utils"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import './index.scss'

function Detail () {
  const [params] = useSearchParams()
  const articleId = params.get('id')
  const [article, setArticle] = useState('')
  useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/articles/${articleId}`)
      console.log(res)
      setArticle(res.data.content)
    }
    if (articleId) {
      getArticle()
    }
  }, [articleId])
  return (
    <div className="detail">
      <div dangerouslySetInnerHTML={{ __html: article }}></div>
    </div>
  )
}

export default Detail