// function membersList(senators) {
//   for (senator of senators) {
//     const firstLastName = `${senator.first_name} ${senator.last_name}`

//     const headshotImageTag = document.createElement('img')
//     headshotImage(headshotImageTag)

//     const cardColumn = document.createElement('div')
//     cardColumn.className = 'column'

//     const card = document.createElement('div')
//     card.className = 'card'
    
//     const pTag = document.createElement('p')
//     pTag.textContent = firstLastName

//     card.appendChild(headshotImageTag)
//     card.appendChild(pTag)
    
//     cardList.appendChild(card)
//   }
// };


// function headshotImage(imageTag) {
//   let headshot = `https://theunitedstates.io/images/congress/225x275/${senator.id}.jpg`
//   let headshotSilhouette = 'https://static.propublica.org/rails/assets/congress/silhouette_male-eb244690d4f7eee39ace3ca9cb41fa44f908b1677ba256fc2522496917d2af02.png'
  
//   imageTag.className = 'member-headshot'
//   imageTag.addEventListener('mouseenter', (event) => event.target.style.opacity = '50%');
//   imageTag.addEventListener('mouseleave', (event) => event.target.style.opacity = '100%');
//   imageTag.addEventListener('click', (event) => memberDetails());
  
//   // Add silhouette if headshot does not exist
//   fetch(headshot).then(function(response) {
//     if (response.status == 200) {
//       imageTag.src = headshot
//     } else {
//       imageTag.src = headshotSilhouette
//     }
//   })
// }

// function memberDetails() {
//   console.log('I have been clicked')
// };


