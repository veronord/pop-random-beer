

const main = async () => {
    const addOutput = document.querySelector('#beer-list');
    const drunkOutput = document.querySelector('#drunk');

    try {
        const addUrl = 'http://localhost:3000/beerAdded';
        const poppedUrl = 'http://localhost:3000/beerRemoved';

        const added = await getData(addUrl);
        const popped = await getData(poppedUrl);

        const addedString = added.map(el => {
            return `- ${el.name}`;
        }).join('<br>');
        addOutput.innerHTML = addedString;

        const poppedString = popped.map(el => {
            return `- ${el.name}`;
        }).join('<br>');
        drunkOutput.innerHTML = poppedString;

    }
    catch (error) {
        console.log(error);
    }
}

const getData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


const addBeer = async () => {
    try {
        const input = document.querySelector('#input');
        const beer = { 'name': input.value }
        const url = 'http://localhost:3000/beerAdded';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(beer)
        });
    }
    catch(error) {
        console.log(error);
    }
}

const popRandomBeer = async () => {
    const addedUrl = 'http://localhost:3000/beerAdded';

    const res = await fetch(addedUrl);
    const data = await res.json();

    if (data.length === 0) {
        console.log('No beers to remove');
        alert("Kjøleskapeter tomt! Kom deg på butikken!");
    }

    else { 
        const randomIndex = Math.floor(Math.random() * data.length);
        console.log(randomIndex);
        const randomBeer = await data[randomIndex];
        console.log(randomBeer);
    
        const poppedUrl = 'http://localhost:3000/beerRemoved';
        await fetch(poppedUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'name':randomBeer.name}) 
        });

        const beerUrl = `http://localhost:3000/beerAdded/${randomBeer.id}`;
        await fetch(beerUrl, {
            method: 'DELETE'
        });
    }
}
