const loadPhon= async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent= '';

    const showAll = document.getElementById('show-all');
    if(phones.length >12 && !isShowAll){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    


  




    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 w-96 shadow-xl`;
        phoneCard.innerHTML = `
         <figure>
        <img
            src="${phone.image}"
            alt="${phone.phone_name}" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions justify-end">
            <button onclick="ShowDetails('${phone.slug}')" class="btn btn-primary w-full">Show Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
     });
     spinerLoader(false);
}

const searchHandler = (isShowAll) =>{
    spinerLoader(true);
    const searchField = document.getElementById('search-feild');
    const searchText = searchField.value;
    loadPhon(searchText, isShowAll);
}
const loaderSpiner = document.getElementById('lorading-spiner');

const spinerLoader = (isLoading) =>{
    if(isLoading){
        loaderSpiner.classList.remove('hidden');
    }
    else{
        loaderSpiner.classList.add('hidden');
    }
}

const handlaeShowAll = ()=>{
    const showALLContainer = document.getElementById('show-all');
    searchHandler(true)

}


const ShowDetails = async(id)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName =document.getElementById('shoe-details-phone-name');
    phoneName.innerText= phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML= `
    <img
            src="${phone.image}"
            alt="" />
    <p class="font-bold text-lg">Brand:${phone.brand} </p>
    <p class="font-bold text-lg">Blurtooth:${phone.others.Bluetooth} </p>
    <p class="font-bold text-lg">GPS:${phone.others.GPS} </p>
    <p class="font-bold text-lg">NFC:${phone.others.NFC} </p>
    <p class="font-bold text-lg">Radio:${phone.others.Radio} </p>
    <p class="font-bold text-lg">USB:${phone.others.USB} </p>
    <p class="font-bold text-lg">WLAN:${phone.others.WLAN} </p>

    `
    

    show_details_modal.showModal();
}