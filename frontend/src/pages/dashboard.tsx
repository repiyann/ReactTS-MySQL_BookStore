import Navbar from '../components/navbar'
import { CarouselComponent } from '../components/carousel'
import homeImage from '/images/home-image.svg'
import aboutImage from '/images/about-image.svg'

function Dashboard() {
	return (
		<>
			<Navbar />
			<div className="px-5 py-40 flex bg-light dark:bg-gray-950 justify-center items-center md:py-5 md:px-10 lg:px-[132px] md:grid md:grid-cols-2 md:gap-10">
				<div className="col-start-1 col-end-1 m-auto">
					<h1 className="text-4xl font-semibold mb-5 dark:text-white">
						<span style={{ color: '#9333ea', fontWeight: 700 }}> GrinWell Clinic </span>— Your Wellness, Our Priority!
					</h1>
					<a
						href=""
						className="px-5 py-2 text-white text-lg font-semibold bg-[#9333ea] rounded-lg hover:bg-[#4c1b7a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					>
						Book Now
					</a>
				</div>
				<div className="col-start-2 col-end-2">
					<img
						src={homeImage}
						alt=""
					/>
				</div>
			</div>
			<section
				id="menu"
				className="py-20 dark:bg-gray-950 bg-light"
			>
				<div className="px-5 z-[900] flex bg-light dark:bg-gray-950 justify-center flex-col items-center md:pt-5 md:pb-12 md:px-10 lg:px-[132px]">
					<h1 className="text-4xl mb-5 font-semibold text-center dark:text-white">Services</h1>
					<CarouselComponent />
					<div className="px-5 flex flex-col justify-center items-center"></div>
				</div>
			</section>
			<section
				id="about"
				className="bg-gray-950 bg-light"
			>
				<div className="px-5 py-20 flex bg-light dark:bg-gray-950 justify-center items-center md:pt-5 md:pb-12 md:px-10 lg:px-[132px] md:grid md:grid-cols-2 md:gap-10">
					<div className="col-start-1 col-end-1 mt-5">
						<img src={aboutImage} />
					</div>
					<div className="col-start-2 col-end-2 m-auto">
						<h1 className="text-4xl mb-5 font-semibold dark:text-white">About us</h1>
						<h3 className="text-2xl mb-1 font-semibold dark:text-white">Why choose us?</h3>
						<br />
						<div className="text-justify">
							<p className="mb-1 dark:text-white">
								Welcome to GrinWell Clinic, where health meets care. At GrinWell Clinic, we are dedicated to providing
								personalized and compassionate healthcare services to our community. With a team of experienced and
								caring professionals, we strive to ensure that every patient receives the highest quality of medical
								attention in a warm and welcoming environment.
							</p>
							<br />
							<p className="dark:text-white">
								Our mission is to promote wellness and enhance the overall health of our patients through comprehensive
								and innovative medical solutions. Whether you're seeking routine check-ups, specialized treatments, or
								preventive care, GrinWell Clinic is committed to being your trusted healthcare partner.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Dashboard
