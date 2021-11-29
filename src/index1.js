const congressMembers = 'https://api.propublica.org/congress/v1/116/senate/members.json'
const propublicaKey = 'tNm5YIP9zO7SCYymYDfjB73IRmhUzMmC8beETVXI'

const tr = document.querySelector('tr');
const td = document.querySelector('td');

fetch(congressMembers, {
    headers: {
        "X-API-Key" : propublicaKey
    }
})
.then(response => response.json())
.then(result => result.results[0].members.forEach(name => congressNames(name)));

function congressNames(name) {
  console.log(name.first_name + ' ' + name.last_name + '-' + name.party + '\n ' + name.state)
};


function generateTable(name) {
  const congressName = `${name.first_name} ${name.last_name}`

  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.querySelector("table");
  var tblBody = document.querySelector("tbody");

  // creating all cells
//   for (var i = 0; i < 2; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      cell.innerHTML = `${congressName}, ${name.state}`
//       var cellText = document.createTextNode(`${congressName}, ${name.state}`);
//       cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
//   }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "1");
}
