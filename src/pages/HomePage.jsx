import { useNavigate } from "react-router-dom"


export function HomePage() {
    const navigate = useNavigate()
    return <div className="home-container">
        <img className="bck-img" src="img/bck2.webp" alt="bck-ground" onClick={() => navigate('/toy')} />
    </div>

}