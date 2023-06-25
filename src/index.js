window.addEventListener('DOMContentLoaded', () => {
    initialRender()
    document.getElementById('new-ramen').addEventListener('submit', handleNewRamen)
})

function initialRender(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
        document.getElementById('ramen-menu').innerHTML = ''
        data.forEach(element => {
            const img = document.createElement('img')
            img.src = element.image
            img.addEventListener('click', renderDetail)
            img.id = element.id
            
            document.getElementById('ramen-menu').appendChild(img)
        });

        
    })

    fetch(`http://localhost:3000/ramens/1`)
    .then(res => res.json())
    .then(data => {
        const img = document.getElementById('detail-image')
        const name = document.getElementById('detail-name')
        const restaurant = document.getElementById('detail-restaurant')
        const rating = document.getElementById('rating-display')
        const comment = document.getElementById('comment-display')

        img.src = data.image
        name.textContent = data.name
        restaurant.textContent = data.restaurant
        rating. textContent = data.rating
        comment.textContent = data.comment
    })
}

function renderDetail(e){
    fetch(`http://localhost:3000/ramens/${e.target.id}`)
    .then(res => res.json())
    .then(data => {
        const img = document.getElementById('detail-image')
        const name = document.getElementById('detail-name')
        const restaurant = document.getElementById('detail-restaurant')
        const rating = document.getElementById('rating-display')
        const comment = document.getElementById('comment-display')

        img.src = data.image
        name.textContent = data.name
        restaurant.textContent = data.restaurant
        rating. textContent = data.rating
        comment.textContent = data.comment
    })
}

function handleNewRamen(e){
    e.preventDefault()
    const obj = {}
    
    obj.name = e.target[0].value
    obj.restaurant = e.target[1].value
    obj.img = e.target[2].value
    obj.rating = e.target[3].value
    obj.comment = e.target[4].value

    fetch('http://localhost:3000/ramens', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        initialRender()
    })
}