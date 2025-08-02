/*--------------------
Vars
--------------------*/
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

function togglePlay() {
  const video = document.getElementById("videoPlayer");
  const playButton = document.getElementById("playButton");

  if (video.style.display === "none") {
    video.style.display = "block"; // Show video
    playButton.style.display = "none"; // Hide button
    video.src += "?autoplay=1"; // Autoplay video
  }
}

/*--------------------
Listeners
--------------------*/
// document.addEventListener('mousewheel', handleWheel)
// document.addEventListener('mousedown', handleMouseDown)
// document.addEventListener('mousemove', handleMouseMove)
// document.addEventListener('mouseup', handleMouseUp)
document.addEventListener("touchstart", handleMouseDown);
// document.addEventListener('touchmove', handleMouseMove)
document.addEventListener("touchend", handleMouseUp);

function triggerSparkle(carouselBox) {
  const container = carouselBox.querySelector(".sparkle-container");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.top = Math.random() * 80 + "%";
    sparkle.style.left = Math.random() * 80 + "%";
    container.appendChild(sparkle);
  }
  setTimeout(() => {
    container.innerHTML = "";
  }, 900);
}

// Example: If you have a function that activates a carousel item:
function activateCarouselItem(index) {
  const items = document.querySelectorAll(".carousel-item");
  items.forEach((item, i) => {
    item.style.display = i === index ? "block" : "none";
    if (i === index) {
      const box = item.querySelector(".carousel-box");
      triggerSparkle(box);
    }
  });
}

//twinkle hearts
const overlayElements = document.querySelectorAll(".overlay");

if (overlayElements) {
  overlayElements.forEach((overlayElement) => {
    const overlayCount = Number.isInteger(
      parseInt(overlayElement.getAttribute("data-count"))
    )
      ? parseInt(overlayElement.getAttribute("data-count"))
      : 50;

    function refreshPosition(elem) {
      elem.style.setProperty("--angle", Math.random().toFixed(2));
      elem.style.setProperty("--x", Math.random().toFixed(2));
      elem.style.setProperty("--y", Math.random().toFixed(2));
    }

    for (let i = 0; i < overlayCount; i++) {
      let heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML =
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"></path></svg>';

      heart.style.setProperty("--size", Math.random().toFixed(2));
      heart.style.setProperty("--delay", Math.random().toFixed(2));

      refreshPosition(heart);
      heart.addEventListener("animationiteration", () => {
        refreshPosition(heart);
      });

      overlayElement.appendChild(heart);
    }
  });
}

//for paper art
let HighestZIndex = 1;

class Paper {
  paperHold = false;
  prevMouseX = 0;
  prevMouseY = 0;

  mouseX = 0;
  mouseY = 0;

  mouseVelocityX = 0;
  mouseVelocityY = 0;

  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener("mousedown", (e) => {
      this.paperHold = true;
      paper.style.zIndex = HighestZIndex;
      HighestZIndex = HighestZIndex + 1;

      if (e.button === 0) {
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        console.log(this.prevMouseX + "Hey");
        console.log(this.prevMouseY);
      }
    });
    document.addEventListener("mousemove", (e) => {
      // console.log("1")
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.mouseVelocityX = this.mouseX - this.prevMouseX;
      this.mouseVelocityY = this.mouseY - this.prevMouseY;

      if (this.paperHold) {
        console.log("hey");
        this.currentPaperX += this.mouseVelocityX;
        this.currentPaperY += this.mouseVelocityY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    });

    window.addEventListener("mouseup", (e) => {
      console.log("up");
      this.paperHold = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const cake = document.getElementById("cake");
    if (cake) {
      cake.classList.add("cake-move-center");
    }
  }, 700); // delay as needed
});
setTimeout(() => {
  const flower = document.getElementById("flower");
  if (flower) {
    flower.classList.add("flower-move-up");
  }
}, 1000); // Adjust delay to match when cake is in place

setTimeout(() => {
  const hhd = document.getElementById("hhd");
  if (hhd) {
    hhd.classList.add("hhd-move-down");
  }
}, 1500); // Adjust delay to match your sequence

window.addEventListener("DOMContentLoaded", () => {
  // ...your existing code...

  setTimeout(() => {
    const left = document.querySelector('.left-side-container');
    if (left) left.classList.add('left-side-in');
  }, 1700); // delay as needed for effect
});


