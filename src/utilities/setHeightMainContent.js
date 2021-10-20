export default function setHeightMainContent(cb) {
    // Set height for component
    const header = document.getElementById('header')
    const footer = document.getElementById('footer')

    const headerHeight = header.offsetHeight
    const footerHeight = footer.offsetHeight
    const screenHeight = window.innerHeight

    const cartHeight = screenHeight - headerHeight - footerHeight
    cb(cartHeight)
}