const phoneLoads = async (load, date_sort) => {
    toggleSpinner(true)
    const url = 'https://openapi.programming-hero.com/api/ai/tools'

    try {
        const resource = await fetch(url);
        const data = await resource.json();
        if (date_sort) {
            const loadData = data.data.tools
            loadData.sort(function (a, b) {
                var c = new Date(a.published_in);
                var d = new Date(b.published_in);
                return c - d;
            }
            );
            console.log(loadData)

        }

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
                    <img src="${image}" class="card-img-top p-4 w-100 " alt="...">
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
    // right side materials of modal ----------------------------------------------------------------------
    const inputText = input_output_examples === null ? 'Can you give any example?' : input_output_examples[0].input
    const outputText = input_output_examples === null ? 'No! Not Yet! Take a break!!!' : input_output_examples[0].output

    idCatcher('img_part')[0].src = image_link[0]
    idCatcher('img_part')[2].innerText = inputText
    idCatcher('img_part')[3].innerText = outputText


    const accuracyField = document.getElementById('accuracy')

    if (accuracy.score === null) {
        accuracyField.style.visibility = "hidden";
    }
    else {
        accuracyField.innerText = `${accuracy.score * 100}% accuracy`
        accuracyField.style.visibility = 'visible'
    }




    // left side material of modals ------------------------------------------------------------------------------------------------------
    idCatcher('title')[0].innerText = description
    idCatcher('pricing')[0].innerText = pricing === null || pricing[0].plan === 'Free' ? 'Free of cost/basic' : pricing[0].price
    idCatcher('pricing')[1].innerText = pricing === null ? 'Free of cost/pro' : pricing[1].price
    idCatcher('pricing')[2].innerText = pricing === null ? 'Free of cost/Enterprise' : pricing[2].price

    const feature = Object.values(features);

    document.getElementById('features').innerHTML = ''
    feature.forEach(feature => {
        const li = document.createElement('li')
        li.innerHTML = feature.feature_name;

        document.getElementById('features').appendChild(li);
    })


    let featureList = '';
    document.getElementById('integrations').innerHTML = ''
    if (integrations === null) {
        featureList += '<li style="list-style-type: none;">no data found</li>'
    }
    else {
        integrations.forEach(integration => {

            featureList += '<li >' + integration + '</li>'
        })
    }



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
let date_sort = false

document.getElementById('seeMore').addEventListener('click', () => {
    document.getElementById('cards').innerHTML = ''
    if (seeMore == true) { seeMore = false }
    phoneLoads(seeMore, date_sort)

})

// see by date function----------------------------------------------------------------------


document.getElementById('date_sort').addEventListener('click', () => {
    document.getElementById('cards').innerHTML = ''
    if (date_sort == false) { date_sort = true }
    phoneLoads(seeMore, date_sort)

})


phoneLoads(seeMore, date_sort)

