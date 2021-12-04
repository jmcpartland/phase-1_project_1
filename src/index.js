// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

document.addEventListener('DOMContentLoaded', event => getSenators());

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

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
  const dSenators = allSenators.filter(member => member.party == 'D')
  namesList(dSenators)
};
const idDemocrats = document.getElementById('democrats');
idDemocrats.addEventListener('click', event => democratSenators())


function republicanSenators() {
  const rSenators = allSenators.filter(member => member.party == 'R')
  namesList(rSenators);
};
const idRepublicans = document.getElementById('republicans')
idRepublicans.addEventListener('click', event => republicanSenators())


function independentSenators() {
  const iSenators = allSenators.filter(member => member.party == 'ID')
  namesList(iSenators);
};
const idIndependents = document.getElementById('independents')
idIndependents.addEventListener('click', event => independentSenators())


const memberList = document.querySelector('.memberList')
const rowCard = document.querySelector('.row')


function namesList(senators) {
  for (s of senators) {
    const firstLastName = `${s.first_name} ${s.last_name}`

    const cardColumn = document.createElement('div')
    cardColumn.className = 'column'

    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = firstLastName
    
    cardColumn.appendChild(card)
    rowCard.appendChild(cardColumn)
  }
};
