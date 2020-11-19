import modalAdditionalInformation from './modalInfo.js';//it vannak az extra informaciok, amik egy felugro modal-on jelennek meg, ha a 'show additional...' checkbox be van kapcsolva, es olyan dropdown menu fole visszuk az egeret, amelyik korul egy vilagito 'aura' jelenik meg

///////GLOBALIS VALTOZOK////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fo panelek (lathatoak)
const allPanels=document.querySelector('#allPanels');
const whereTheActionHappens = allPanels.querySelector("#whereTheActionHappens");//ez a nagy panel, a bemutato helyszine
const parentSettingsPanel = allPanels.querySelector("#parentSettingsPanel");//itt lehet megadni az osszes beallitasat a SZULO kontenernek
const itemSettingsPanel = allPanels.querySelector("#itemsettingsPanel");//itt lehet megadni az egyeni beallitasokat egyesevel a bemtatohoz hasznalt barmelyik szines doboznak
const numberOfItemsPanel = document.querySelector("#numberOfItemsPanel");//itt lehet megadni, hogy mennyi darab elemmel kiserletezzunk
//'number of items' panel tartalma
const plusMinusLabel = allPanels.querySelector("#plusMinusLabel");//number of items- ez a szam mutatja,hany darabbol alljon a szines dobozok listaja
//const btnMinus = allPanels.querySelector("#btnMinus");//ezzel a gombbal lehet csokkenteni az action elemek szamak (szines, betuvel jelzett dobozok a fo panelen)
//const btnPlus = allPanels.querySelector("#btnPlus");//ezzel a gombbal lehet novelni az action elemek szamat
//help panel tartalma
const axisCheckBox = allPanels.querySelector("#axisCheckBox");//kapcsolo, hogy egy felugro panelen ki legyen irva, hogy a main/cross tengelyek eppen hogy helyezkednek el a flex-direction belallitastol fuggoen
const helpCheckBox=allPanels.querySelector('#helpCheckBox');
//'parentSettingsPanel' panel tartalma
const flexDirection = parentSettingsPanel.querySelector("#flexDirection"); //flex-direction opciok legordulo menuje
const flexWrap = parentSettingsPanel.querySelector("#flexWrap"); //flex-wrap opciok legordulo menuje
const justifyContent = parentSettingsPanel.querySelector("#justifyContent"); //justify-content opciok legordulo menuje
const alignItems = parentSettingsPanel.querySelector("#alignItems"); //align-items opciok legordulo menuje
const alignContent = parentSettingsPanel.querySelector("#alignContent");//align-content opciok legordulo menuje
const btnParentDefaultReset=parentSettingsPanel.querySelector('#btnParentDefaultReset');//Gomb: parent elem osszes alapbeallitasanak visszaallitasara
//'itemsettingsPanel' panel tartalma - egyes elemek egyeni beallitasai 
const order=itemSettingsPanel.querySelector('#order');//visual order 
const alignSelf=itemSettingsPanel.querySelector("#alignSelf");
const flexGrow=itemSettingsPanel.querySelector("#flexGrow");
const flexShrink=itemSettingsPanel.querySelector("#flexShrink");
const flexBasis=itemSettingsPanel.querySelector("#flexBasis");//ehhez hasrautesszeruen adtam meg ertekeket kulonbozo mertkegysegekben
const btnAllItemsDefaultReset=itemSettingsPanel.querySelector('#btnAllItemsDefaultReset');//ez nem csak az epp aktualisan kivalasztott elemnel, hanem az osszes tobbi elemnel is visszaallitja az alapertekeket! 
const hiddenItemSettingsColumns = itemSettingsPanel.querySelectorAll(".hiddenColumn");//az osszes lathatalan beallitas megkersese (Item Settings Panelen; ezek ket oszlopba vannak rendezve, ezert van querySelectorAll)
const referenceLetter=itemSettingsPanel.querySelector('#referenceLetter');//ez a div jeleniti meg azt a betut, ami a rakattintott actionBox-on is latszik (a konnyebb azonosithatosag vegett, hogy tudjuk, melyik elemet allitjuk be eppen)
const additionalInfoProvided=[flexDirection,flexWrap,justifyContent,alignItems,alignContent,order,alignSelf,flexGrow,flexShrink,flexBasis];//glowing border effect letrehozasa ezeknel az elemeknel, ha az 'additional info' checkbox be van kapcsolva
//kitakaro panel (alapbol lathatalan);(ezen van rajta mindket tengely felirat)
const overlapPanel=document.querySelector('#overlapPanel');//ennek az a funkcioja, hogy tartalmazza a tengely irnyat jelolo szovegeket a Main es Cross Axis -hoz
const horizontalText = document.querySelector("#horizontalText");//main v. cross Axis kozul az kerul ide, amelyiket a flex-directionnal beallitunk. A valtozo egy felugro panelre irja ki a szoveget
const verticalText = document.querySelector("#verticalText");//main v. cross Axis kozul az kerul ide, amelyiket a flex-directionnal beallitunk. A valtozo egy felugro panelre irja ki a szoveget
const hintAxisInfo=document.querySelector('#hintAxisInfo');//tipp, hogy mikepp kell megvaltoztatni a tengelyek iranyat
//'pop up modal' (alapbol lathatalan)
const popupModal=document.querySelector('#popupModal');//ezen jelenik meg a tovabbi info azokrol a beallitasokrol, ami korul vilagito border jelenik meg, ha a addl info checkbox be van kapcsolva
const btnClosePopupModal=popupModal.querySelector('#btnClosePopupModal');//modal bezarasa gomb


