import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

interface Slide {
	image: string
	description: string
}

interface ImageCarousel {
	activeSlide: number
	slides: Slide[]
	nextSlide: () => void
	prevSlide: () => void
}

export function CarouselComponent() {
	const [carousel, setCarousel] = useState<ImageCarousel>({
		activeSlide: 0,
		slides: [],
		nextSlide: () => {},
		prevSlide: () => {}
	})

	useEffect(() => {
		const carouselInstance: ImageCarousel = {
			activeSlide: 0,
			slides: [
				{
					image: 'https://picsum.photos/id/1025/800/400',
					description: 'Combo'
				},
				{
					image: 'https://picsum.photos/id/1015/800/401',
					description: 'Ala Carte'
				},
				{
					image: 'https://picsum.photos/id/1025/800/402',
					description: 'Drink'
				},
				{
					image: 'https://picsum.photos/id/1019/800/403',
					description: 'Snack'
				}
			],
			nextSlide() {
				setCarousel((prevState) => ({
					...prevState,
					activeSlide: (prevState.activeSlide + 1) % prevState.slides.length
				}))
			},
			prevSlide() {
				setCarousel((prevState) => ({
					...prevState,
					activeSlide: (prevState.activeSlide - 1 + prevState.slides.length) % prevState.slides.length
				}))
			}
		}

		setCarousel(carouselInstance)
	}, [])

	return (
		<div className="mx-auto relative">
			{carousel.slides.map((slide, index) => (
				<div
					key={index}
					style={{ display: carousel.activeSlide === index ? 'block' : 'none' }}
					className="relative"
				>
					<img
						src={slide.image}
						alt="Slide Image"
						className="w-[700px] h-64 object-cover rounded-lg"
					/>
					<div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black bg-opacity-50 text-white p-4 text-center">
						<h3 className="text-lg font-semibold">{slide.description}</h3>
					</div>
				</div>
			))}

			<div className="absolute inset-0 flex">
				<div className="flex items-center justify-start w-1/2">
					<button
						className="bg-[#dfc2f9] text-[#9333ea] hover:text-[#4c1b7a] font-bold hover:shadow-lg rounded-full w-12 h-12 -ml-6"
						onClick={carousel.prevSlide}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
				</div>
				<div className="flex items-center justify-end w-1/2">
					<button
						className="bg-[#dfc2f9] text-[#9333ea] hover:text-[#4c1b7a] font-bold hover:shadow-lg rounded-full w-12 h-12 -mr-6"
						onClick={carousel.nextSlide}
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
			</div>

			<div className="absolute w-full flex items-center justify-center px-4">
				{carousel.slides.map((_, index) => (
					<button
						key={index}
						className={`flex-1 w-4 h-2 mt-4 mx-2 mb-0 rounded-full overflow-hidden transition-colors duration-200 ease-out ${
							carousel.activeSlide === index ? 'bg-[#9333ea]' : 'bg-[#dfc2f9]'
						}`}
						onClick={() => setCarousel((prevState) => ({ ...prevState, activeSlide: index }))}
					></button>
				))}
			</div>
		</div>
	)
}
