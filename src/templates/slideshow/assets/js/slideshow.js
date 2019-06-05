let slideCounter = 0;

function startSlideshow(valOne, valTwo) {
	const showSlideLength = valOne;
	const slideTranstionLength = valTwo;
	const slides = [].slice.call(document.querySelectorAll('.slide'));

	setInterval(()=> {
		if(slideCounter === 0) {
			slides.map((slide)=> {
				return slide.classList.remove('hidden');
			})
		}
		moveSlides(slides, slideTranstionLength);
	}, showSlideLength);
}

function moveSlides(slides, slideTranstionLength) {
	slides[0].classList.remove('first-slide');
	slides[slides.length - 1].classList.remove('last-slide');

	if(slideCounter === slides.length - 2) {
		slides[0].classList.add('hidden');
	};

	if(slideCounter === slides.length - 1) {
		slides[0].classList.add('first-slide');
		slides[slides.length - 1].classList.add('last-slide');
		setTimeout(()=> {
			for(let i = 1; i < slides.length; i++) {
				slides[i].classList.remove('move', 'prepare');
				slides[i].classList.add('hidden');
			};
		}, slideTranstionLength)
		slides[0].classList.remove('hidden');
		slides[0].classList.add('first-slide');
		slideCounter = 0;
	} else if(slideCounter <= slides.length) {
		slides[slideCounter].classList.add('move');
		slides[slideCounter + 1].classList.add('prepare');
		slideCounter++
	};
}