///////NUMBER OF ITEMS PANEL BEALLITASAI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*a + es - gombokkal lehet megadni, hogy hany szines doboz jojjon letre a Flexbox beallitasokkal valo kiserletezeshez. 
Alapbol 5 van. Az ujabb es ujabb letrehozott elemek az ABC betuit veszik fel megjeleniteni, ha azok elfogytak, akkor
a szamok 0-9 kozott, majd a kulonleges karakterek. Ha azok is elfogytak, akkor szoveg nelkuli kontenereket hoz letre. 
Mivel nincs szelesseg/magassag/tartalom bennuk, ezert onnantol mar csak egy fekete csik latszik beloluk. Erdemes megfontolnom,
hogy inkabb max erteket allitsak be, hogy max hany elemet lehessen letrehozni. Egyelore max korlatozas nincs. Minimum ertek 0.*/

numberOfItemsPanel.addEventListener("click", (e) => {//gomb kattintasra modosul a kijelzon az elemek szama
if (e.target.className === "btn") {

if (e.target.id === "btnPlus") {
plusMinusLabel.innerText = parseInt(plusMinusLabel.innerText) + 1;
}
if (e.target.id === "btnMinus" && parseInt(plusMinusLabel.innerText) > 0) {
plusMinusLabel.innerText = parseInt(plusMinusLabel.innerText) - 1;
spinNumber();
}
//hozzaad v elvesz elemeket a #whereTheActionHappens panelen
if (whereTheActionHappens.children.length > plusMinusLabel.innerText) {//ha tobb elem van, mint ami a kijelzon be lett allitva...
for (
let i = whereTheActionHappens.children.length - 1;
i >= parseInt(plusMinusLabel.innerText);
) {
whereTheActionHappens.removeChild(whereTheActionHappens.children[i]);//...akkor tavoltsd el az utolso elemet
}
}
if (whereTheActionHappens.children.length < plusMinusLabel.innerText) {//ha kevesebb elem van a panelen, akkor adj hozza egyet
const ABCletters = "ABCDEFGHIJKLMNOPQRSTUVXYWZ0123456789!@#$%&*()-+=<>/?|abcdefghijklmnopqrstuvxywz";//ezekbol a jelekbol lesz kivalasztva a sorrenben kovetkezo betu, ami rakerul az uj dobozra
let newItem = document.createElement("div");//uj elem letrehozasa
newItem.innerText = ABCletters.charAt(whereTheActionHappens.children.length);//itt van kivalasztva az a betu, ami sorrendben kovetkezik, es rogton hozza is van adva az actionBox-hoz
newItem.classList.add("actionBox");//itt van megformazva olyan szines dobozza, mint az osszes tobbi 
whereTheActionHappens.appendChild(newItem);//a panelhez itt van hozzaadva az uj, felcicomazott, cimkevel ellatott elem
}
} 
});


