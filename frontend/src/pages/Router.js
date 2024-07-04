import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Router = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div>
      Securely processing your request
    </div>
  )

}