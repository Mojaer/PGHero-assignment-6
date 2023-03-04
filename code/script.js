



const cards = document.getElementById('cards')
const cardItems = document.createElement('div')

cardItems.innerHTML = `
<div class="col">
                <div class="card">
                    <img src="..." class="card-img-top p-4 w-100" alt="...">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold">Features</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                            to additional
                            content. This content is a little bit longer.</p>
                        <h5 class="card-title fw-bold">ChatGPT</h5>
                        <p class="card-text "><i class="fas fa-calendar-alt"></i></i></p>
                    </div>
                </div>
            </div>`