//////HELP PANEL BEALLITASAI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//'SHOW AXIS' CHECKBOX
/*ha be van kapcsolva, akkor a flex-direction beallitasnak megfeleloen egy felugro panelen kiirja a MAIN AXIS
es a CROSS AXIS iranyat; Tovabba figyeli (csak ha be van kapcsolva), hogy megvaltozik-e a flex-direction beallitasa,
ugyanis attol a beallitastol fugg, hogy melyik iranyu a Main es a Cross Axis. Ha a bellitas erteke row , akkor a Main a vizszintes. 
Ha column ertek van beallitva, akkor a Main a fuggoleges, es a Cross a vizszintes.
Ha ki van kapcsolva a checkbox, akkor az esemenyfigyelo is vissza van vonva*/

function determiningAxisDirections() {//ez a FN allapitja meg, hogy a flex-dierction beallitastol fuggoen melyik iranyu a Main es a Cross Axis
if (flexDirection.value === "row" || flexDirection.value === "row-reverse") {
horizontalText.innerText = "MAIN AXIS";
verticalText.innerText = "CROSS AXIS";
}
if (
flexDirection.value === "column" || flexDirection.value === "column-reverse") {
horizontalText.innerText = "CROSS AXIS";
verticalText.innerText = "MAIN AXIS";
}}

//esemenyfigyelo a checkbox-ra
axisCheckBox.addEventListener('change',()=>{

if(axisCheckBox.checked){//ha be lett kapcsolva
  overlapPanel.style.zIndex = "2";//ugorjon a 'whereTheActionHappens' panel fele az overlap panel 
  determiningAxisDirections();//fusson le annak megallapitasa, hogy melyek az axis iranyok
  horizontalText.style.visibility = "visible"; //overlap panelen a szoveg lathatosagok beallitasa
  verticalText.style.visibility = "visible";
  hintAxisInfo.style.visibility = "visible";
  flexDirection.addEventListener('change',()=>{//tovabba legyen egy esemenyfigyelo a flex-direction beallitason, es ha az megvaltozna, akkor... 
  determiningAxisDirections();//...akkor is fusson le a program, hogy melyek az axis iranyok
  });
}
else{//ha a checkbox ki van kapcsolva, alljon minden vissza eredeti allapotba, a flexdirection esemenyfigyelo is legyen leszedve
overlapPanel.style.zIndex = "0";
horizontalText.style.visibility = "hidden";
verticalText.style.visibility = "hidden";
hintAxisInfo.style.visibility = "hidden";
flexDirection.removeEventListener('change',()=>{
determiningAxisDirections();
});
}
});

//HELP >>> ADDITIONAL INFO CHECKBOX + POP UP MODAL
helpCheckBox.addEventListener('change',()=>{
additionalInfoProvided.forEach(option => {//additionalInfoProvided=azok a flexbox beallitasi lehetosegek, amelyekhez tovabbi informacio kerheto
option.classList.toggle('glowingBorderEffect');//minden elem korul, amihez lehet tovabbi informaciot kerni (pop-up modal ugrik fel), jelenjen meg egy jol lathato border
});
});

//ha a modal bezaro gombot megnyomjuk, az overlap panel keruljon a 'where the action happens' panel moge
btnClosePopupModal.addEventListener('click',()=>{
overlapPanel.style.zIndex = "0";
popupModal.style.zIndex="-1";
popupModal.style.visibility='hidden';//olyan, mintha duplan biztositanam be magam, hogy ne legyen lathato. Azonban a Z-index beallitasa kelleni fog egy kicsivel lentebb, hogy az overlap panel fole keruljon. Ha siman csak a z-index-el tuntetnem el, akkor a reszponziv meretezeskor neha elocsuszna a where the action happens panel mogul
});

function showAdditionalInfoModal(flexProperty, flexPropertyDescription, flexPropertyValue,flexPropertyValueDescription){
//overlap panel lesz a hatter, fele kerul a modal
overlapPanel.style.zIndex = "2";
popupModal.style.zIndex="3";
popupModal.style.visibility='visible';
//modal elemeinek megkeresese
let propertyName=popupModal.querySelector('#propertyName');
let propertyDescription=popupModal.querySelector('#propertyDescription');
let valueName=popupModal.querySelector('#valueName');
let valueDescription=popupModal.querySelector('#valueDescription');
//az eppen aktualis beallitasokbol olvassa be a beallitasi lehetoseg tipusat, es annak a tipusnak az aktualis erteket (pl tipus:flex-direction; erteke:column-reverse)
propertyName.innerText=flexProperty;
propertyDescription.innerText=flexPropertyDescription;
valueName.innerText=flexPropertyValue;
valueDescription.innerText=flexPropertyValueDescription;
}

