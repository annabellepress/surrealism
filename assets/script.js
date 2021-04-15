var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7nJrEbX6qplCp0'}).base('appH2UbpP4cqjmPcb');
    
    console.log(Airtable);

base("paintings").select({
    view: "Grid view"
}).eachPage(gotPageOfPaintings, gotAllPaintings);

// an empty array to hold our data
let collection = [];

// callback function that recieves our data
function gotPageOfPaintings(records, fetchNextPage) {
    console.log("gotPageOfPaintings()");
    collection.push(...records);
    fetchNextPage();
}

function fetchNextPage() {
    console.log("gotExtraData()");
    collection.push(...records);
}

// callback function that is called when all pages are loaded 
function gotAllPaintings(err) {
    console.log("gotAllPaintings()");

        //report an error, you'd want to do soemthing better than this is production
        if (err) {
            console.log("error loading data");
            console.error(err);
            return;
        }

        // call functions to log and show the books
        consoleLogPaintings();
        showPaintings();
}

// just loop through the data and console.log them
function consoleLogPaintings() {
    console.log("consoleLogPaintings()");
    //this is your empty array from earlier
    collection.forEach((painting) => {
        console.log("Painting:", painting);
    });
}

// look through our airtable data, create elements 
function showPaintings() {
    console.log("showPaintings()");
    console.log(collection.length);
    

    collection.forEach((painting => {
        let container = document.createElement("div");
        container.classList.add("painting")

        //display the written sources
        var writingTitle = document.createElement("a");
        writingTitle.classList.add("link");
        writingTitle.innerText = painting.fields.title
        writingTitle.href = painting.fields.image[0].url
        writingTitle.setAttribute('target', '_blank')
        writingTitle.style.display = "none";
        container.append(writingTitle)

        // display the painting name
        var paintingTitle = document.createElement("span");
        paintingTitle.style.display = "none";
        paintingTitle.innerText = painting.fields.title
        container.append(paintingTitle)

        // display the painting image
        var paintingImg = document.createElement("img");
        paintingImg.classList.add("paintingImg");
        paintingImg.src = painting.fields.image[0].url
        paintingImg.style.display = "none";
        container.append(paintingImg)

       // define the artist name 
       var artistName = painting.fields.artist;
        // replace spaces with underscores and add as a class to the container
        var artistClass = artistName.replaceAll(" ", "_");
        container.classList.add(artistClass);

        //filter by title image and written resources 
        var showInitial = document.querySelector("#theme");
        var showGlossary = document.querySelector("#glossary");
        var showGallery = document.querySelector("#gallery");
        var showResources = document.querySelector("#resources");
        var overview = document.querySelector("#overview")

        showGlossary.addEventListener("click", function() {
            paintingTitle.style.display = "block";
            writingTitle.style.display = "none";
            paintingImg.style.display = "none";
            overview.style.display = "none";
        })

         //in the glossary, click on the title to view the painting
        paintingTitle.addEventListener("click", function() {
            if (paintingImg.style.display === "none") {
                paintingImg.style.display = "block";
            } else {
                paintingImg.style.display = "none";
            }
            
        })

        showResources.addEventListener("click", function() {
            if (container.classList.contains("author")) {
                writingTitle.style.display = "block";
                writingTitle.style.fontFamily = "roc-grotesk, sans-serif";
                writingTitle.style.fontWeight = 400;
                paintingImg.style.display = "none";
                paintingTitle.style.display = "none";
                overview.style.display = "none";
            } else {
                paintingImg.style.display = "none";
                paintingTitle.style.display = "none";
                overview.style.display = "none";
            }
        })

        showGallery.addEventListener("click", function() {
            paintingImg.style.display = "block";
            writingTitle.style.display = "none";
            paintingTitle.style.display = "none";
            overview.style.display = "none";
        })

        //in the gallery, click on the painting image to reveal the title
         paintingImg.addEventListener("click", function() {
            if (paintingTitle.style.display === "none") {
                paintingTitle.style.display = "block";
            } else {
                paintingTitle.style.display = "none";
            }
            
        })

        showInitial.addEventListener("click", function() {
            overview.style.display = "block";
            writingTitle.style.display = "none";
            paintingTitle.style.display = "none";
            paintingImg.style.display = "none";
        })

        document.querySelector(".container").append(container)
    }));
}
