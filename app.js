const container = document.querySelector('.container');
const movieName = document.getElementById('movie-name');
let moviePrice = +movieName.value;
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const numberOfSeats = document.querySelector('.amount-seat');
const totalPrice = document.querySelector('.total-price');

const doneBtn = document.querySelector('.btn-primary');


populateDataFromLS();

// Functions

// Display Selected seats

function selectedSeatsFunctn(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    return selectedSeats;
}
// Update Selected Count
function updateSelectedCount(){
    const selectedSeats = selectedSeatsFunctn();
    const selectedIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)
    )
    localStorage.setItem('selectedIndex',JSON.stringify(selectedIndex));
    
    const numberOfSelectedSeats = selectedSeats.length;
    numberOfSeats.innerText = +numberOfSelectedSeats;
    totalPrice.innerText = +numberOfSelectedSeats*moviePrice;
}

// Set movie data to local storage

function setMovieDataToLS(index,price){
    localStorage.setItem('movieIndex',index);
    localStorage.setItem('moviePrice',price);
}

// Populate data from local storage

function populateDataFromLS(){
    const selectedIndex = JSON.parse(localStorage.getItem('selectedIndex'));
    if( selectedIndex !== null && selectedIndex.length > 0 ){

        seats.forEach(function(seat,index){
            if(selectedIndex.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    movieIndex = JSON.parse(localStorage.getItem('movieIndex'));
    moviePrice = JSON.parse(localStorage.getItem('moviePrice'));
    if(movieIndex !== null ){
        movieName.selectedIndex = movieIndex;
    }
    updateSelectedCount();
    // numberOfSeats.innerText = selectedIndex.length;
    // totalPrice.innerText = selectedIndex.length*+moviePrice;
}


//Reset Seats

function resetAll(){
    numberOfSeats.innerText = 0;
    totalPrice.innerText = 0;
    const selectedSeats = selectedSeatsFunctn();
    if(selectedSeats.length > 0){
        selectedSeats.forEach((seat)=>{
            seat.classList.remove('selected')
        })
    }
    localStorage.removeItem('moviePrice');
    localStorage.removeItem('movieIndex');
    localStorage.removeItem('selectedIndex');
} 


// Event Listners

container.addEventListener('click',(e) =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();

    } 
});

movieName.addEventListener('change', (e) => {
    setMovieDataToLS(e.target.selectedIndex,e.target.value);
    // resetAll();
    moviePrice = +movieName.value;
    updateSelectedCount();
});

document.querySelector('.btn-secondary').addEventListener('click',(e)=>{
    resetAll();
    e.preventDefault();
});
updateSelectedCount();