const parentAndItemSettings=[parentSettingsPanel,itemSettingsPanel];
parentAndItemSettings.forEach(panel => {
  panel.addEventListener("click", (event)=>{
    if(event.target.classList.contains('glowingBorderEffect')){
    let input1=event.target.name;
    let input2=modalAdditionalInformation[event.target.id].propertyDescription;
    let input3;
    let input4;
    if(event.target.id==='order' || event.target.id==='flexGrow'|| event.target.id==='flexShrink' || event.target.id==='flexBasis'){
    input3='additional info';
    input4=modalAdditionalInformation[event.target.id].values.addl;
    }else{
    input3=event.target.value;
    input4=modalAdditionalInformation[event.target.id].values[event.target.value]
    }
    showAdditionalInfoModal(input1,input2,input3,input4)
    
    }
    })
});
;

///////'PARENT DIV' PANEL BEALLITASOK DROPDOWN MENU ALAPJAN//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*ha a PARENT DIV SETTINGS panelen a legordulo menuk barmelyike is megvaltozik (a felhasznalo kivalaszt egy erteket),
akkor az osszes eppen aktulis flexbox opcio alapjan legyen beallitva a nagy panel (whereTheActionHappens) szines elemei mindegyike*/
//ugy lett letrehozva a kod, hogy nem csak azt az egy valtozast nezi, hanem ha barmilyen valtozas van, akkor az osszes tobbi beallitastis ujra beallitja  
function setParentDivToUserSelectedStyle(){ //ez a fn egy esemenyfigyelonel es a re-set gombnal is meg van hivva
whereTheActionHappens.style.flexDirection = `${flexDirection.value}`; 
whereTheActionHappens.style.flexWrap = `${flexWrap.value}`;
whereTheActionHappens.style.justifyContent = `${justifyContent.value}`;
whereTheActionHappens.style.alignItems = `${alignItems.value}`;
whereTheActionHappens.style.alignContent = `${alignContent.value}`;
}
parentSettingsPanel.addEventListener("change", () => {//ez az esemenyfigyelo nezi, hogy van-e barmilyen valtozas az adott panelen, es ha van, az osszes aktualis beallitast alkalmazza az actionBox-ok mindegyikere
setParentDivToUserSelectedStyle()
});

//BUTTON RESET
btnParentDefaultReset.addEventListener('click',()=>{
flexDirection.value = "row";
flexWrap.value='nowrap';
justifyContent.value='flex-start';
alignItems.value='stretch';
alignContent.value='stretch';
setParentDivToUserSelectedStyle();//azert van itt meghivva, hogy az alapbeallitasokkal fusson le, es ezeket az alapbeallitasokat alakalmazza az actionBox-okra
});

///////'ITEM SETTINGS' PANEL BELLITASAI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
ujabb beallitasi lehetosegek is lathatak lesznek, mihelyst az egyik szines elemre (actionBox) rakattintunk a bal odlali nagy panelen. 
Ekkor kiirja a szines doboz nevet (a rajta levo betut), es az actionBox-hoz tartozo egyedi beallitasi opciok jelennek meg. 
Az egyes dobozokhoz tartozo aktualsi beallitasokat a window.getComputedStyle().getPropertyValue() olvassa be.
Ha egy masik szines dobozra kattintunk, akkor annak a neve es annak a beallitasai jelennek meg, es a tovabbiakban azokat lehet modositani.
Figyelem: a re-set gomb az OSSZES elem alapbeallitasat allitja vissza, nem csupan az eppen aktualisan kivalasztott elemet; Amennyiben csak azt az elemet akarjuk modositani, 
arra ott van a panelen az osszes beallitasi lehetoseg
*/

