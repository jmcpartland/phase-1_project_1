// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const tr = document.querySelector('tr');
const td = document.querySelector('td');


let allSenators = [];

fetch(senateMembers, {
    headers: {
        'X-API-Key' : propublicaKey
    }
})
  .then(response => response.json())
  .then(data => returnedData(data))

  
function returnedData(data) {
  return data.results[0].members.forEach(name => allSenators.push(name))
};


function democratSenators() {
  const dSenators = allSenators.filter(member => member.party == 'D')
  namesList(dSenators);
};

function republicanSenators() {
  const rSenators = allSenators.filter(member => member.party == 'R')
  namesList(rSenators);
};


function namesList(senators) {
  for (s of senators) {
    const memberList = document.querySelector('.memberList')
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(s.first_name + ' ' + s.last_name + ' (' + s.party + ') ' + s.state))
    memberList.appendChild(li)
  }
};