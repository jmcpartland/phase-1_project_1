

function membersList(senators) {
  for (sen of senators) {
    const firstLastName = `${sen.first_name} ${sen.last_name}`

    const headshot = `https://theunitedstates.io/images/congress/225x275/${sen.id}.jpg`
    const headshotSilhouette = 'https://static.propublica.org/rails/assets/congress/silhouette_male-eb244690d4f7eee39ace3ca9cb41fa44f908b1677ba256fc2522496917d2af02.png'
    
    const headshotImageTag = document.createElement('img')
  
    headshotImageTag.className = 'member-headshot'
    headshotImageTag.addEventListener('mouseenter', (event) => event.target.style.opacity = '50%');
    headshotImageTag.addEventListener('mouseleave', (event) => event.target.style.opacity = '100%');
    
    // Add silhouette if headshot does not exist
    fetch(headshot).then(function(response) {
      if (response.status == 200) {
        return headshotImageTag.src = headshot
      } else {
        return headshotImageTag.src = headshotSilhouette
      }
    })
    
    
    // console.log(`renderHeadshot result: ${sen}`)
    
    const cardColumn = document.createElement('div')
    cardColumn.className = 'column'
    
    const mySen = sen

    const card = document.createElement('div')
    card.className = 'card'
    
    const nameTag = document.createElement('p')
    nameTag.textContent = firstLastName
    
    card.appendChild(headshotImageTag)
    card.appendChild(nameTag)
    
    card.addEventListener('click', (event) => memberDetails(mySen))

    members.appendChild(card)
  }
};


// function renderHeadshot(sen) {
//   const headshot = `https://theunitedstates.io/images/congress/225x275/${sen.id}.jpg`
//   const headshotSilhouette = 'https://static.propublica.org/rails/assets/congress/silhouette_male-eb244690d4f7eee39ace3ca9cb41fa44f908b1677ba256fc2522496917d2af02.png'
  
//   const headshotImageTag = document.createElement('img')

//   headshotImageTag.className = 'member-headshot'
//   headshotImageTag.addEventListener('mouseenter', (event) => event.target.style.opacity = '50%');
//   headshotImageTag.addEventListener('mouseleave', (event) => event.target.style.opacity = '100%');
//   headshotImageTag.addEventListener('click', (event) => console.log(sen.first_name));

//   // Add silhouette if headshot does not exist
//   fetch(headshot).then(function(response) {
//     if (response.status == 200) {
//       return headshotImageTag.src = headshot
//     } else {
//       return headshotImageTag.src = headshotSilhouette
//     }
//   })
  
//   return headshotImageTag
// }