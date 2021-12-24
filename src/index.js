// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

document.addEventListener('DOMContentLoaded', event => getSenators());

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const members = document.querySelector('.members')

const allSenators = [];

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
  return data.results[0].members.forEach(name => {
    allSenators.push(name)
    name.follow = false
  })
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
    const card = document.createElement('div')
    const container = document.createElement('div')
    const nameTag = document.createElement('p')

    const followBtn = document.createElement('button')
    const followBtnText = function() {
      if (senator.follow === false) {
        return 'Follow'
      } else {
        return 'Following'
      }
    };

    followBtn.textContent = followBtnText()
    followBtn.addEventListener('click', (event) => followCallback(senator))
    
    function followCallback(senator) {
      if (senator.follow === false) {
        followBtn.textContent = 'Following'
        senator.follow = true
      } else {
        followBtn.textContent = 'Follow'
        senator.follow = false
      }
    };

    renderHeadshot(senator, headshotImageTag)
    
    container.className = 'container'    
    card.className = 'card'
    followBtn.className = 'follow-button'
    nameTag.textContent = firstLastName

    container.append(nameTag, followBtn)
    card.append(headshotImageTag, container)
    members.appendChild(card)
  }
};


function opacity70(event) {
  event.target.style.opacity = '70%'
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

  headshotImageTag.style.opacity = '70%'
  headshotImageTag.className = 'member-headshot'
  headshotImageTag.addEventListener('mouseenter', cursorPointer);

  headshotImageTag.addEventListener('mouseenter', opacity100);
  headshotImageTag.addEventListener('mouseleave', opacity70);
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
  headshotImageTag.removeEventListener('mouseleave', opacity70);
  
  const name = 'Name:';
  const title = 'Title:';
  const party = 'Party:';
  const dob = 'DOB:';
  const gender = 'Gender:';

  const detailCard = document.createElement('div');
    detailCard.className = 'detailCard';

  const detailName = document.createElement('p')
    detailName.innerHTML = `${name.bold()} ${senator.first_name} ${senator.last_name}`;
  const detailTitle = document.createElement('p')
    detailTitle.innerHTML = `${title.bold()} ${senator.title}`;
  const detailParty = document.createElement('p')
    detailParty.innerHTML = `${party.bold()} ${senator.party}`;
  const detailDob = document.createElement('p')
    detailDob.innerHTML = `${dob.bold()} ${senator.date_of_birth}`;
  const detailGender = document.createElement('p')
    detailGender.innerHTML = `${gender.bold()} ${senator.gender}`;

  detailCard.appendChild(headshotImageTag);

  members.append(detailCard, detailName, detailTitle, detailParty, detailDob, detailGender);
};
