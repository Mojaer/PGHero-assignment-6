const phoneLoads = async (load) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    try {
        const resource = await fetch(url);
        const data = await resource.json();

        const loadData = load ? data.data.tools.slice(0, 6) : data.data.tools
        console.log(loadData)
        dataLoad(loadData)
    }
    catch (err) {
        console.log(err)
    }

}

const dataLoad = (phones) => {
    ;

    phones.forEach(phone => {

        const { id, image, name, features, published_in } = phone

        const cards = document.getElementById('cards')
        const cardItems = document.createElement('div')
        let featureList = '';
        features.forEach(feature => featureList += '<li>' + feature + '</li>')


        cardItems.innerHTML = `
<div class="col">
                <div class="card">
                    <img src="${image}" class="rounded card-img-top p-4 w-100 " alt="...">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold">Features</h5>
                        <p class="card-text">${features}</p>
                        <ol id="${id}">${featureList}</ol>
        
                         <div class="d-flex justify-content-between">
                            <div>
                                <h5 class="card-title fw-bold">${name}</h5>
                                <p class="card-text "><i class="fas fa-calendar-alt"></i>${published_in}</p>
                            </div>
                            <button class="btn btn-light rounded-circle text-danger p-3"><i
                                    class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>`

        cards.appendChild(cardItems)


    });

}
let seeMore = true

document.getElementById('seeMore').addEventListener('click', () => {
    document.getElementById('cards').innerHTML = ''
    seeMore = !seeMore
    phoneLoads(seeMore)

})
phoneLoads(seeMore)

