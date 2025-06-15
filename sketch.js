let departureDate = '';
let returnDate = '';
let peopleCount = 1;
let destination = '';
let activeField = null;
let showCalendar = false;
let calendarType = '';
let currentYear = 2025;
let currentMonth = 6; // Czerwiec (0-11)



function setup() {
  createCanvas(800, 600);
  textAlign(LEFT, TOP);
}

function draw() {
  background('#003580');
  
  // Pasek górny
  fill('#FFD700');
  noStroke();
  rect(0, 0, width, 60);
  
  // Logo Ryanair
  fill('#003580');
  ellipse(60, 30, 40, 40);
  fill('#FFD700');
  triangle(55, 20, 65, 20, 60, 40);
  
  // Nazwa Ryanair
  fill('#003580');
  textSize(32);
  textStyle(BOLD);
  text('RYANAIR', 110, 16);
  
  // Nagłówek
  fill(255);
  textSize(28);
  textStyle(NORMAL);
  text('Tanie loty po Europie', 40, 100);
  
  // Formularz
  drawForm();
  
  // Kalendarz (jeśli aktywny)
  if (showCalendar) {
    drawCalendar();
  }
  
  // Przycisk wyszukiwania
  fill('#FFD700');
  rect(40, 480, 200, 50, 10);
  fill('#003580');
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Szukaj lotów', 140, 505);
  textAlign(LEFT, TOP);
  
  // Dodatkowe elementy
  fill(255);
  textSize(16);
  text('Ponad 200 kierunków w 34 krajach!', 40, 150);
}

function drawForm() {
  // Tła pól
  fill(255);
  stroke(200);
  strokeWeight(1);
  
  // Data wylotu
  rect(40, 210, 180, 35);
  rect(250, 210, 180, 35);
  rect(40, 350, 180, 35);
  rect(40, 400, 300, 35);
  
  // Etykiety
  fill(255);
  noStroke();
  textSize(14);
  text('Data wylotu:', 40, 190);
  text('Data powrotu:', 250, 190);
  text('Liczba osób:', 40, 335);
  text('Dokąd lecisz:', 40, 385);
  
  // Wartości w polach
  fill(0);
  textSize(16);
  text(departureDate || 'Kliknij aby wybrać', 45, 220);
  text(returnDate || 'Kliknij aby wybrać', 255, 220);
  text(peopleCount.toString(), 45, 365);
  text(destination || 'Wpisz destynację', 45, 415);
  
  // Podświetlenie aktywnego pola
  if (activeField) {
    noFill();
    stroke('#FFD700');
    strokeWeight(3);
    let y = getFieldY(activeField);
    rect(40, y, activeField === 'destination' ? 300 : 180, 35);
  }
  
  // Przyciski +/- dla liczby osób
  fill('#FFD700');
  noStroke();
  rect(230, 350, 30, 35);
  rect(270, 350, 30, 35);
  fill('#003580');
  textAlign(CENTER, CENTER);
  textSize(20);
  text('-', 245, 367);
  text('+', 285, 367);
  textAlign(LEFT, TOP);
}

function drawCalendar() {
  // Tło kalendarza
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(350, 200, 300, 250);
  
  // Nagłówek kalendarza
  fill('#003580');
  noStroke();
  rect(350, 200, 300, 40);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(getMonthName(currentMonth) + ' ' + currentYear, 500, 220);
  
  // Przyciski nawigacji
  fill('#FFD700');
  rect(360, 210, 20, 20);
  rect(620, 210, 20, 20);
  fill('#003580');
  textSize(12);
  text('<', 370, 220);
  text('>', 630, 220);
  
  // Dni tygodnia
  fill(0);
  textSize(12);
  let days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
  for (let i = 0; i < 7; i++) {
    text(days[i], 365 + i * 40, 255);
  }
  
  // Dni miesiąca
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1; // Poniedziałek = 0
  
  for (let day = 1; day <= daysInMonth; day++) {
    let x = 365 + ((firstDay + day - 1) % 7) * 40;
    let y = 275 + Math.floor((firstDay + day - 1) / 7) * 25;
    
    fill(0);
    text(day, x, y);
  }
  
  textAlign(LEFT, TOP);
}

function getFieldY(field) {
  switch(field) {
    case 'departure': return 250;
    case 'return': return 300;
    case 'people': return 350;
    case 'destination': return 400;
    default: return 0;
  }
}

function getMonthName(month) {
  let months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
                'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  return months[month];
}

function mousePressed() {
  // Przycisk wyszukiwania
  if (mouseX > 40 && mouseX < 240 && mouseY > 480 && mouseY < 530) {
    let msg = `Szukasz lotu do: ${destination || 'nie wybrano'}\n` +
      `Wylot: ${departureDate || 'nie wybrano'}\n` +
      `Powrót: ${returnDate || 'nie wybrano'}\n` +
      `Liczba osób: ${peopleCount}`;
    alert(msg);
    
    database.ref("danelotow").set({
datawylotu: departureDate,
datapowrotu: returnDate,
liczbaosób: peopleCount,
miejsce: destination
});
    
    
    
    
    return;
  }
  
  // Obsługa kalendarza
  if (showCalendar) {
    // Kliknięcie poza kalendarzem zamyka go
    if (mouseX < 350 || mouseX > 650 || mouseY < 200 || mouseY > 450) {
      showCalendar = false;
      activeField = null;
      return;
    }
    
    // Nawigacja kalendarza
    if (mouseY > 210 && mouseY < 230) {
      if (mouseX > 360 && mouseX < 380) {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
      } else if (mouseX > 620 && mouseX < 640) {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }
    }
    
    // Wybór dnia
    if (mouseY > 275 && mouseY < 425) {
      let dayX = Math.floor((mouseX - 365) / 40);
      let dayY = Math.floor((mouseY - 275) / 25);
      let day = dayY * 7 + dayX + 1;
      
      let firstDay = new Date(currentYear, currentMonth, 1).getDay();
      firstDay = firstDay === 0 ? 6 : firstDay - 1;
      day -= firstDay;
      
      let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      if (day >= 1 && day <= daysInMonth) {
        let selectedDate = `${day.toString().padStart(2, '0')}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`;
        if (calendarType === 'departure') {
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
  if (mouseX > 40 && mouseX < 220) {
    if (mouseY > 250 && mouseY < 285) {
      activeField = 'departure';
      showCalendar = true;
      calendarType = 'departure';
    } else if (mouseY > 300 && mouseY < 335) {
      activeField = 'return';
      showCalendar = true;
      calendarType = 'return';
    } else if (mouseY > 350 && mouseY < 385) {
      activeField = 'people';
    }
  } else if (mouseX > 40 && mouseX < 340 && mouseY > 400 && mouseY < 435) {
    activeField = 'destination';
  }
  
  // Przyciski +/- dla liczby osób
  if (mouseY > 350 && mouseY < 385) {
    if (mouseX > 230 && mouseX < 260 && peopleCount > 1) {
      peopleCount--;
    } else if (mouseX > 270 && mouseX < 300 && peopleCount < 8) {
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
  }
}