let departureDate = '';
let returnDate = '';
let peopleCount = 1;
let destination = '';
let origin = '';
let departure = '';
let activeField = null;
let showCalendar = false;
let calendarType = '';
let currentYear = 2025;
let currentMonth = 6; // Czerwiec (0-11)
let logoImg;
let priceChosen = 0;

function preload() {
  // Load the logo image
  logoImg = loadImage('https://raw.githubusercontent.com/cooqieez/rajansrer/refs/heads/main/logo_w.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
}

function draw() {
  background("#f6f6f6"); // Ryanair niebieski
  
    // Draw yellow bar at the top
  fill(7, 53, 144); // bright yellow
  noStroke();
  rect(0, 0, width, 60);

  
  // Głowny naglowek - hasło Ryanair
fill("#073590");
  textSize(48);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Gdzie chcesz, kiedy chcesz, jak chcesz.', 60, 100);
  
  // Podtytul
 fill("#073590");
  textSize(24);
  textStyle(NORMAL);
  text('My dźwigniemy formalności, Ty konsekwencje!', 60, 170);
  
  // Formularz w ukladzie horyzontalnym
  drawHorizontalForm();
  
  // Kalendarz (jeśli aktywny)
  if (showCalendar) {
    drawCalendar();
  }
  
  // Przycisk "szukaj lotow"
  fill('#FFD100');
  noStroke();
  rect(60, 550, 300, 60, 15);
  fill("#073590");
  textSize(28);
  textAlign(CENTER, CENTER);
  text('Szukaj lotów', 210, 580);
  textAlign(LEFT, TOP);
  
  if (logoImg) {
  imageMode(CORNER);
  let barHeight = 60;
  let padding = 20;
  let logoHeight = barHeight - (padding * 2);
  let logoWidth = logoImg.width * (logoHeight / logoImg.height);
  // Zmieniamy pozycję x na padding, a y na padding
  image(logoImg, padding, padding, logoWidth, logoHeight);
}
  
}


function drawHorizontalForm() {
  // Pierwszy rząd - daty
  fill(220); // Szary kolor
  noStroke();
  
  // Data wylotu
  rect(60, 250, 300, 50, 15);
  // Data powrotu
  rect(380, 250, 300, 50, 15);
  
  // Drugi rząd - liczba osób, destynacja i origin
  rect(60, 430, 300, 50, 15);
  rect(380, 340, 300, 50, 15);
  rect(60, 340, 300, 50, 15);
  
  // Etykiety
  fill(255);
  fill("#073590")
  textSize(16);
  text('Data wylotu:', 60, 230);
  text('Data powrotu:', 380, 230);
  text('Liczba osób:', 60, 410);
  text('Dokąd lecisz:', 380, 320);
  text('Skąd lecisz:', 60, 320);
  
  // Wartości w polach
  fill(80); // Ciemny tekst na szarym tle
  textSize(18);
  text(departureDate || 'Kliknij aby wybrać', 75, 266);
  text(returnDate || 'Kliknij aby wybrać', 395, 266);
  text(peopleCount.toString(), 75, 446);
  text(destination || 'Wpisz miejsce przylotu', 395, 356);
  text(origin || 'Wpisz miejsce wylotu', 75, 356);
  
  // Podświetlenie aktywnego pola - żółte obramowanie
  if (activeField) {
    noFill();
    stroke('#FFD100');
    strokeWeight(4);
    let coords = getFieldCoords(activeField);
    rect(coords.x, coords.y, coords.w, coords.h, 15);
  }
  
  // Przyciski +/- dla liczby osób - żółte z zaokrąglonymi rogami
  fill('#FFD100');
  noStroke();
  rect(280, 440, 30, 30, 8);
  rect(320, 440, 30, 30, 8);
  fill("#073590");
  textAlign(CENTER, CENTER);
  textSize(24);
  text('-', 295, 455);
  text('+', 335, 455);
  textAlign(LEFT, TOP);
}









function drawCalendar() {
  // Tło kalendarza z zaokrąglonymi rogami
  fill(255);
  stroke("#073590");
  strokeWeight(2);
  rect(700, 250, 300, 250, 15);
  
  // Nagłówek kalendarza - niebieski Ryanair
  fill("#073590");
  noStroke();
  rect(700, 250, 300, 40, 15);
  rect(700, 270, 300, 20); // Prostokąt bez zaokrągleń na dole nagłówka
  
  fill('#FFD100');
  textAlign(CENTER, CENTER);
  textSize(16);
  text(getMonthName(currentMonth) + ' ' + currentYear, 850, 270);
  
  // Przyciski nawigacji - żółte z zaokrąglonymi rogami
  fill('#FFD100');
  noStroke();
  rect(720, 260, 20, 20, 5);
  rect(955, 260, 20, 20, 5);
  fill("#073590");
  textSize(12);
  text('<', 729, 269);
  text('>', 965, 269);
  
  // Dni tygodnia
  fill("#073590");
  textSize(12);
  let days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
  for (let i = 0; i < 7; i++) {
    text(days[i], 730 + i * 40, 320);
  }
  
  // Dni miesiąca
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1; // Poniedziałek = 0
  
  fill("#073590");
  for (let day = 1; day <= daysInMonth; day++) {
    let x = 730 + ((firstDay + day - 1) % 7) * 40;
    let y = 350 + Math.floor((firstDay + day - 1) / 7) * 25;
    
    // Podświetlenie dnia po najechaniu
    if (mouseX > x - 15 && mouseX < x + 15 && mouseY > y - 10 && mouseY < y + 10) {
      fill('#FFD100');
      noStroke();
      ellipse(x, y, 25, 25);
      fill("#073590");
    }
    
    text(day, x, y);
  }
  
  textAlign(LEFT, TOP);
}

function getFieldCoords(field) {
  switch(field) {
    case 'departureDate': return {x: 60, y: 250, w: 300, h: 50};
    case 'return': return {x: 380, y: 250, w: 300, h: 50};
    case 'people': return {x: 60, y: 430, w: 300, h: 50};
    case 'destination': return {x: 380, y: 340, w: 300, h: 50};
    case 'origin' : return {x:60, y: 340, w: 300, h: 50};
    default: return {x: 0, y: 0, w: 0, h: 0};
  }
}

function getMonthName(month) {
  let months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
                'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  return months[month];
}

function mousePressed() {
  // Przycisk wyszukiwania
  if (mouseX > 60 && mouseX < 360 && mouseY > 550 && mouseY < 610) {
    let msg = `Szukasz lotu:\n` +
      `Do: ${destination || 'nie wybrano'}\n` +
      `Z: ${origin || 'nie wybrano'}\n` +
      `Wylot: ${departureDate || 'nie wybrano'}\n` +
      `Powrót: ${returnDate || 'nie wybrano'}\n` +
      `Liczba osób: ${peopleCount}`;
    alert(msg);
    
     database.ref("danelotow").set({
datawylotu: departureDate,
datapowrotu: returnDate,
liczbaosób: peopleCount,
miejsce2: destination,
miejsce1: origin,
cena: priceChosen
});
    
    return;
  }
  
  // Obsługa kalendarza
  if (showCalendar) {
    // Kliknięcie poza kalendarzem zamyka go
    if (mouseX < 700 || mouseX > 1000 || mouseY < 250 || mouseY > 500) {
      showCalendar = false;
      activeField = null;
      return;
    }
    
    // Nawigacja kalendarza
    if (mouseY > 250 && mouseY < 280) {
      if (mouseX > 710 && mouseX < 740) {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
      } else if (mouseX > 950 && mouseX < 980) {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }
    }
    
    // Wybór dnia
    if (mouseY > 330 && mouseY < 720) {
      let dayX = Math.floor((mouseX - 720) / 40);
      let dayY = Math.floor((mouseY - 330) / 25);
      let day = dayY * 7 + dayX + 1;
      
      let firstDay = new Date(currentYear, currentMonth, 1).getDay();
      firstDay = firstDay === 0 ? 6 : firstDay - 1;
      day -= firstDay;
      
      let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      if (day >= 1 && day <= daysInMonth) {
        let selectedDate = `${day.toString().padStart(2, '0')}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`;
        if (calendarType === 'departureDate') {
          departureDate = selectedDate;
        } else if (calendarType === 'return') {
          returnDate = selectedDate;
        }
        showCalendar = false;
        activeField = null;
      }
    }
    return;
  }
  
  // Pola formularza
  if (mouseY > 250 && mouseY < 300) {
    if (mouseX > 60 && mouseX < 360) {
      activeField = 'departureDate';
      showCalendar = true;
      calendarType = 'departureDate';
    } else if (mouseX > 380 && mouseX < 680) {
      activeField = 'return';
      showCalendar = true;
      calendarType = 'return';
    }
  } else if (mouseY > 340 && mouseY < 390) {
    if (mouseX > 60 && mouseX < 360) {
      activeField = 'origin';
    } else if (mouseX > 380 && mouseX < 680) {
      activeField = 'destination';
    }
  } else if (mouseY > 430 && mouseY < 480) {
    if (mouseX > 60 && mouseX < 360) {
      activeField = 'people';
    }
  
    
  }
  
  // Przyciski +/- dla liczby osób
  if (mouseY > 440 && mouseY < 480) {
    if (mouseX > 280 && mouseX < 300 && peopleCount > 1) {
      peopleCount--;
    } else if (mouseX > 320 && mouseX < 350 && peopleCount < 185) {
      peopleCount++;
    }
  }
}

function keyPressed() {
  if (activeField === 'destination') {
    if (keyCode === BACKSPACE) {
      destination = destination.slice(0, -1);
    } else if (key.length === 1) {
      destination += key;
    }
  } else if (activeField === 'origin') {
    if (keyCode === BACKSPACE) {
      origin = origin.slice(0, -1);
    } else if (key.length === 1) {
      origin += key;
    }
  }

  function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

}