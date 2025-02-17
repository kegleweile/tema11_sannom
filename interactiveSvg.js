document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;
  let active;

  // Hent JSON
  //------------------------------------------------------------------------------------

  let jsondata = await fetch("interactiveSvg.json");
  let objekter = await jsondata.json();
  console.log(objekter);

  // 1. Load svg map
  //------------------------------------------------------------------------------------

  let mySvg = await fetch("dk_kort.svg");
  let svg = await mySvg.text();

  document.querySelector("#map").innerHTML = svg;

  // 3. Skift farve ved klik, og vis tekst
  //-----------------------------------------------------------------------

  document
    .querySelector("#map #points")
    .addEventListener("click", function (evt) {
      clicked(evt);
    });

  //function clicked
  //--------------------------------------------------------------------

  function clicked(obj) {
    document.querySelector("#info ").style.visibility = "visible";
    objekter.forEach((objekt) => {
      // a. find det klikkede element
      //----------------------------------------------

      selected = obj.target;

      // b. find det klikkede elementets ID
      //---------------------------------------------

      selectedID = selected.getAttribute("id");

      // c. find  det klikkede elements fillfarve
      //---------------------------------------------

      color = selected.getAttribute("fill");

      // d. vis infobokse
      //--------------------------------------------

      if (selectedID == objekt.sted) {
        document.querySelector("#info h3").textContent = objekt.overskrift;
        document.querySelector("#info p.tiny").textContent = objekt.lokation;
        document.querySelector("#info p:not(.tiny)").textContent = objekt.tekst;
        document.querySelector("#info img").src =
          "/billeder/" + objekt.billede + ".webp";
        document.querySelector("#info ").addEventListener("click", function () {
          document.querySelector("#info ").style.visibility = "hidden";
          document
            .querySelector("#" + selectedID)
            .setAttribute("fill", "#ff88d4");
        });
      }
    });

    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------

    if (active != undefined) {
      active.setAttribute("fill", color);
    }

    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------

    active = selected;

    //skift farve på det valgte
    //-------------------------------------------------------------------------

    if (color === "#ff88d4") {
      document.querySelector("#" + selectedID).setAttribute("fill", "#9a0019");
    }

    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
    else {
      document.querySelector("#" + selectedID).setAttribute("fill", "#ff88d4");
    }
  }
}
