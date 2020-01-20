const form = document.querySelector("#weather-form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = form.querySelector("input[name='address']").value;
    const unitsInput = form.querySelector("select[name='units']");
    const units = unitsInput.options[unitsInput.selectedIndex].value;
    let url = `/weather?address=${address}&units=${units}`;

    const weatherMessageContainer = document.querySelector('.weather-message');
    const messageContainer = document.querySelector('.message');

    weatherMessageContainer.classList.add('hide');
    messageContainer.classList.remove('hide');
    messageContainer.innerHTML = 'Loading...';

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                messageContainer.innerHTML = data.error;
            } else {
                console.log(data);
                messageContainer.classList.add('hide');
                weatherMessageContainer.classList.remove('hide');
                weatherMessageContainer.querySelector(".location").innerHTML = data.address;
                weatherMessageContainer.querySelector(".current-temperature").innerHTML = `${data.weaterData.temperature} ${data.unitsShortcut}`;
                weatherMessageContainer.querySelector(".apparent-temperature").innerHTML = `${data.weaterData.apparentTemperature} ${data.unitsShortcut}`;
                weatherMessageContainer.querySelector(".pressure").innerHTML = `${data.weaterData.pressure} hPa`;
            }
        });
});
