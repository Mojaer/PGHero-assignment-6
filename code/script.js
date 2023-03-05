const phoneLoads = async (load) => {
    toggleSpinner(true)
    const url = 'https://openapi.programming-hero.com/api/ai/tools'

    try {
        const resource = await fetch(url);
        const data = await resource.json();

        const loadData = load ? data.data.tools.slice(0, 6) : data.data.tools

        dataLoad(loadData)
    }
    catch (err) {
        alert(err.message)
    }

}

// load data function --------------------------------------------------------------------------------

const dataLoad = (phones) => {
    toggleSpinner(false)
    phones.forEach(phone => {


        const { id, image, name, features, published_in } = phone

        const cards = document.getElementById('cards')
        const cardItems = document.createElement('div')
        let featureList = '';
        features.forEach(feature => featureList += '<li>' + feature + '</li>')


        cardItems.innerHTML = `
<div class="col">
                <div class="card ">
                    <img src="${image}" class="img-fluid rounded card-img-top p-4 w-100 " alt="...">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold">Features</h5>
                        <ol id="${id}">${featureList}</ol>
                        <hr>
        
                         <div class="d-flex justify-content-between">
                            <div>
                                <h5 class="card-title fw-bold">${name}</h5>
                                <p class="card-text "><i class="fas fa-calendar-alt"></i> ${published_in}</p>
                            </div>

                      
                            <button type="button" class="btn btn-light rounded-circle text-danger p-3" data-bs-toggle="modal"
            data-bs-target="#AImodal"  onClick= "modalOpen(${id})">
            <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`

        cards.appendChild(cardItems)


    });

}

// Modal function------------------------------------------------------------------------

const modalOpen = async (id) => {

    id = id < 10 ? '0' + id : id
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`

    const resource = await fetch(url)
    const data = await resource.json()
    const { image_link, input_output_examples, description, pricing, features, integrations, accuracy } = data.data


    const idCatcher = (id) => {
        const idComponent = document.getElementById(id).children
        return idComponent
    }

    idCatcher('img_part')[0].src = image_link[0]
    idCatcher('img_part')[1].innerText = input_output_examples[0].input
    idCatcher('img_part')[2].innerText = input_output_examples[0].output


    idCatcher('title')[0].innerText = description


    idCatcher('pricing')[0].innerText = pricing[0].price === '0' || pricing[0].plan === 'Free' ? 'Free of cost/basic' : pricing[0].price
    idCatcher('pricing')[1].innerText = pricing[1].price === 'No cost' ? 'Free of cost/pro' : pricing[1].price
    idCatcher('pricing')[2].innerText = pricing[2].plan === 'Free' ? 'Free of cost/Enterprise' : pricing[2].price

    const feature = Object.values(features)

    document.getElementById('features').innerHTML = ''
    feature.forEach(feature => {
        const li = document.createElement('li')
        li.innerHTML = feature.feature_name;

        document.getElementById('features').appendChild(li);
    })


    let featureList = '';
    document.getElementById('integrations').innerHTML = ''
    integrations.forEach(integration => {

        featureList += '<li>' + integration + '</li>'
    })

    document.getElementById('integrations').innerHTML = featureList



}

//spinner function-------------------------------------------------------------------

const toggleSpinner = (toggle) => {
    const toggler = document.getElementById('spinner')
    if (!toggle) { toggler.classList.add('d-none') }
    else { toggler.classList.remove('d-none') }
}

//see more function---------------------------------------------------------------------

let seeMore = true

document.getElementById('seeMore').addEventListener('click', () => {
    document.getElementById('cards').innerHTML = ''
    if (seeMore == true) { seeMore = false }
    phoneLoads(seeMore)

})
phoneLoads(seeMore)

