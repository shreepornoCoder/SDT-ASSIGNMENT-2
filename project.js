const load_default = () =>{
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=m")
    .then(res=>res.json())
    .then(data=>{
        display_data(data.player, data.player.length)
    }) 
}

const search_player = () =>{
    let player_name = document.getElementsByClassName("search-bar")[0].value;
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${player_name}`)
    .then(res=>res.json())
    .then(data=>{
        display_data(data.player, data.player.length)
    })
}

const display_data = (players, length) =>{
    document.getElementById("player-container").innerHTML = '';

    const player_container = document.getElementById("player-container");
    
    players.forEach(element => {        
        const div = document.createElement("div")

        if (element.strThumb != null)
        {
            const uniqueBtnId = `group-btn-${element.idPlayer}`;
            div.classList.add("player-card")

            div.innerHTML=`
            <img class="player_img" src="${element.strThumb}">
            <h4>Name: ${element.strPlayer}</h4>
            <h5>Gender: ${element.strGender}</h5>
            <h5>Nationality: ${element.strNationality}</h5>
            <h5>Sports: ${element.strSport}</h5>
            <h5>Weight: ${element.strWeight}</h5>
            <h5>Ethnicity: ${element.strEthnicity}</h5>
            <button class="group-btn" id="${uniqueBtnId}" onclick="add_to_group_btn('${element.idPlayer}', '${uniqueBtnId}')">Add To Group</button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary details-btn" onclick="display_details('${element.idPlayer}')">Details</button>

            `
        }
        div.style.textAlign = 'center';
        player_container.appendChild(div)
    });
}

const display_details = (player_id) =>{
    document.getElementById("m-b").innerHTML = '';

    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${player_id}`)
    .then(res=>res.json())
    .then(data=>{
        const player_info = data.players[0];
        const container = document.getElementById("m-b");
 
        const div = document.createElement("div")
 
        div.innerHTML=`
        <img class="detail-player-img" src="${player_info.strThumb}">
        <h3>Player Name: ${player_info.strPlayer}</h3>
        <h5>Player Date of Birth: ${player_info.dateBorn}</h5>
        <h5>Player Nation: ${player_info.strNationality}</h5>
        <h5>Sports: ${player_info.strSport}</h5>
        <h5>Player Team: ${player_info.strTeam}</h5>

        <a href="${player_info.strYoutube}"><i class="fa-brands fa-youtube" style="color:red; padding:10px; font-size:25px"></i></a>
        <a href="https://${player_info.strTwitter}"><i class="fa-brands fa-twitter" style="color:lightblue; padding:10px; font-size:25px"></i></a>
        <a href="${player_info.strFacebook}"><i class="fa-brands fa-facebook" style="color:blue; padding:10px; font-size:25px"></i></a>
        <a href="${player_info.strInstagram}"><i class="fa-brands fa-instagram" style="color:purple; padding:10px; font-size:25px"></i></a>
        `                  
        div.style.textAlign = 'center';

        container.appendChild(div)
        
    }) 
}

const add_to_group_btn = (player_id, btn_id)  => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${player_id}`)
    .then(res=>res.json())
    .then(data=>{
        display_guiders(data.players[0], btn_id)
    }) 
}

const display_guiders = (player, btn_id) =>{
    const grp_btn = document.getElementById(btn_id);

    if (grp_btn && grp_btn.innerText === "Add To Group"){
        const container = document.getElementById("cart-container");

        const div = document.createElement("div")

        div.classList.add("cart")

        div.innerHTML = `
            <img class="detail-player-img" src="${player.strThumb}">
            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" id="cart-detail-btn" class="btn btn-primary details-btn" onclick="display_details('${player.idPlayer}')">Details</button>
        `
        const malePlayerNumElement = document.getElementById("t-male-player-num").innerText;
        const femalePlayerNumElement = document.getElementById("t-female-player-num").innerText;
        let totalPlayerNumElement = parseInt(document.getElementById("t-player-num").innerText);

        if (player.strGender === "Male") {
            const count = parseInt(malePlayerNumElement)+1
            document.getElementById("t-male-player-num").innerText = count
        } 
        else if (player.strGender === "Female") {
            const count = parseInt(femalePlayerNumElement)+1
            document.getElementById("t-female-player-num").innerText = count
        }
        totalPlayerNumElement = (parseInt(malePlayerNumElement)+parseInt(femalePlayerNumElement))+1
        if (totalPlayerNumElement < 12)
        {
            document.getElementById("t-player-num").innerText = totalPlayerNumElement;
        }
        else{
            canAdd=false
        }
        container.appendChild(div)
    }
    if (grp_btn) {
        grp_btn.innerText = "Already Added";
        document.getElementById(btn_id).style.backgroundColor="red";
    }
}   

load_default()