
// ProPublica Data Store: Congress API
// https://www.propublica.org/datastore/api/propublica-congress-api

// let allSenators = [];

const senateMembers = 'https://api.propublica.org/congress/v1/117/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const tr = document.querySelector('tr');
const td = document.querySelector('td');

fetch(senateMembers, {
    headers: {
        'X-API-Key' : propublicaKey
    }
})
.then(response => response.json())
.then(result => result.results[0].members.forEach(name => congressNames(name)));

// .then(result => result.results[0].members.forEach(name => allSenators.push(name)));

// const rSenators = allSenators.filter(member => member.party == 'R')
// console.log(rSenators);



function congressNames(name) {
  const memberList = document.querySelector('.memberList')
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(name.first_name + ' ' + name.last_name + ' (' + name.party + ') ' + name.state))
  memberList.appendChild(li)
};



function allSenators(name) {
  if (name.party == 'R')
  console.log(name)
}

// console.log(allSenators());