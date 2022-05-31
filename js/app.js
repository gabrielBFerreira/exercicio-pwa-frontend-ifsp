if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    const BASE_URL = "https://gabrielbferreira.github.io/exercicio-pwa-frontend-ifsp/"
    
    navigator.serviceWorker
      .register(`${BASE_URL}sw.js`)
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

async function listarCampeonatos() {
  const result = await fetch('https://api-football-standings.azharimm.site/leagues');
  const leagues = await result.json();
  
  const element = document.getElementById('leagueList');
  
  leagues.data.forEach(league => {
    const paragraph = document.createElement('p');
    const content = document.createTextNode(league.name);
    paragraph.appendChild(content);
    element.appendChild(paragraph);
  });
}

async function detalhesCampeonato(leagueId) {
  const result = await fetch(`https://api-football-standings.azharimm.site/leagues/${leagueId}`);
  const league = await result.json();

  const element = document.getElementById('leagueDetails');
  
  const logo = league.data.logos.light;
  const image = document.createElement('img');
  image.setAttribute('id', 'leagueLogo');
  image.src = logo;
  element.appendChild(image);
  
  const paragraph = document.createElement('p');
  const content = document.createTextNode(`Nome do torneio: ${league.data.name}`);
  paragraph.appendChild(content);
  element.appendChild(paragraph);
}

async function tabelaCampeonato(leagueId, year) {
  const result = await fetch(`https://api-football-standings.azharimm.site/leagues/${leagueId}/standings?season=${year}&sort=asc`);
  const standings = await result.json();

  const element = document.getElementById('leagueStandings');

  const paragraph = document.createElement('p');
  const content = document.createTextNode(`Temporada: ${standings.data.season}`);
  paragraph.appendChild(content);
  element.appendChild(paragraph);

  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  table.appendChild(tableHead);
  table.appendChild(tableBody);

  const headersRow = document.createElement('tr');

  const header0 = document.createElement('th');
  header0.innerHTML = "Posição";
  
  const header1 = document.createElement('th');
  header1.setAttribute('colspan', '2');
  header1.innerHTML = "Time";

  const header2 = document.createElement('th');
  header2.innerHTML = "Jogos";
  
  const header3 = document.createElement('th');
  header3.innerHTML = "Pontos";

  const header4 = document.createElement('th');
  header4.innerHTML = "Vitórias";

  const header5 = document.createElement('th');
  header5.innerHTML = "Empates";

  const header6 = document.createElement('th');
  header6.innerHTML = "Derrotas";

  const header7 = document.createElement('th');
  header7.innerHTML = "Gols pró";

  const header8 = document.createElement('th');
  header8.innerHTML = "Gols contra";

  headersRow.appendChild(header0);
  headersRow.appendChild(header1);
  headersRow.appendChild(header2);
  headersRow.appendChild(header3);
  headersRow.appendChild(header4);
  headersRow.appendChild(header5);
  headersRow.appendChild(header6);
  headersRow.appendChild(header7);
  headersRow.appendChild(header8);

  tableHead.appendChild(headersRow);

  standings.data.standings.forEach(line => {
    const tableRow = document.createElement('tr');
    
    const elem0 = document.createElement('td');
    elem0.innerHTML = line.stats[8].displayValue;

    const elem1 = document.createElement('td');  
    const logo = line.team.logos[0].href;
    const image = document.createElement('img');
    image.setAttribute('class', 'teamLogo');
    image.src = logo;
    elem1.appendChild(image);

    const elem2 = document.createElement('td');
    elem2.innerHTML = line.team.displayName;

    const elem3 = document.createElement('td');
    elem3.innerHTML = line.stats[3].displayValue;

    const elem4 = document.createElement('td');
    elem4.innerHTML = line.stats[6].displayValue;

    const elem5 = document.createElement('td');
    elem5.innerHTML = line.stats[0].displayValue;

    const elem6 = document.createElement('td');
    elem6.innerHTML = line.stats[2].displayValue;

    const elem7 = document.createElement('td');
    elem7.innerHTML = line.stats[1].displayValue;

    const elem8 = document.createElement('td');
    elem8.innerHTML = line.stats[4].displayValue;

    const elem9 = document.createElement('td');
    elem9.innerHTML = line.stats[5].displayValue;

    tableRow.appendChild(elem0);
    tableRow.appendChild(elem1);
    tableRow.appendChild(elem2);
    tableRow.appendChild(elem3);
    tableRow.appendChild(elem4);
    tableRow.appendChild(elem5);
    tableRow.appendChild(elem6);
    tableRow.appendChild(elem7);
    tableRow.appendChild(elem8);
    tableRow.appendChild(elem9);

    tableBody.appendChild(tableRow);
  });

  element.appendChild(table);
}

listarCampeonatos();
detalhesCampeonato('bra.1');
tabelaCampeonato('bra.1', 2022);    