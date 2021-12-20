// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

document.addEventListener('DOMContentLoaded', event => getSenators());

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const members = document.querySelector('.members')

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
  members.innerHTML = ''
  const democratsFilter = allSenators.filter(member => member.party == 'D')
  membersList(democratsFilter)
};
const idDemocrats = document.getElementById('democrats-btn');
idDemocrats.addEventListener('click', event => democratSenators())

function republicanSenators() {
  members.innerHTML = ''
  const republicansFilter = allSenators.filter(member => member.party == 'R')
  membersList(republicansFilter);
};
const idRepublicans = document.getElementById('republicans-btn')
idRepublicans.addEventListener('click', event => republicanSenators())

function independentSenators() {
  members.innerHTML = ''
  const independentsFilter = allSenators.filter(member => member.party == 'ID')
  membersList(independentsFilter);
};
const idIndependents = document.getElementById('independents-btn')
idIndependents.addEventListener('click', event => independentSenators())


function membersList(senators) {
  for (s of senators) {
    const senator = s;

    const firstLastName = `${senator.first_name} ${senator.last_name}`
    
    const headshotImageTag = document.createElement('img')

    renderHeadshot(senator, headshotImageTag)
    
    const cardColumn = document.createElement('div')
    cardColumn.className = 'column'
    
    const card = document.createElement('div')
    card.className = 'card'
    
    const nameTag = document.createElement('p')
    nameTag.textContent = firstLastName
    
    card.appendChild(headshotImageTag)
    card.appendChild(nameTag)
    
    members.appendChild(card)
  }
};


function opacity50(event) {
  event.target.style.opacity = '50%'
};
function opacity100(event) {
  event.target.style.opacity = '100%'
};
function cursorPointer(event) {
  event.target.style.cursor = 'pointer'
};
function cursorDefault(event) {
  event.target.style.cursor = 'auto'
};


function renderHeadshot(senator, headshotImageTag) {
  const headshot = `https://theunitedstates.io/images/congress/225x275/${senator.id}.jpg`
  const headshotSilhouette = 'https://static.propublica.org/rails/assets/congress/silhouette_male-eb244690d4f7eee39ace3ca9cb41fa44f908b1677ba256fc2522496917d2af02.png'

  headshotImageTag.style.opacity = '50%'
  headshotImageTag.className = 'member-headshot'
  headshotImageTag.addEventListener('mouseenter', cursorPointer);

  headshotImageTag.addEventListener('mouseenter', opacity100);
  headshotImageTag.addEventListener('mouseleave', opacity50);
  headshotImageTag.addEventListener('click', (event) => memberDetails(senator, headshotImageTag));

  // Add silhouette if headshot does not exist
  fetch(headshot).then(function(response) {
    if (response.status == 200) {
      headshotImageTag.src = headshot
      return headshotImageTag
    } else {
      headshotImageTag.src = headshotSilhouette
      return headshotImageTag
    }
  })
};


function memberDetails(senator, headshotImageTag) {
  members.innerHTML = ''

  headshotImageTag.style.opacity = '100%';
  headshotImageTag.addEventListener('mouseenter', cursorDefault);
  headshotImageTag.removeEventListener('mouseenter', opacity100);
  headshotImageTag.removeEventListener('mouseleave', opacity50);

  const detailName = document.createElement('p')
    detailName.textContent = `Name: ${senator.first_name} ${senator.last_name}`;
  const detailTitle = document.createElement('p')
    detailTitle.textContent = `Title: ${senator.title}`;
  const detailParty = document.createElement('p')
    detailParty.textContent = `Party: ${senator.party}`;
  const detailDob = document.createElement('p')
    detailDob.textContent = `DOB: ${senator.date_of_birth}`;
  const detailGender = document.createElement('p')
    detailGender.textContent = `Gender: ${senator.gender}`;

  const detailCard = document.createElement('div');
    detailCard.className = 'detailCard';

  detailCard.appendChild(headshotImageTag);

  members.append(detailCard, detailName, detailTitle, detailParty, detailDob, detailGender);
};