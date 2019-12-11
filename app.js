// Define variables only once the page is fully loaded
window.addEventListener('load', () => {

  let lat = 'instantiation'
  let long = 'instantiation'

  // Return the first element within the document that matches the specified selector or group of selectors
  const tempInDegrees = document.querySelector('.temp-in-degrees')
  const ConditionsDescription = document.querySelector('.conditions-description')
  const locationTimezone = document.querySelector('.location-timezone')

  // Use built-in JavaScript functionality to fetch latitiude & longitude
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude
    long = position.coords.longitude

    // Proxy workaround for browser CORS policy restrictions
    const proxy = "https://cors-anywhere.herokuapp.com/"
    //using 'Dark Sky' API with query string for metric units (si = celsius etc.)
    const api = `${proxy}https://api.darksky.net/forecast/22dc744c9e56c0455e206506c8a258f4/${lat},${long}/?units=si`

    //fetch API data & convert to JSON
    fetch(api)
      .then(response => {
        return response.json()
      })

      .then(data => {
        //console.log(data). Leave here for future testing purposes

        //Destructuring assignment syntax: An expression that makes it possible to unpack values from arrays (or properties from objects) into distinct variables
        const {temperature, summary, icon
        } = data.currently

        tempInDegrees.textContent = Math.round(temperature)
        ConditionsDescription.textContent = summary
        locationTimezone.textContent = data.timezone

        //Set the Skycon icon
        setIcons(icon, document.querySelector('.icon'))
      })
  })

  //Set the Skycon icons
  function setIcons(icon, iconId) {
    const skycons = new Skycons({
      color: 'white'
    })

    //replace dashes with underscores, convert to upper case
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()

    //animate 
    skycons.play()

    return skycons.set(iconId, Skycons[currentIcon])
  }

})