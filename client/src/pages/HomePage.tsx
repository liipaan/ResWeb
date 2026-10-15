import { Link } from "react-router-dom";


const HomePage = () => {
return (
    <section className="hero">
    <p className="eyebrow">FRESH • TASTY • MADE WITH CARE</p>
    <h1>Good food brings people together.</h1>
    <p>Discover delicious meals from our restaurant menu.</p>
    <Link className="button" to="/foods">
        Explore the menu
    </Link>
    </section>
)
}

export default HomePage
