console.log(Redux);
console.log(ReduxThunk);

// constants
const WITHDRAW_MONEY="WITHDRAW_MONEY";
const DEPOSITE_MONEY="DEPOSITE_MONEY";
const ADD_PRODUCT="ADD_PRODUCT";
const GET_PRODUCTS="GET_PRODUCTS";


// touts les actions
// const action ={
//     type: "WITHDRAW_MONEY"
// }


// creer action par function(Action Creators)
const withdraw = (amount)=>{
    return{
        type: WITHDRAW_MONEY,
        payload: amount

    }
}

// const action2 ={
//     type: "DEPOSITE_MONEY"
// }

const deposite = function(amount){
    return{
        type: DEPOSITE_MONEY,
        payload: amount

    }
}

const addProduct = function(product){
    return{
        type: ADD_PRODUCT,
        payload: product

    }
}

const getProducts = (products)=> {
    return{
        type: GET_PRODUCTS,
        payload: products

    }
}



// recuperer les données dans API
const fetchProducts =()=>{
    return async(dispatch)=> {

            const res =await fetch ('https://fakestoreapi.com/products');
            const data =await res.json();
            console.log(data); 
            dispatch(getProducts(data))
            }
    }


// tous les Reducers

const bankReducer=(state=1000,action)=> {
    switch(action.type){
        case WITHDRAW_MONEY: return state -action.payload;
        case DEPOSITE_MONEY: return state +action.payload;

        default:
            return state;
    }
}


const productsReducer=(state=[],action)=> {
    switch(action.type){
        case GET_PRODUCTS: return [...action.payload] ;


        case ADD_PRODUCT: return [ ...state, action.payload] ;

        default:
            return state;
    }
}

const appReducer =Redux.combineReducers({
bank:bankReducer,
products: productsReducer

})

const store =Redux.createStore(appReducer,Redux.applyMiddleware(ReduxThunk)) ;


// store.dispatch(withdraw(300));
// store.dispatch(withdraw(200));
// store.dispatch(deposite(1000));
// store.dispatch(addProduct({id:1,title:"test"}));
// store.dispatch(fetchProducts());
// console.log(store.getState());




let amountInput =document.querySelector("#amount")
 let amountValue=document.querySelector("#value")
 amountValue.innerHTML= store.getState().bank;
document.querySelector("#withdraw").addEventListener('click',() => {
    store.dispatch(withdraw(+amountInput.value))
})

document.querySelector("#deposite").addEventListener('click',() => {
    store.dispatch(deposite(+amountInput.value))
})


store.subscribe(()=>{
    console.log("CURRENT STATE" , store.getState());
    amountValue.innerHTML= store.getState().bank;

})


