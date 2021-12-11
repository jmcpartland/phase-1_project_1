// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

document.addEventListener('DOMContentLoaded', event => getSenators());

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const memberList = document.querySelector('.memberList')
const listCards = document.querySelector('.list')

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
  listCards.innerHTML = ''
  const democratsButton = allSenators.filter(member => member.party == 'D')
  namesList(democratsButton)
};
const idDemocrats = document.getElementById('democrats');
idDemocrats.addEventListener('click', event => democratSenators())


function republicanSenators() {
  listCards.innerHTML = ''
  const republicansButton = allSenators.filter(member => member.party == 'R')
  namesList(republicansButton);
};
const idRepublicans = document.getElementById('republicans')
idRepublicans.addEventListener('click', event => republicanSenators())


function independentSenators() {
  listCards.innerHTML = ''
  const independentsButton = allSenators.filter(member => member.party == 'ID')
  namesList(independentsButton);
};
const idIndependents = document.getElementById('independents')
idIndependents.addEventListener('click', event => independentSenators())




function namesList(senators) {
  for (s of senators) {
    const firstLastName = `${s.first_name} ${s.last_name}`
    const memberId = s.id

    const memberImageTag = document.createElement('img')
    memberImageTag.className = 'member-photo'
    memberImageTag.alt = 'member photo'
    memberImageTag.src = `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`

    const p = document.createElement('p')
    const card = document.createElement('p')
    card.className = 'card'
    card.innerHTML = `${firstLastName} <br><br>`
    
    p.appendChild(card)
    // memberImageTag.appendChild(card)
    listCards.appendChild(p)
    // listCards.appendChild(p)
    
    console.log(listCards)

  }
};
