var dog,dogImg,happydogImg,database,food,foodStock;
var foods;
var database;
var feed,addFood;
var fedTime,lastFed;
var FoodOb;
var addFoods;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();
  /*foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);*/

  //FoodOb = new Food();

  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

  dog = createSprite(400,350);
  dog.addImage("dog",dogImg);
  dog.scale = 0.15;
  
}


function draw() {  
  background("green");

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(0);
  textSize(20);

  if(lastFed >= 12){
    text("LAST FEED : " + lastFed % 12 + "PM",350,30);
  }
  else if(lastFed === 0){
    text("LAST FEED : 12 AM",350,30);
  }
  else{
    text("LAST FEED : " + lastFed + "AM",350,30);
  }
  
  /*if(foods !== undefined){
    textSize(20);
    fill(255);
    text("Note : press UP_ARROW to feed Mango milk",50,50);
    text("Food remaining : " + foods,150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foods);
      dog.addImage("dog",happyDogImg);
      foods = foods - 1
    }

    if(keyWentUp(UP_ARROW)){
      writeStock(foods);
      dog.addImage("dog",dogImg);
    }

    if(foods === 0){
      foods = 20
    }
  }*/

    FoodOb.display();
    drawSprites();
}

/*function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    Food : x
  });
}

function readStock(data){
  foods = data.val();
} */

function feedDog(){
  dog.addImage(dog,happydogImg);
  FoodOb.updateFoodStock(FoodOb.getFoodStock() - 1);
  database.ref('/').update({
    Food : FoodOb.getFoodStock(),
    fedTime : hour()
  })
}

function addFood(){
  foods++;
  database.ref('/').update({
    Food : foods
  })
}
