console.log('%c I WILL CONQUER THIS MOUNTAIN! - Sir Didymus', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    
    const dogBreedContainer = document.querySelector("#dog-breeds")
    const breedDropdown = document.querySelector("#breed-dropdown")

    fetch(imgUrl).then(function(response){
        return response.json()
    }).then(function(json) {
        for (const element of json['message']) {
            const dogImageContainer = document.querySelector("#dog-image-container")
            const img = document.createElement('img')
            img.src = element
            dogImageContainer.appendChild(img)
        }
    })
    let savedLi = []
    fetch(breedUrl).then(function(response){
        return response.json()
    }).then(function(json) {
        for (const key in json['message']) {
            const li = document.createElement('li')
            if(json['message'][key][0] != undefined){
                li.innerText = json['message'][key][0]
                dogBreedContainer.appendChild(li)
                li.setAttribute("id", json['message'][key][0])
                li.classList.add("breeds")
                savedLi.push(li)
            }
        }
        const breeds = document.querySelectorAll("li")
        breeds.forEach(breed =>
            breed.addEventListener("click", function(e){
                if (breed.style.color == "pink"){
                    breed.style.color = "blue"
                } else {
                    breed.style.color = "pink"
                }
            })
        )
    })
    breedDropdown.addEventListener('change', function(){
        chooseLetter(this.value)
        function chooseLetter(letter){
            let selectedElems = []
            while (dogBreedContainer.firstChild) {
                dogBreedContainer.removeChild(dogBreedContainer.firstChild)
            }
            for (let i = 0; i < savedLi.length; i++) {
                let breedStart = savedLi[i].innerText.startsWith(letter)
                if (breedStart == true){
                    selectedElems.push(savedLi[i])
                }
            }
            for (let i = 0; i < selectedElems.length; i++) {
                dogBreedContainer.appendChild(selectedElems[i])
            }
            selectedElems = [] 
        }
    })
})
