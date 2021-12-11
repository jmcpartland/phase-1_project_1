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
  const democratsButton = allSenators.filter(member => member.party == 'D')
  namesList(democratsButton)
};
const idDemocrats = document.getElementById('democrats');
idDemocrats.addEventListener('click', event => democratSenators())


function republicanSenators() {
  cardList.innerHTML = ''
  const republicansButton = allSenators.filter(member => member.party == 'R')
  namesList(republicansButton);
};
const idRepublicans = document.getElementById('republicans')
idRepublicans.addEventListener('click', event => republicanSenators())


function independentSenators() {
  cardList.innerHTML = ''
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
    
    // memberImageTag.addEventListener('mouseenter', (event) => window.onclick = e => console.dir(e.target.style));
    memberImageTag.addEventListener('mouseenter', (event) => event.target.style.opacity = '50%');
    memberImageTag.addEventListener('mouseleave', (event) => event.target.style.opacity = '100%');

    memberImageTag.className = 'member-photo'
    memberImageTag.src = `https://theunitedstates.io/images/congress/225x275/${memberId}.jpg`
        
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
