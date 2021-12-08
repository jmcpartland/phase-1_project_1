// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

document.addEventListener('DOMContentLoaded', event => getSenators());

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const memberList = document.querySelector('.memberList')
const listCard = document.querySelector('.list')

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
  listCard.innerHTML = ''
  const democratsButton = allSenators.filter(member => member.party == 'D')
  namesList(democratsButton)
};
const idDemocrats = document.getElementById('democrats');
idDemocrats.addEventListener('click', event => democratSenators())


function republicanSenators() {
  listCard.innerHTML = ''
  const republicansButton = allSenators.filter(member => member.party == 'R')
  namesList(republicansButton);
};
const idRepublicans = document.getElementById('republicans')
idRepublicans.addEventListener('click', event => republicanSenators())


function independentSenators() {
  listCard.innerHTML = ''
  const independentsButton = allSenators.filter(member => member.party == 'ID')
  namesList(independentsButton);
};
const idIndependents = document.getElementById('independents')
idIndependents.addEventListener('click', event => independentSenators())




function namesList(senators) {
  for (s of senators) {
    const firstLastName = `${s.first_name} ${s.last_name}`
    const memberId = s.id

    // const br = document.createElement('br')
    const memberImageTag = document.createElement('img')
    memberImageTag.className = 'memberPhoto'
    memberImageTag.src = `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`
        
    const cardColumn = document.createElement('div')
    cardColumn.className = 'column'

    const card = document.createElement('p')
    card.className = 'card'
    card.textContent = firstLastName

    // memberImageTag.after(card)
    card.appendChild(memberImageTag)

    // cardColumn.appendChild(card)
    // console.log(cardColumn)
    listCard.appendChild(card)
  }
};
