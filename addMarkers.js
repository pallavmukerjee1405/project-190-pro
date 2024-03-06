AFRAME.registerComponent("create-markers", {

    init: async function(){
      var mainScene=document.querySelector("#main-scene");
  
      var cars= await this.getCars();
  
      cars.map(car =>{
        var marker=document.createElement("a-marker");
        marker.setAttribute("id",car.id);
        marker.setAttribute("type","pattern");
        marker.setAttribute("url",car.marker_pattern_url);
        marker.setAttribute("cursor",{
          rayOrigin:"mouse"
        });
  
        marker.setAttribute("markerhandler",{});
        mainScene.appendChild(marker);

        if(!car.is_out_of_stock){
          var model=document.createElement("a-entity");
          model.setAttribute("id",`model-${car.id}`);
          model.setAttribute("position",car.model_geometry.position);
          model.setAttribute("rotation",car.model_geometry.rotation);
          model.setAttribute("scale",car.model_geometry.scale);
          model.setAttribute("gltf-model",`url(${car.model_url})`);
          model.setAttribute("gesture-handler",{});
          model.setAttribute("animation-mixer",{});
          marker.appendChild(model);

          var mainPlane = document.createElement("a-plane");
          mainPlane.setAttribute("id", `main-plane-${car.id}`);
          mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
          mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
          mainPlane.setAttribute("material",{

            color:"#ffd880"
          });
          mainPlane.setAttribute("width", 2.3);
          mainPlane.setAttribute("height", 2.5);
          marker.appendChild(mainPlane);
  
        // Dish title background plane
          var titlePlane = document.createElement("a-plane");
          titlePlane.setAttribute("id", `title-plane-${car.id}`);
          titlePlane.setAttribute("position", { x: 0, y: 1.1, z: 0.1 });
          titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          titlePlane.setAttribute("width", 2.31);
          titlePlane.setAttribute("height", 0.4);
          titlePlane.setAttribute("material", { color: "#f14668" });
          mainPlane.appendChild(titlePlane);
  
        // Dish title
          var carTitle = document.createElement("a-entity");
          carTitle.setAttribute("id", `toy-title-${car.id}`);
          carTitle.setAttribute("position", { x: 1.3, y: 0, z: 0.1 });
          carTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          carTitle.setAttribute("text", {

            font: "aileronsemibold",
            color: "#290149",
            width: 4.5,
            height: 3,
            align: "left",
            value: car.car_name.toUpperCase()

  
          
  
        
          
          });
          titlePlane.appendChild(carTitle);
  
        // Ingredients List
          var description = document.createElement("a-entity");
          description.setAttribute("id", `description-${car.id}`);
          description.setAttribute("position", { x: 0.04, y: 0, z: 0.1 });
          description.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          description.setAttribute("text", {

            font: "dejavu",
            color: "#6b011f",
            width: 2,
            height:5,
            letterSpacing:2,
            lineHeight:50,
            align: "left",
            value: `${car.description}`
  
          
        
          });
          mainPlane.appendChild(description);

          var price = document.createElement("a-entity");
          price.setAttribute("id", `price-${car.id}`);
          price.setAttribute("position", { x: -0.65, y: 0.75, z: 0.1 });
          price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          price.setAttribute("text", {

            font: "aileronsemibold",
            color: "#290149",
            width: 5,
            align: "center",
            value: `$${car.price}`
          
          });

          mainPlane.appendChild(price);

          var ratingPlane = document.createElement("a-entity");
          ratingPlane.setAttribute("id", `rating-plane-${car.id}`);
          ratingPlane.setAttribute("position", { x: 2, y: 0, z: 0.5 });
          ratingPlane.setAttribute("geometry", {
            primitive: "plane",
            width: 1.5,
            height: 0.3
          
          });

          ratingPlane.setAttribute("material", { color: "#F0C30F"});
          ratingPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
          ratingPlane.setAttribute("visible", false);

        // Ratings
          var rating = document.createElement("a-entity");
          rating.setAttribute("id", `rating-${car.id}`);
          rating.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
          rating.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          rating.setAttribute("text", {
            font: "mozillavr",
            color: "black",
            width: 2.4,
            align: "center",
            value: `Customer Rating: ${car.last_rating}`
          
          });

          ratingPlane.appendChild(rating);
          marker.appendChild(ratingPlane);

        // Dish review plane
          var reviewPlane = document.createElement("a-entity");
          reviewPlane.setAttribute("id", `review-plane-${car.id}`);
          reviewPlane.setAttribute("position", { x: 2, y: 0, z: 0 });
          reviewPlane.setAttribute("geometry", {
            primitive: "plane",
            width: 1.5,
            height: 0.5
          
          });

          reviewPlane.setAttribute("material", { color: "#F0C30F"});
          reviewPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
          reviewPlane.setAttribute("visible", false);

        // Dish review
          var review = document.createElement("a-entity");
          review.setAttribute("id", `review-${car.id}`);
          review.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
          review.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          review.setAttribute("text", {
            font: "mozillavr",
            color: "black",
            width: 2.4,
            align: "center",
            value: `Customer Review: \n${car.last_review}`
          
          });
        
          reviewPlane.appendChild(review);
          marker.appendChild(reviewPlane);

        }
  
        
  
        
  
        
        
      });
  
      
  
      
      
    },
  
    getCars: async function(){
  
      return await firebase.firestore().collection("cars").get().then(snap=>{
        return snap.docs.map(doc=>doc.data());
      });
  
    }
  
  
    
    
    
  });