//mail
let datetxt = "27 May";
    let datatxtletter = "My love. You are a very special girl. I always silently thank you for coming into my life. Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you.💕";
    let titleLetter = "To you";
    let charArrDate = datetxt.split('');
    let charArrDateLetter = datatxtletter.split('');
    let charArrTitle = titleLetter.split('');
    let currentIndex = 0;
    let currentIndexLetter = 0;
    let currentIndexTitle = 0;
    let date__of__birth = document.querySelector(".date__of__birth span");
    let text__letter = document.querySelector(".text__letter p");
    setTimeout(function () {
        timeDatetxt = setInterval(function () {
            if (currentIndex < charArrDate.length) {
                date__of__birth.textContent += charArrDate[currentIndex];
                currentIndex++;
            }
            else {
                let i = document.createElement("i");
                i.className = "fa-solid fa-star"
                document.querySelector(".date__of__birth").prepend(i)
                document.querySelector(".date__of__birth").appendChild(i.cloneNode(true))
                clearInterval(timeDatetxt)
            }
        }, 100)
    }, 12000)

    var intervalContent;
    var intervalTitle;
    $("#btn__letter").on("click", function () {
        $(".box__letter").slideDown()
        setTimeout(function () {
            $(".letter__border").slideDown();
        }, 1000)
        setTimeout(function () {
            intervalTitle = setInterval(function () {
                if (currentIndexTitle < charArrTitle.length) {
                    document.querySelector(".title__letter").textContent += charArrTitle[currentIndexTitle];
                    let i = document.createElement("i");
                    i.className = "fa-solid fa-heart"
                    document.querySelector(".title__letter").appendChild(i)
                    currentIndexTitle++;
                }
                else {
                    clearInterval(intervalTitle)
                }
            }, 100)
        }, 2000)
        setTimeout(function () {
            document.querySelector("#heart__letter").classList.add("animationOp");
            document.querySelector(".love__img").classList.add("animationOp");
            document.querySelector("#mewmew").classList.add("animationOp");
        }, 2800)
        setTimeout(function () {
            document.querySelectorAll(".heart").forEach((item) => {
                item.classList.add("animation")
            })
        }, 3500)
        setTimeout(function () {
            intervalContent = setInterval(function () {
                if (currentIndexLetter < charArrDateLetter.length) {
                    text__letter.textContent += charArrDateLetter[currentIndexLetter];
                    currentIndexLetter++;
                }
                else {
                    clearInterval(intervalContent)
                }
            }, 50)
        }, 6000)
    })
    $(".close").on("click", function () {
        clearInterval(intervalContent)
        document.querySelector(".title__letter").textContent = "";
        text__letter.textContent = "";
        currentIndexLetter = 0
        currentIndexTitle = 0
        document.querySelector("#heart__letter").classList.remove("animationOp");
        document.querySelector(".love__img").classList.remove("animationOp");
        document.querySelector("#mewmew").classList.remove("animationOp");
        document.querySelectorAll(".heart").forEach((item) => {
            item.classList.remove("animation")
        })
        $(".box__letter").slideUp();
        $(".letter__border").slideUp();
    })



    let mailBox = document.querySelector('.mail')
    let boxmail = document.querySelector('.boxMail')
    var close = document.querySelector('.fa-xmark')
    mailBox.onclick = function () {
        mailBox.classList.toggle('active')
        boxmail.classList.add('active')
    }

    close.addEventListener('click', function () {
        boxmail.classList.remove('active')
    })


    window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const btn = document.querySelector('.btn');
    if (btn) btn.classList.add('btn-in');
  }, 800); // Adjust delay as needed
});


// overlay qyes 

const questions = [
  "Do you wanna feel special? are say no!!",
  "Do you wanna a special birthday gift? Say no!!!",
  "Will you be a good girl? xD come on say no!!",
];
let currentQ = 0;

const overlay = document.getElementById('questionOverlay');
const questionText = document.getElementById('questionText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

function showNextQuestion() {
  currentQ++;
  // Reset No button position and class
  noBtn.classList.remove('moving');
  noBtn.style.left = '';
  noBtn.style.top = '';
  if (currentQ < questions.length) {
    questionText.textContent = questions[currentQ];
  } else {
    overlay.style.display = 'none';
    document.querySelectorAll('section').forEach(sec => sec.style.display = '');
  }
}

yesBtn.addEventListener('click', showNextQuestion);

function moveNoBtn() {
  noBtn.classList.add('moving');
  // Move within a 40x40px area
  const maxX = 200;
  const maxY = 200;
  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;
  noBtn.style.left = randX + 'px';
  noBtn.style.top = randY + 'px';
}

noBtn.addEventListener('mouseenter', moveNoBtn);
noBtn.addEventListener('click', moveNoBtn);

// Hide all sections initially
document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');



const paragraph = `Happy Friendship Day! 💛

Soo it started when i met you on 11th Nov, dosti yuu badhi humari ki bs tu aur me, bs mai aur tuu, kehte hena dosti me who comes first nhi hota, isme hota who stays, and this is something we have with us, we enjoyy our space our time and energy , har tarah see, were comfortable and open with each other... wse to girlfriend day gelebrate krtee xD pr tm dostt hi achhi ho commitment ni chahie xDD but dost rhke v flirt to kruga tmsee, pyaar bhari baatien bhi krugaa, tmhari tareef v krluga and usse v jada mai tmhare sath rhuga hmeshaa, agr katam krna hotaa sab kch to easy tha ek aisa insan banke tmhe agr mil saku jo sath de and khushi ki wjh baneee toh soo ek gana ill dedicate to our frienshipp!!! My besan ka ladddooo`;

const typedText = document.getElementById('typed-text');
let i = 0;

function typeWriter() {
  if (i < paragraph.length) {
    typedText.textContent += paragraph.charAt(i);
    i++;
    setTimeout(typeWriter, 40); // Adjust speed here
  } else {
    setTimeout(() => {
      typedText.textContent = '';
      i = 0;
      typeWriter();
    }, 1200); // Pause before restarting
  }
}

window.addEventListener('DOMContentLoaded', typeWriter);

// function createSparkleFriend() {
function createSparkleHeart() {
  const container = document.getElementById('sparkleFriendship');
  if (!container) return;
  const heart = document.createElement('div');
  heart.className = 'sparkle-heart';
  heart.textContent = '♥';
  // random position around the edge (ellipse)
  const angle = Math.random() * 2 * Math.PI;
  const a = container.offsetWidth / 2 - 18; // horizontal radius
  const b = container.offsetHeight / 2 - 18; // vertical radius
  const x = Math.cos(angle) * a + container.offsetWidth / 2 - 11;
  const y = Math.sin(angle) * b + container.offsetHeight / 2 - 11;
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}
setInterval(createSparkleHeart, 350);