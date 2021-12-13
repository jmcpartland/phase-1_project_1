// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

document.addEventListener('DOMContentLoaded', event => getSenators());

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const memberList = document.querySelector('.memberList')
const cardList = document.querySelector('.list')

let allSenators = [];

function getSenators() {
  fetch(senateMembers, {
    headers: {
      'X-API-Key' : propublicaKey
    }
  })
    .then(response => response.json())
    .then(data => returnedData(data))
};

function returnedData(data) {
  return data.results[0].members.forEach(name => allSenators.push(name))
};


function democratSenators() {
  cardList.innerHTML = ''
  const democratsFilter = allSenators.filter(member => member.party == 'D')
  membersList(democratsFilter)
};
const idDemocrats = document.getElementById('democrats');
idDemocrats.addEventListener('click', event => democratSenators())


function republicanSenators() {
  cardList.innerHTML = ''
  const republicansFilter = allSenators.filter(member => member.party == 'R')
  membersList(republicansFilter);
};
const idRepublicans = document.getElementById('republicans')
idRepublicans.addEventListener('click', event => republicanSenators())


function independentSenators() {
  cardList.innerHTML = ''
  const independentsFilter = allSenators.filter(member => member.party == 'ID')
  membersList(independentsFilter);
};
const idIndependents = document.getElementById('independents')
idIndependents.addEventListener('click', event => independentSenators())



function membersList(senators) {
 
  for (s of senators) {
    const firstLastName = `${s.first_name} ${s.last_name}`
    const memberId = s.id

    let headshot = `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`
    let headshotSilhouette = 'https://static.propublica.org/rails/assets/congress/silhouette_male-eb244690d4f7eee39ace3ca9cb41fa44f908b1677ba256fc2522496917d2af02.png'

    const memberImageTag = document.createElement('img')
    
    memberImageTag.addEventListener('mouseenter', (event) => event.target.style.opacity = '50%');
    memberImageTag.addEventListener('mouseleave', (event) => event.target.style.opacity = '100%');

    memberImageTag.className = 'member-photo'
    
    fetch(headshot).then(function(response) {
        if (response.status == 200) {
          memberImageTag.src = headshot
        } else {
          memberImageTag.src = headshotSilhouette
        }
      })


    const cardColumn = document.createElement('div')
    cardColumn.className = 'column'

    const card = document.createElement('div')
    const pTag = document.createElement('p')

    card.className = 'card'
    pTag.textContent = firstLastName

    card.appendChild(memberImageTag)
    card.appendChild(pTag)
    
    cardList.appendChild(card)
    
  }
};

