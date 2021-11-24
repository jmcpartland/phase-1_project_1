const congressMembers = 'https://api.propublica.org/congress/v1/116/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

function congressNames(name) {
    console.log(name.first_name + ' ' + name.last_name + '-' + name.party + '\n ' + name.state)
};

fetch(congressMembers, {
    headers: {
        "X-API-Key" : propublicaKey
    }
})
.then(response => response.json())
.then(result => result.results[0].members.forEach(name => congressNames(name)));

