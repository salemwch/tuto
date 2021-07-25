const data = [
    {
        id : 0, 
        img : 'img/infinix not 7.jpg',
        name : 'infinix not 7',
        price : 250,
        save : 25,
        delivery: 'in 3 - 4 days',
        itemInCart: false
    },
    {
        id : 1, 
        img : 'img/huwaei mate 30 pro.jpg',
        name : 'huwaei mate 30 pro',
        price : 450,
        save : 50,
        delivery: 'in 3 - 4 days',
        itemInCart: false
    }, 
    {
        id : 2,
        img : 'img/samsung s20.jpg',
        name : ' samsung s20',
        price : 550,
        save : 30,
        delivery: 'in 3 - 4 days',
        itemIncart: false
    },
    {
        id : 3, 
        img : 'img/infinix.jpg',
        name : 'infinix',
        price : 650,
        save : 35,
        delivery: 'in 3 - 4 days',
        itemInCart: false
    },
    {
        id : 4, 
        img : 'img/redmi 10X pro.jpg',
        name : 'redmi 10x pro',
        price : 200,
        save : 15,
        delivery: 'in 3 - 4 days',
        itemInCart: false
    },
    {
        id : 5, 
        img : 'img/redmi k30.jpg',
        name : 'redmi k30',
        price : 500,
        save : 25,
        delivery: 'in 3 - 4 days',
        itemInCart: false
    }, 
    {
        id : 6, 
        img : 'img/redmi note 10.jpg',
        name : 'redmi note 10',
        price : 600,
        save : 20,
        delivery: 'in 3 - 4 days',
        itemInCart: false
    }, 
    {
        id : 7, 
        img : 'img/redmi note 9 pro.jpg',
        name : 'redmi note 9 pro',
        price : 700,
        save : 25,
        delivery: 'in 3 - 4 days',
        itemInCart: false
    },
];

let cartList = []; //array to store lists

var i;
var detail = document.getElementsByClassName('card-item');
var detailsimg = document.getElementById('details-img');
var detailTitle = document.getElementById('detail-title');
var cartPrice = document.getElementById('cart-price');
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('back');

back.addEventListener('click',refreshpage);
var addToCarts = document.querySelectorAll('#add-to-cart');
var cart = document.getElementById('cart');

 //click event to display cart page 
cart.addEventListener('click',displaycart);

var carts = document.getElementById('carts');

 //click events to add items to cart from details page
carts.addEventListener('click',()=>addToCart(getId));

var home = document.getElementById('logo');

 //click event to hide cart page and return to home page 
home.addEventListener('click',hideCart);
//click events on dynamically created element to remove items from list 
document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        var itemId = e.target.parentNode.id;
        removeFromCart(itemId);
    }
})

//click event to display details page 
for(i=0;i<data.length;i++){
    detail[i].addEventListener('click',handleDetail)
}
var getId;

//click event to add items to cart from home page cart icon
addToCarts.forEach(val=>val.addEventListener('click',()=>addToCart(val.parentNode.id)));

//details function
function handleDetail(e){
    detailsPage.style.display = 'block';
    getId= this.parentNode.id;
    detailsimg.src = data[getId].img;
    detailTitle.innerHTML = data[getId].name;
    cartPrice.innerHTML = 'price : $' + data[getId].price ;
    youSave.innerHTML = 'You save : ($' + data[getId].save +')';
}


//function to display cart page 
function displaycart(){
    document.getElementById('main').style.display = 'none';
    document.getElementById('details-page').style.display = 'none';
    document.getElementById('cart-container').style.display = 'block';
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';
    }
    else{
        document.getElementById('cart-with-items').style.display = 'block';
        document.getElementById('empty-cart').style.display = 'none';
    }
}



var totalamount;
var totalitems;
var totalsaving;

//add item to the cart
function additem(){
    totalamount=0;
    totalitems = 0;
    totalsaving=0
    var clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        console.log(clrNode.childNodes)
        cartList.map((cart)=>
        {
            var cartCont = document.getElementById('item-body');
            totalamount = totalamount + cart.price;
            totalsaving = totalsaving + cart.save;
            totalitems = totalitems + 1;

            var tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            var listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            var listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)
        
            var listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            var listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            var listTrash = document.createElement('i');
            listTrash.setAttribute('class','fa fa-trash ');
            listTrash.setAttribute('id','remove');
            tempCart.appendChild(listTrash);

            cartCont.appendChild(tempCart)
    })
    document.getElementById('total-amount').innerHTML = 'total amount : $ ' + totalamount;
        document.getElementById('total-items').innerHTML = 'total items : ' + totalitems;
        document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalsaving;
        document.getElementById('total').style.display= "block";
}

//add item to the cart 
function addToCart(id){
    if(!data[id].itemInCart){
        cartList = [...cartList,data[id]];
        additem();

        alert('item added to your cart');
    }
    else{
        alert('your item is already there');
    }
    data[id].itemInCart = true;
}
//hide your cart page 
function hideCart(){
    document.getElementById('main').style.display = 'block';
    document.getElementById('cart-container').style.display = 'none';
}

//back to home page from details page 
function refreshpage(){
    detailsPage.style.display = 'none'
}
//remove item from the cart
function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=>list.id!=itemId);
    additem()
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
}




