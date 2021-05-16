<div class="grid-container">
  <div class="topmiddle">Ohi ylhäältä</div>
  <div class="centermiddle">Osui!</div>
  <div class="bottommiddle">Ohi alhaalta</div>
  <div class="rightmiddle">Ohi oikealta</div>
  <div class="leftmiddle">Ohi vasemmalta</div>
</div>
<style type="text/css" media="screen">
  
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". topmiddle . ."
    "leftmiddle centermiddle rightmiddle ."
    ". bottommiddle . .";
}

.topmiddle { grid-area: topmiddle; }

.centermiddle { grid-area: centermiddle; }

.bottommiddle { grid-area: bottommiddle; }

.rightmiddle { grid-area: rightmiddle; }

.leftmiddle { grid-area: leftmiddle; }
</style>