whereTheActionHappens.addEventListener("click", (e) => {
let clickedActionBox = e.target;//amire klikkeltunk
if (clickedActionBox.className === "actionBox") {//ellenorzes, hogy amire klikkeltunk, az szines doboz-e (actionBox)
let backgroundColorToCopy = window.getComputedStyle(clickedActionBox, null).getPropertyValue("background-color");//mi a hatterszine annak a szines doboznak, amire klikkeltunk
//itemSettingsPanel.style.backgroundColor = backgroundColorToCopy;//a panel hatterszine egyezzen meg azzal a dobozeval, amire rakatintottunk
hiddenItemSettingsColumns.forEach(hiddenColumn=>hiddenColumn.style.visibility = "visible");//az elrejtett beallitasok jelenjenek meg)
//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett//a dobozon talalhato betut masold be a konnyebb azonositas vegett
referenceLetter.innerText=clickedActionBox.innerText;//a dobozon talalhato betut masold be a konnyebb azonositas vegett
referenceLetter.style.backgroundColor=backgroundColorToCopy;//ne csak a betu, hanem a betu mogotti hatterszin is utaljon arra, hogy melyik actionBox-ra kattintottunk
referenceLetter.style.visibility = 'visible';
//a raklikkelt dobozrol (actionBox) beolvasni az osszes egyeni beallitasat es ezeket megjeleniteni az 'Item Settings 'panelen mint kiindulo ertekek
order.value=window.getComputedStyle(clickedActionBox).getPropertyValue("order");
alignSelf.value=window.getComputedStyle(clickedActionBox).getPropertyValue("align-self");
flexGrow.value=window.getComputedStyle(clickedActionBox).getPropertyValue("flex-grow");
flexShrink.value=window.getComputedStyle(clickedActionBox).getPropertyValue("flex-shrink");
flexBasis.value=window.getComputedStyle(clickedActionBox).getPropertyValue("flex-basis");

}
});
/*ha megvaltoznak a beallitasok az Item Settings panelen,
akkor az uj beallitasd alkalmazd arra az actionBox-ra (szines doboz a jobb oldalon), amelyik az aktiv doboz*/
itemSettingsPanel.addEventListener("change", (event) => {
if (event.target.id === "order") {//ha a visual order beallitasa valtozik meg
for (const el of whereTheActionHappens.children) {
if (el.innerText === referenceLetter.innerText) {
el.style.order = event.target.value;
};
};
};

if (event.target.id === "alignSelf") {//ha az align self beallitasa valtozik meg
for (const el of whereTheActionHappens.children) {
if (el.innerText === referenceLetter.innerText) {
el.style.alignSelf = event.target.value;
};
};
};

if(event.target.id==='flexGrow'){//ha a flex grow beallitasa valozik meg
for (const el of whereTheActionHappens.children) {
if (el.innerText === referenceLetter.innerText) {
el.style.flexGrow = event.target.value;
};
};
};

if(event.target.id==='flexShrink'){//ha a flex shrink beallitasa valozik meg
for (const el of whereTheActionHappens.children) {
if (el.innerText === referenceLetter.innerText) {
el.style.flexShrink = event.target.value;
};
};
};
if(event.target.id==='flexBasis'){//ha a flex basis beallitasa valozik meg
for (const el of whereTheActionHappens.children) {
if (el.innerText === referenceLetter.innerText) {
el.style.flexBasis = event.target.value;
};
};
};
});

//BUTTON: ALL ITEMS DEFAULT VALUES RE-SET (minden szines dobozra ervenyes visszaallitas)
btnAllItemsDefaultReset.addEventListener('click',()=>{
const allVisibleActionBoxes=document.querySelectorAll('.actionBox');
allVisibleActionBoxes.forEach(item=>{
item.style.order=1;
item.style.alignSelf='auto';
item.style.flexGrow=0;
item.style.flexShrink=1;
item.style.flexBasis='auto';
});
referenceLetter.innerText='';//a hivatkozaskent kezelt betu torlodjon ki
referenceLetter.style.backgroundColor='transparent';
referenceLetter.style.visibility = 'hidden';
hiddenItemSettingsColumns.forEach(hiddenColumn=>hiddenColumn.style.visibility = "hidden");//a 2 oszlop, es benne az egyeni beallitasok tunjenek el
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function reportWindowSize() {
  console.log(window.innerWidth)
}

window.onresize = reportWindowSize;