'use strict'
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let photosArray = []

// Unsplash API
const count = 5
const apiKey = 'uqNPJ18kAp-oylz3R7F76z6ewpXnNsRseaustCMWjdM'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

let ready = false
let imagesLoaded = 0
let totalImages = 0

// Check if all image were loaded
function imageLoaded() {
	imagesLoaded++
	if (imagesLoaded === totalImages) {
		ready = true
		loader.hidden = true
		console.log('ready =', ready)
	}
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}

// Create Elements for links and photos, add DOM
function displayPhotos() {
	imagesLoaded = 0
	totalImages = photosArray.length
	console.log(photosArray.length)
	// Run function for each object in photos array
	photosArray.forEach(photo => {
		// Create <a> to lint to Unsplash
		const item = document.createElement('a')
		// item.setAttribute('href', photo.links.html)
		// item.setAttribute('target', '_blank')
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		})
		// Create <img> for photo
		const img = document.createElement('img')
		// img.setAttribute('src', photo.urls.regular)
		// img.setAttribute('alt', photo.alt_description)
		// img.setAttribute('title', photo.alt_description)
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		})
		// Event listener , check when each is finished  loading
		img.addEventListener('load', imageLoaded)
		// Put <img> inside <a>, then put inside imageContainer Element
		item.appendChild(img)
		imageContainer.appendChild(item)
	})
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl)
		// const data = await response.json()
		// console.log(data)
		photosArray = await response.json()
		console.log(photosArray)
		displayPhotos()
	} catch (error) {
		console.log(error)
	}
}
// Check if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
	console.log('scrolled')
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false
		getPhotos()
	}
})

// On Load
getPhotos()
