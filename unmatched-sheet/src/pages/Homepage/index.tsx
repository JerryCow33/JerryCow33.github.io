import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Features from '../../components/Features'
import Footer from '../../components/Footer'

import './index.scss';

const Homepage = () => {
    return (
        <div className="wrapper">
            <Header />
            <main className="main">
                <Hero />
                <Features />
            </main>
            <Footer />
        </div>
    )
}

export default Homepage